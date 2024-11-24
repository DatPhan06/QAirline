from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.base import Base

class Seat(Base):
    __tablename__ = "seats"

    seat_id = Column(Integer, primary_key=True, index=True)
    airplane_id = Column(Integer, ForeignKey("airplanes.airplane_id"), nullable=False)
    seat_number = Column(String(10), nullable=False)
    seat_class = Column(String(50), nullable=False)
    status = Column(String(50), nullable=False, default="available")
    created_at = Column(DateTime, default=datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))

    # # Relationships
    airplane = relationship("Airplane", back_populates="seats")  # Seat belongs to an airplane
    tickets = relationship("Ticket", back_populates="seat")  # Seat can have many tickets
    booked_tickets = relationship("BookedTicket", back_populates="seat")
