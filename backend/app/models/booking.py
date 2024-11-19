from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base

class Booking(Base):
    """
    Lớp đại diện cho bảng 'bookings' trong cơ sở dữ liệu.

    Attributes:
        id (int): ID của booking.
        flight_id (int): ID của chuyến bay.
        username (str): Tên người dùng.
        user_id (int): ID của người dùng.
        booking_date (date): Ngày đặt vé.
        status (str): Trạng thái của booking.
    """
    __tablename__ = "bookings"

    id: int = Column(Integer, primary_key=True, index=True)
    flight_id: int = Column(Integer, ForeignKey('flights.id'))
    username: str = Column(String(255), nullable=False)
    user_id: int = Column(Integer, ForeignKey("users.id"))
    booking_date: Date = Column(Date)
    status: str = Column(String(255), default="pending")

    flight = relationship("Flight", back_populates="bookings")
    user = relationship("User", back_populates="bookings")
