from pydantic import BaseModel
from datetime import datetime

class AirportBase(BaseModel):
    """
    Lớp sở cho mô hình sân bay.
    
    Attributes:
        name (str): Tên sân bay
        city (str): Thành phố
        country (str): Quốc gia
        iata_code (str): Mã IATA của sân bay
        icao_code (str): Mã ICAO của sân bay
    """
    name: str
    city: str
    country: str
    iata_code: str
    icao_code: str

class AirportCreate(AirportBase):
    """
    Lớp cho việc tạo sân bay mới, kế thừa từ AirportBase.
    """
    pass

class Airport(AirportBase):
    """
    Lớp đại diện cho sân bay trong cơ sở dữ liệu với ID và
    thông tin thời gian.
    
    Attributes:
        airport_id (int): ID của sân bay.
        created_at (datetime): Thời gian tạo bản ghi.
        updated_at (datetime): Thời gian cập nhật bản ghi.
    """
    airport_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True