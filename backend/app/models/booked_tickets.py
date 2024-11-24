# models/booked_ticket.py
from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, DECIMAL
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.base import Base

class BookedTicket(Base):
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
