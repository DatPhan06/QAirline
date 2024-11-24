from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.base import Base

class Admin(Base):
    """
    Model đại diện cho bảng 'admins' trong cơ sở dữ liệu.
    Attributes:
        admin_id (int): ID của admin, khóa chính.
        username (str): Tên đăng nhập của admin, duy nhất và không được để trống.
        hashed_password (str): Mật khẩu đã mã hóa của admin, không được để trống.
        role (str): Vai trò của admin, ví dụ như 'data_entry', 'manager'.
        permissions (str, optional): Quyền hạn của admin, ví dụ như 'full_access', 'limited_access'.
        created_at (datetime): Thời gian tạo bản ghi, mặc định là thời gian hiện tại.
        updated_at (datetime): Thời gian cập nhật bản ghi, mặc định là thời gian hiện tại và tự động cập nhật khi có thay đổi.
    Relationships:
        news (relationship): Liên kết tới model News nếu admin viết tin tức.
    """
    __tablename__ = "admins"

    admin_id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)  # Tên đăng nhập
    hashed_password = Column(String(255), nullable=False)  # Mật khẩu đã mã hóa
    role = Column(String(50), nullable=False)  # Vai trò như 'data_entry', 'manager'
    permissions = Column(String(50), nullable=True)  # Quyền hạn như 'full_access', 'limited_access'
    created_at = Column(DateTime, default=datetime.now(timezone.utc))  # Thời gian tạo
    updated_at = Column(DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))  # Thời gian cập nhật

    # Relationships (nếu cần)
    news = relationship("News", back_populates="author")  # Liên kết tới model News nếu admin viết tin tức