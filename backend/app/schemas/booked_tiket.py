from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class BookedTicketBase(BaseModel):
    """
    Lớp cơ sở cho thông tin vé đã đặt.
    """
    flight_id: int
    user_id: int
    seat_id: int
    ticket_id: int
    price: float
    booking_time: datetime

class BookedTicketCreate(BookedTicketBase):
    """
    Lớp cho việc tạo mới thông tin vé đã đặt.
    """
    pass

class BookedTicketUpdate(BookedTicketBase):
    """
    Lớp cho việc cập nhật thông tin vé đã đặt.
    """
    status: Optional[str] = None

class BookedTicket(BookedTicketBase):
    """
    Lớp cho thông tin vé đã đặt hoàn chỉnh.
    """
    booked_ticket_id: int
    status: str

    class Config:
        orm_mode = True