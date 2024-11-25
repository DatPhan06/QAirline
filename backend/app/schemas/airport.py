from pydantic import BaseModel
from datetime import datetime

class AirportBase(BaseModel):
    name: str
    city: str
    country: str
    iata_code: str
    icao_code: str

class AirportCreate(AirportBase):
    pass

class Airport(AirportBase):
    airport_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True