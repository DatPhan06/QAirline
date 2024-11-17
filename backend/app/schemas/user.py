from pydantic import BaseModel

class UserBase(BaseModel):
    """
    Lớp cơ sở cho người dùng.
    """
    username: str
    email: str

class UserCreate(UserBase):
    """
    Lớp cho việc tạo người dùng mới.
    """
    password: str

class User(UserBase):
    """
    Lớp cho người dùng với ID.
    """
    id: int

    class Config:
        from_attributes: bool = True