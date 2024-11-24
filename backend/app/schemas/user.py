from pydantic import BaseModel

class UserBase(BaseModel):
    """
    Lớp cơ sở cho người dùng.
    """
    username: str
    email: str    
    full_name: str


class UserCreate(UserBase):
    """
    Lớp cho việc tạo người dùng mới.
    """
    password: str

class User(UserBase):
    """
    Lớp cho người dùng với ID.
    """
    user_id: int  # Đảm bảo rằng trường này khớp với model User

    class Config:
        from_attributes: bool = True