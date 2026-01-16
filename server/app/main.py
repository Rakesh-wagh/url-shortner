from fastapi import FastAPI
from fastapi.security import HTTPBearer
from app.database import engine, Base
from app.routes import auth, urls
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="URL Shortener API")

origins = [
    "http://localhost:5173", 
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Added for Authorization Bearer Token
security = HTTPBearer()

Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(urls.router)

@app.get("/")
def root():
    return {"message": "Welcome to URL Shortener API"}
