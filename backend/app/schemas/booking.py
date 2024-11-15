from pydantic import BaseModel
from datetime import date
from typing import Optional

class BookingBase(BaseModel):
    flight_id: int
    user_id: int
    booking_date: date

class BookingCreate(BookingBase):
    pass

class BookingUpdate(BookingBase):
    status: Optional[str] = None

class Booking(BookingBase):
    id: int
    status: str

    class Config:
        from_attributes = True