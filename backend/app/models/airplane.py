from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.base import Base

class Airplane(Base):
    __tablename__ = "airplanes"

    airplane_id = Column(Integer, primary_key=True, index=True)
    model = Column(String(100), nullable=False)  # Model of the airplane
    manufacturer = Column(String(100), nullable=False)  # Manufacturer of the airplane
    seat_capacity = Column(Integer, nullable=False)  # Total seat capacity
    range_km = Column(Integer, nullable=True)  # Range in kilometers
    year_of_manufacture = Column(Integer, nullable=True)  # Manufacturing year
    maintenance_status = Column(String(50), nullable=True)  # Maintenance status (e.g., 'up-to-date')
    status = Column(String(50), nullable=True)  # Current status (e.g., 'active')
    created_at = Column(DateTime, default=datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))

    # Relationships
    seats = relationship("Seat", back_populates="airplane")  # Airplane has many seats
    flights = relationship("Flight", back_populates="airplane")  # Airplane serves many flights
