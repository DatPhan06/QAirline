from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.orm import relationship
from ..database import Base

class Flight(Base):
    """
    Mô hình chuyến bay.

    Attributes:
        id (int): Mã chuyến bay.
        name (str): Tên chuyến bay.
        departure (str): Điểm khởi hành.
        destination (str): Điểm đến.
        duration (int): Thời gian bay.
        bookings (relationship): Danh sách đặt chỗ liên quan đến chuyến bay.
    """
    __tablename__ = 'flights'

    id: int = Column(Integer, primary_key=True, index=True)
    name: str = Column(String(255), nullable=False)
    departure: str = Column(String(255), nullable=False)
    destination: str = Column(String(255), nullable=False)
    departureDate: Date = Column(Date)
    duration: int = Column(Integer, nullable=False)

    bookings = relationship("Booking", back_populates="flight")