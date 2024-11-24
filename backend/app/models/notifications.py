from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.base import Base

class Notification(Base):
    __tablename__ = "notifications"

    notification_id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    content = Column(Text, nullable=False)
    type = Column(String(50), nullable=False, default="general")
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=True)
    flight_id = Column(Integer, ForeignKey("flights.flight_id"), nullable=True)
    created_at = Column(DateTime, default=datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))

    # Relationships
    user = relationship("User", back_populates="notifications")  # Notification for a user
    flight = relationship("Flight", back_populates="notifications")  # Notification related to a flight
