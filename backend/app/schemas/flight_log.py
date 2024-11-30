from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class FlightLogBase(BaseModel):
    flight_id: int
    log_message: str

    class Config:
        orm_mode = True


class FlightLogCreate(FlightLogBase):
    pass

    class Config:
        orm_mode = True


class FlightLog(FlightLogBase):
    log_id: int
    created_at: datetime
