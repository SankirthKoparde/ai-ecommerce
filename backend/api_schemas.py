from pydantic import BaseModel

# Schema for creating a user (input)
class UserCreate(BaseModel):
    email: str
    password: str

# Schema for reading a user (output)
class User(BaseModel):
    id: int
    email: str

    class Config:
        orm_mode = True