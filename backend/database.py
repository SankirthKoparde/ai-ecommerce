# backend/database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Using the correct password 'root' and database name 'ai_ecommerce'
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:root@localhost/ai_ecommerce"

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()