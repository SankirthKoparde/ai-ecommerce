# backend/seed.py
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models

models.Base.metadata.create_all(bind=engine)
db: Session = SessionLocal()

products_to_add = [
    models.Product(
        id=1,
        name='AI-Powered Smartwatch',
        price=299.99,
        image_url='https://via.placeholder.com/300?text=Smartwatch', # CHANGED
        description='A sleek smartwatch with advanced AI health tracking.'
    ),
    models.Product(
        id=2,
        name='Generative AI Art Canvas',
        price=450.00,
        image_url='https://via.placeholder.com/300?text=AI+Canvas', # CHANGED
        description='A digital canvas that creates unique art using generative AI.'
    ),
    # ... and so on for the other products
]
# Make sure to change imageUrl to image_url for all products in your file.

try:
    if db.query(models.Product).count() == 0:
        print("Seeding database with products...")
        db.add_all(products_to_add)
        db.commit()
        print("Database seeded successfully!")
    else:
        print("Database already contains products. Skipping seed.")
finally:
    db.close()