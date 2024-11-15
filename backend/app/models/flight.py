from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from ..database import Base

class Flight(Base):
    __tablename__ = 'flights'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    departure = Column(String(255), nullable=False)
    destination = Column(String(255), nullable=False)
    duration = Column(Integer, nullable=False)

    bookings = relationship("Booking", back_populates="flight")