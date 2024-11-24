from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, DECIMAL, Time
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.base import Base

class Flight(Base):
    __tablename__ = "flights"

    flight_id = Column(Integer, primary_key=True, index=True)
    airplane_id = Column(Integer, ForeignKey("airplanes.airplane_id"), nullable=False)
    flight_number = Column(String(20), unique=True, nullable=False)
    departure_airport = Column(String(100), nullable=False)
    arrival_airport = Column(String(100), nullable=False)
    departure_time = Column(DateTime, nullable=False)
    arrival_time = Column(DateTime, nullable=False)
    flight_duration = Column(Time, nullable=True)
    status = Column(String(50), default="scheduled")
    available_seats = Column(Integer, nullable=True)
    price = Column(DECIMAL(10, 2), nullable=False)
    created_at = Column(DateTime, default=datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))

    # Relationships
    airplane = relationship("Airplane", back_populates="flights")  # Flight uses one airplane
    notifications = relationship("Notification", back_populates="flight")  # Notifications related to the flight
    logs = relationship("FlightLog", back_populates="flight")  # Flight has many logs
    ticket_types = relationship("Ticket", back_populates="flight")
    booked_tickets = relationship("BookedTicket", back_populates="flight")