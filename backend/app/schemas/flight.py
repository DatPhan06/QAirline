from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional

class FlightBase(BaseModel):
    """
    Lớp cơ sở cho thông tin chuyến bay.
    
    Attributes:
        flight_number (str): Số hiệu chuyến bay.
        departure_airport (str): Sân bay khởi hành.
        arrival_airport (str): Sân bay đến.
        departure_time (datetime): Thời gian khởi hành.
        arrival_time (datetime): Thời gian đến.
        flight_duration (time): Thời gian bay.
        status (str): Trạng thái của chuyến bay.
        available_seats (int): Số ghế còn trống.
        price (decimal): Giá vé.
    """
    flight_number: str
    departure_airport: str
    arrival_airport: str
    departure_time: datetime
    arrival_time: datetime
    flight_duration: Optional[datetime]
    status: Optional[str] = "scheduled"
    available_seats: Optional[int]
    price: float

class FlightCreate(FlightBase):
    """
    Lớp cho việc tạo chuyến bay mới, kế thừa từ FlightBase.
    """
    pass

class Flight(FlightBase):
    """
    Lớp cho thông tin chuyến bay với ID, kế thừa từ FlightBase.
    
    Attributes:
        flight_id (int): ID của chuyến bay.
    """
    flight_id: int

    class Config:
        orm_mode = True