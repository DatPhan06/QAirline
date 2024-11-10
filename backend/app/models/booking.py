from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    flight_id = Column(Integer, ForeignKey("flights.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    booking_date = Column(Date)
    status = Column(String, default="pending")

    flight = relationship("Flight", back_populates="bookings")
    user = relationship("User", back_populates="bookings")