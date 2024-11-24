# models/booked_ticket.py
from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, DECIMAL
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.base import Base

class BookedTicket(Base):
    """
    Lớp BookedTicket đại diện cho vé đã được đặt trong hệ thống.
    Attributes:
        booked_ticket_id (int): ID của vé đã đặt, là khóa chính.
        user_id (int): ID của người dùng, là khóa ngoại tham chiếu đến bảng users.
        flight_id (int): ID của chuyến bay, là khóa ngoại tham chiếu đến bảng flights.
        seat_id (int): ID của ghế ngồi, là khóa ngoại tham chiếu đến bảng seats.
        ticket_id (int): ID của loại vé, là khóa ngoại tham chiếu đến bảng tickets.
        price (decimal): Giá vé.
        booking_time (datetime): Thời gian đặt vé, mặc định là thời gian hiện tại.
        status (str): Trạng thái của vé, mặc định là 'booked'. Các trạng thái khác có thể là 'canceled', 'checked-in', v.v.
        created_at (datetime): Thời gian tạo bản ghi, mặc định là thời gian hiện tại.
        updated_at (datetime): Thời gian cập nhật bản ghi, mặc định là thời gian hiện tại và tự động cập nhật khi có thay đổi.
    Relationships:
        user (User): Quan hệ với bảng users.
        flight (Flight): Quan hệ với bảng flights.
        seat (Seat): Quan hệ với bảng seats.
        ticket_type (Ticket): Quan hệ với bảng tickets.
    """
    __tablename__ = "booked_tickets"

    booked_ticket_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    flight_id = Column(Integer, ForeignKey("flights.flight_id"), nullable=False)
    seat_id = Column(Integer, ForeignKey("seats.seat_id"), nullable=False)
    ticket_id = Column(Integer, ForeignKey("tickets.ticket_id"), nullable=False)
    price = Column(DECIMAL(10, 2), nullable=False)
    booking_time = Column(DateTime, default=datetime.now(timezone.utc))
    status = Column(String(50), default="booked")  # Trạng thái: 'booked', 'canceled', 'checked-in', v.v.
    created_at = Column(DateTime, default=datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))

    # Relationships
    user = relationship("User", back_populates="booked_tickets")
    flight = relationship("Flight", back_populates="booked_tickets")
    seat = relationship("Seat", back_populates="booked_tickets")
    ticket_type = relationship("Ticket", back_populates="booked_tickets")
