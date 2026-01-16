from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)

class URL(Base): 
    __tablename__ = "urls" 
    id = Column(Integer, primary_key=True, index=True) 
    original_url = Column(String(500), nullable=False) 
    short_code = Column(String(50), unique=True, index=True, nullable=False) 
    created_at = Column(DateTime, default= datetime.utcnow) 
    clicks = Column(Integer, default=0) 
    user_id = Column(Integer, ForeignKey("users.id")) 
    owner = relationship("User", backref="urls")
    expires_at = Column(DateTime, nullable=True)
