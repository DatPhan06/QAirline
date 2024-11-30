from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class FlightLogBase(BaseModel):
    """
    Schema cơ sở cho dữ liệu nhật ký chuyến bay.

    Attributes:
        flight_id (int): ID của chuyến bay liên quan đến nhật ký.
        log_message (str): Thông báo hoặc mô tả nhật ký.
    """
    flight_id: int
    log_message: str


class FlightLogCreate(FlightLogBase):
    """
    Schema dùng để tạo mới một nhật ký chuyến bay.
    Kế thừa từ FlightLogBase, không thêm thuộc tính mới.

    Config:
        orm_mode (bool): Cho phép chuyển đổi từ ORM model sang Pydantic model.
    """
    pass

    class Config:
        orm_mode = True


class FlightLog(FlightLogBase):
    """
    Schema đại diện cho nhật ký chuyến bay đã lưu trong cơ sở dữ liệu.
    Kế thừa từ FlightLogBase, bổ sung thêm thông tin về ID và thời gian tạo.

    Attributes:
        log_id (int): ID của nhật ký, khóa chính.
        created_at (datetime): Thời gian tạo nhật ký.
    Config:
        orm_mode (bool): Cho phép chuyển đổi từ ORM model sang Pydantic model.
    """
    log_id: int
    created_at: datetime

