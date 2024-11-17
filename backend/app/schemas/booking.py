from pydantic import BaseModel
from datetime import date
from typing import Optional

class BookingBase(BaseModel):
    """
    Lớp cơ sở cho thông tin đặt vé.
    """
    flight_id: int
    user_id: int
    booking_date: date

class BookingCreate(BookingBase):
    """
    Lớp cho việc tạo mới thông tin đặt vé.
    """
    pass

class BookingUpdate(BookingBase):
    """
    Lớp cho việc cập nhật thông tin đặt vé.
    """
    status: Optional[str] = None

class Booking(BookingBase):
    """
    Lớp cho thông tin đặt vé hoàn chỉnh.
    """
    id: int
    status: str

    class Config:
        from_attributes: bool = True