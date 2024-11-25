from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, DECIMAL, Time
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.base import Base

class Flight(Base):
    """
    Lớp đại diện cho chuyến bay trong cơ sở dữ liệu.

    Attributes:
        flight_id (int): ID của chuyến bay.
        airplane_id (int): ID của máy bay.
        flight_number (str): Số hiệu chuyến bay.
        departure_airport (str): Sân bay khởi hành.
        arrival_airport (str): Sân bay đến.
        departure_time (datetime): Thời gian khởi hành.
        arrival_time (datetime): Thời gian đến.
        flight_duration (time): Thời gian bay.
        status (str): Trạng thái của chuyến bay.
        available_seats (int): Số ghế còn trống.
        price (decimal): Giá vé.
        created_at (datetime): Thời gian tạo bản ghi.
        updated_at (datetime): Thời gian cập nhật bản ghi.
    """

    __tablename__ = "flights"

    flight_id = Column(Integer, primary_key=True, index=True)
    airplane_id = Column(Integer, ForeignKey("airplanes.airplane_id"), nullable=False)
    flight_number = Column(String(20), unique=True, nullable=False)
    departure_airport_id = Column(Integer, ForeignKey("airports.airport_id"), nullable=False)
    arrival_airport_id = Column(Integer, ForeignKey("airports.airport_id"), nullable=False)
    departure_time = Column(DateTime, nullable=False)
    arrival_time = Column(DateTime, nullable=False)
    flight_duration = Column(Time, nullable=True)
    status = Column(String(50), default="scheduled")
    available_seats = Column(Integer, nullable=True)
    price = Column(DECIMAL(10, 2), nullable=False)
    created_at = Column(DateTime, default=datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))

    # Quan hệ
    airplane = relationship("Airplane", back_populates="flights")  # Chuyến bay sử dụng một máy bay
    departure_airport = relationship("Airport", foreign_keys=[departure_airport_id], back_populates="departure_flights")
    arrival_airport = relationship("Airport", foreign_keys=[arrival_airport_id], back_populates="arrival_flights")
    notifications = relationship("Notification", back_populates="flight")  # Thông báo liên quan đến chuyến bay
    logs = relationship("FlightLog", back_populates="flight")  # Chuyến bay có nhiều nhật ký
    ticket_types = relationship("Ticket", back_populates="flight")  # Các loại vé của chuyến bay
    booked_tickets = relationship("BookedTicket", back_populates="flight")  # Vé đã đặt của chuyến bay