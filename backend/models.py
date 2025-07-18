from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base # Import Base from our database file

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())