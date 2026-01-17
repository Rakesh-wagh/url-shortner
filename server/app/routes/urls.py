from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas, utils
from app.database import SessionLocal
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt 
import os
import qrcode 
import io 
from fastapi.responses import RedirectResponse, StreamingResponse

router = APIRouter(prefix="/urls", tags=["URL shortner api's"])

security = HTTPBearer()
SECRET_KEY = os.getenv("JWT_SECRET") 
ALGORITHM = os.getenv("JWT_ALGORITHM") 
SERVER_URL = os.getenv("SERVER_URL")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/me", response_model=schemas.LoggedInUser)
def get_loggedIn_user(credentials: HTTPAuthorizationCredentials = Depends(security)): 
    token = credentials.credentials 
    try: 
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM]) 
        username: str = payload.get("sub") 
        if username is None: 
            raise HTTPException(status_code=401, detail="Invalid token") 
        return schemas.LoggedInUser(username=username) 
    except JWTError: 
        raise HTTPException(status_code=401, detail="Invalid token")
    
def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)): 
    token = credentials.credentials 
    try: 
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM]) 
        username: str = payload.get("sub") 
        if username is None: 
            raise HTTPException(status_code=401, detail="Invalid token") 
        return username
    except JWTError: 
        raise HTTPException(status_code=401, detail="Invalid token")

@router.post("/shorten", response_model=schemas.URLResponse)
def shorten_url(
    url: schemas.URLCreate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    user = db.query(models.User).filter(models.User.username == current_user).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user_id = user.id

    if url.custom_code:
        exists = db.query(models.URL).filter(models.URL.short_code == url.custom_code).first()
        if exists:
            raise HTTPException(status_code=400, detail="Custom code already in use")
    short_code = url.custom_code or utils.generate_short_code()
    db_url = models.URL(original_url=url.original_url, short_code=short_code, user_id=user_id,expires_at=utils.get_expiration_date())
    db.add(db_url)
    db.commit()
    db.refresh(db_url)
    return db_url

@router.get("/{short_code}")
def redirect_url(short_code: str, db: Session = Depends(get_db)):
    db_url = db.query(models.URL).filter(models.URL.short_code == short_code).first()
    if not db_url:
        raise HTTPException(status_code=404, detail="URL not found")
    db_url.clicks += 1
    db.commit()
    return RedirectResponse(db_url.original_url)

@router.get("/stats/{short_code}", response_model=schemas.URLStats)
def url_stats(short_code: str, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    db_url = db.query(models.URL).filter(models.URL.short_code == short_code).first()
    if not db_url:
        raise HTTPException(status_code=404, detail="URL not found")
    return db_url

@router.get("/", response_model=list[schemas.URLResponse])
def list_urls(db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    user_id = db.query(models.User).filter(models.User.username == current_user).first().id
    urls = db.query(models.URL).filter(models.URL.user_id == user_id).all()
    return urls

@router.delete("/{short_code}")
def delete_url(short_code: str, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    user_id = db.query(models.User).filter(models.User.username == current_user).first().id
    db_url = db.query(models.URL).filter(models.URL.short_code == short_code, models.URL.user_id == user_id).first()
    if not db_url:
        raise HTTPException(status_code=404, detail="URL not found")
    db.delete(db_url)
    db.commit()
    return {"detail": "URL deleted"}

@router.post("/qr/")
def generate_qr(data: dict, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    user_id = db.query(models.User).filter(models.User.username == current_user).first().id

    original_url = data.get("original_url")
    if not original_url:
        raise HTTPException(status_code=400, detail="original_url is required")

    db_url = db.query(models.URL).filter(models.URL.original_url == original_url).first()
    if not db_url:
        short_code = utils.generate_short_code()
        db_url = models.URL(
            original_url=original_url,
            short_code=short_code,
            user_id=user_id
        )
        db.add(db_url)
        db.commit()
        db.refresh(db_url)

    img = qrcode.make(f"{SERVER_URL}/urls/{db_url.short_code}")
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)
    return StreamingResponse(buf, media_type="image/png")