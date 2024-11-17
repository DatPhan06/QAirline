from pydantic import BaseModel
from typing import List

class FlightBase(BaseModel):
    """
    Lớp cơ sở cho thông tin chuyến bay.
    
    Attributes:
        name (str): Tên chuyến bay.
        departure (str): Điểm khởi hành.
        destination (str): Điểm đến.
        duration (int): Thời gian bay (phút).
    """
    name: str
    departure: str
    destination: str
    duration: int

class FlightCreate(FlightBase):
    """
    Lớp cho việc tạo chuyến bay mới, kế thừa từ FlightBase.
    """
    pass

class Flight(FlightBase):
    """
    Lớp cho thông tin chuyến bay với ID, kế thừa từ FlightBase.
    
    Attributes:
        id (int): ID của chuyến bay.
    """
    id: int

    class Config:
        """
        Cấu hình cho lớp Flight.
        """
        from_attributes: bool = True