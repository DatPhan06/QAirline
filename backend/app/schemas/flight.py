from pydantic import BaseModel

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
        orm_mode = True