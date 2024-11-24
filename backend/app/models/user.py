from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.base import Base

class User(Base):
    """
    Lớp User đại diện cho bảng 'users' trong cơ sở dữ liệu.

    Attributes:
        user_id (int): ID của người dùng, khóa chính.
        username (str): Tên đăng nhập của người dùng, duy nhất và không được để trống.
        full_name (str): Họ và tên đầy đủ của người dùng, không được để trống.
        email (str): Địa chỉ email của người dùng, duy nhất và không được để trống.
        hashed_password (str): Mật khẩu đã được mã hóa của người dùng, không được để trống.
        phone (str): Số điện thoại của người dùng, có thể để trống.
        created_at (datetime): Thời gian tạo tài khoản, mặc định là thời gian hiện tại.
        updated_at (datetime): Thời gian cập nhật tài khoản, tự động cập nhật khi có thay đổi.
    """

    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    full_name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    phone = Column(String(15), nullable=True)
    created_at = Column(DateTime, default=datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))

    # Quan hệ
    notifications = relationship("Notification", back_populates="user")  # Người dùng có thể nhận nhiều thông báo
    booked_tickets = relationship("BookedTicket", back_populates="user")  # Người dùng có thể có nhiều vé đã đặt
