from datetime import datetime
from pydantic import BaseModel, constr

class UserCreate(BaseModel):
    username: str
    email: str
    password:str

    class Config:
            orm_mode = True

class UserLogin(BaseModel):
    username: str
    password: str

    class Config:
            orm_mode = True

class UserResponse(BaseModel):
    id: int
    username: str
    email: str

    class Config:
            orm_mode = True

class URLCreate(BaseModel): 
    original_url: str 
    custom_code: constr(max_length=50) | None = None
    
    class Config:
            orm_mode = True


class URLResponse(BaseModel): 
    id: int 
    original_url: str 
    short_code: str 
    clicks: int

    
    class Config:
            orm_mode = True

class URLStats(BaseModel): 
    short_code: str 
    original_url: str 
    clicks: int 
    created_at: datetime 
    expires_at: datetime | None

    
    class Config:
        orm_mode = True
