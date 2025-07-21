# backend/main.py
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import models
import database

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

# backend/main.py

origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"Status": "API is running!"}

@app.get("/products")
def get_products(db: Session = Depends(get_db)):
    products = db.query(models.Product).all()
    return products