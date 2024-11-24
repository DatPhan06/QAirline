# models/ticket.py
from sqlalchemy import Column, Integer, String, DECIMAL, ForeignKey
from sqlalchemy.orm import relationship
from app.base import Base

class Ticket(Base):
    __tablename__ = "tickets"

    ticket_id = Column(Integer, primary_key=True, index=True)
    flight_id = Column(Integer, ForeignKey("flights.flight_id"), nullable=False)
    class_type = Column(String(50), nullable=False)  # Ví dụ: 'economy', 'business'
    price = Column(DECIMAL(10, 2), nullable=False)
    status = Column(String(50), default="available")  # Trạng thái vé: 'available', 'sold out', v.v.

    # Relationships
    flight = relationship("Flight", back_populates="ticket_types")
    booked_tickets = relationship("BookedTicket", back_populates="ticket_type")
