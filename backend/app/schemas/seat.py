# backend/app/schemas/seat.py

from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class SeatBase(BaseModel):
    airplane_id: int
    seat_number: str
    seat_class: str
    status: Optional[str] = "available"

class SeatCreate(SeatBase):
    pass

class SeatUpdate(BaseModel):
    airplane_id: Optional[int] = None
    seat_number: Optional[str] = None
    seat_class: Optional[str] = None
    status: Optional[str] = None

class Seat(SeatBase):
    seat_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True