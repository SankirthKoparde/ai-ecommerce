from pydantic import BaseModel

# Schema for creating a user (input)
class UserCreate(BaseModel):
    email: str
    password: str

# Schema for reading a user (output)
# This prevents the hashed_password from being sent back to the client
class User(BaseModel):
    id: int
    email: str

    class Config:
        from_attributes = True  # Use new Pydantic v2+ config