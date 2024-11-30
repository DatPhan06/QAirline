from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class AdminBase(BaseModel):
    """
    Schema cơ bản cho thông tin quản trị viên.

    Attributes:
        username (str): Tên đăng nhập của quản trị viên, giới hạn 50 ký tự.
        role (str): Vai trò của quản trị viên, giới hạn 50 ký tự.
        permissions (Optional[str]): Các quyền của quản trị viên, tùy chọn, giới hạn 50 ký tự.
    """
    username: str = Field(..., max_length=50)
    role: str = Field(..., max_length=50)
    permissions: Optional[str] = Field(None, max_length=50)


class AdminCreate(AdminBase):
    """
    Schema để tạo quản trị viên mới, bao gồm thông tin cần thiết và mật khẩu.

    Attributes:
        password (str): Mật khẩu cho quản trị viên mới.
    """
    password: str  


class AdminUpdate(BaseModel):
    """
    Schema để cập nhật thông tin quản trị viên.

    Attributes:
        username (Optional[str]): Tên đăng nhập mới, tùy chọn, giới hạn 50 ký tự.
        role (Optional[str]): Vai trò mới, tùy chọn, giới hạn 50 ký tự.
        permissions (Optional[str]): Các quyền mới, tùy chọn, giới hạn 50 ký tự.
        password (Optional[str]): Mật khẩu mới, tùy chọn.
    """
    username: Optional[str] = Field(None, max_length=50)
    role: Optional[str] = Field(None, max_length=50)
    permissions: Optional[str] = Field(None, max_length=50)
    password: Optional[str] 


class Admin(AdminBase):
    """
    Schema để trả về thông tin quản trị viên, bao gồm các trường không thể chỉnh sửa.

    Attributes:
        admin_id (int): ID duy nhất của quản trị viên.
        created_at (datetime): Thời gian tạo quản trị viên.
        updated_at (datetime): Thời gian cập nhật thông tin quản trị viên.
    """
    admin_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
