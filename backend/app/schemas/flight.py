from pydantic import BaseModel
from typing import List

class FlightBase(BaseModel):
    name: str
    departure: str
    destination: str
    duration: int

class FlightCreate(FlightBase):
    pass

class Flight(FlightBase):
    id: int

    class Config:
        from_attributes = True