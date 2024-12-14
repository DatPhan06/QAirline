# backend/app/schemas/user.py

from typing import Optional

from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    """
    Lớp cơ bản đại diện cho người dùng.

    Attributes:
        username (str): Tên đăng nhập của người dùng.
        email (EmailStr): Địa chỉ email của người dùng.
        full_name (str): Họ và tên đầy đủ của người dùng.
    """

    username: str
    email: EmailStr
    full_name: str
    phone: Optional[str] = None  # Đảm bảo phone là chuỗi hoặc None


class UserCreate(UserBase):
    """
    Lớp đại diện cho dữ liệu tạo mới người dùng.

    Attributes:
        password (str): Mật khẩu của người dùng.
    """

    password: str


class UserUpdate(BaseModel):
    """
    Lớp đại diện cho dữ liệu cập nhật người dùng.

    Attributes:
        email (Optional[EmailStr]): Địa chỉ email mới.
        full_name (Optional[str]): Họ và tên đầy đủ mới.
        phone (Optional[str]): Số điện thoại mới.
        password (Optional[str]): Mật khẩu mới.
    """

    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    phone: Optional[str] = None
    password: Optional[str] = None


class User(UserBase):
    """
    Lớp đại diện cho người dùng được trả về từ API.

    Attributes:
        user_id (int): ID của người dùng.
    """

    user_id: int
    phone: Optional[str] = None

    class Config:
        orm_mode = True
        from_attributes = True