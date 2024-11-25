from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from sqlalchemy.orm import relationship
from ..base import Base

class Airport(Base):
    __tablename__ = "airports"

    airport_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    city = Column(String(100), nullable=False)
    country = Column(String(100), nullable=False)
    iata_code = Column(String(3), unique=True, nullable=False)
    icao_code = Column(String(4), unique=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Quan hệ
    departure_flights = relationship("Flight", foreign_keys="[Flight.departure_airport_id]", back_populates="departure_airport")
    arrival_flights = relationship("Flight", foreign_keys="[Flight.arrival_airport_id]", back_populates="arrival_airport")