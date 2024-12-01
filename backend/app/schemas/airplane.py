from datetime import datetime
from pydantic import BaseModel
from typing import Optional


class AirplaneBase(BaseModel):
    """
    Schema cơ bản cho máy bay.

    Attributes:
        model (str): Mô hình của máy bay.
        manufacturer (str): Nhà sản xuất của máy bay.
        seat_capacity (int): Số lượng ghế ngồi trên máy bay.
        range_km (Optional[int]): Tầm bay của máy bay (km).
        year_of_manufacture (Optional[int]): Năm sản xuất của máy bay.
        maintenance_status (Optional[str]): Trạng thái bảo trì của máy bay.
        status (Optional[str]): Trạng thái hoạt động hiện tại của máy bay.
    """
    model: str
    manufacturer: str
    seat_capacity: int
    range_km: Optional[int] = None
    year_of_manufacture: Optional[int] = None
    maintenance_status: Optional[str] = None
    status: Optional[str] = None


class AirplaneCreate(AirplaneBase):
    """
    Schema khi tạo mới máy bay.

    Inherits:
        AirplaneBase: Bao gồm tất cả các trường cơ bản cho máy bay.
    """
    pass


class Airplane(AirplaneBase):
    """
    Schema trả về thông tin máy bay.

    Attributes:
        airplane_id (int): ID duy nhất của máy bay.
        created_at (datetime): Thời gian tạo máy bay trong hệ thống.
        updated_at (datetime): Thời gian cập nhật thông tin máy bay gần nhất.
    """
    airplane_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
