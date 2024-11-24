from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.base import Base

class Notification(Base):
    """
    Lớp Notification đại diện cho thông báo trong hệ thống.
    Attributes:
        notification_id (int): ID của thông báo, là khóa chính.
        title (str): Tiêu đề của thông báo, không được để trống.
        content (str): Nội dung của thông báo, không được để trống.
        type (str): Loại thông báo, mặc định là "general".
        user_id (int): ID của người dùng nhận thông báo, có thể để trống.
        flight_id (int): ID của chuyến bay liên quan đến thông báo, có thể để trống.
        created_at (datetime): Thời gian tạo thông báo, mặc định là thời gian hiện tại.
        updated_at (datetime): Thời gian cập nhật thông báo, mặc định là thời gian hiện tại và tự động cập nhật khi có thay đổi.
    Relationships:
        user (User): Quan hệ với lớp User, đại diện cho người dùng nhận thông báo.
        flight (Flight): Quan hệ với lớp Flight, đại diện cho chuyến bay liên quan đến thông báo.
    """
    __tablename__ = "notifications"

    notification_id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    content = Column(Text, nullable=False)
    type = Column(String(50), nullable=False, default="general")
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=True)
    flight_id = Column(Integer, ForeignKey("flights.flight_id"), nullable=True)
    created_at = Column(DateTime, default=datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))

    # Relationships
    user = relationship("User", back_populates="notifications")  # Notification for a user
    flight = relationship("Flight", back_populates="notifications")  # Notification related to a flight
