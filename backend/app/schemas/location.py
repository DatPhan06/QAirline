from pydantic import BaseModel

class LocationSchema(BaseModel):
    location_id: int
    city: str
    country: str
    screen: str
    food: str
    activity: str
    experience: str
    airport_id: int

    class Config:
        orm_mode = True