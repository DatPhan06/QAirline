from sqlalchemy import Column, Integer, ForeignKey, Text, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.base import Base

class FlightLog(Base):
    __tablename__ = "flight_logs"

    log_id = Column(Integer, primary_key=True, index=True)
    flight_id = Column(Integer, ForeignKey("flights.flight_id"), nullable=False)
    log_message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.now(timezone.utc))

    # Relationships
    flight = relationship("Flight", back_populates="logs")  # Log belongs to a flight