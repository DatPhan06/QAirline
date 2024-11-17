from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from ..database import Base

class User(Base):
    """
    Mô hình người dùng trong cơ sở dữ liệu.

    Attributes:
        id (int): ID của người dùng.
        username (str): Tên đăng nhập của người dùng.
        email (str): Email của người dùng.
        hashed_password (str): Mật khẩu đã được mã hóa của người dùng.
        bookings (relationship): Danh sách các đặt chỗ của người dùng.
    """
    __tablename__ = "users"

    id: int = Column(Integer, primary_key=True, index=True)
    username: str = Column(String(255), unique=True, index=True)
    email: str = Column(String(255), unique=True, index=True)
    hashed_password: str = Column(String(255))
    
    bookings = relationship("Booking", back_populates="user")