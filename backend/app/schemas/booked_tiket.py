from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class BookedTicketBase(BaseModel):
    """
    Lớp cơ sở cho vé đã đặt.

    Attributes:
        flight_id (int): ID của chuyến bay.
        seat_id (int): ID của ghế ngồi.
        ticket_id (int): ID của vé.
        price (float): Giá vé.
    """

    flight_id: int
    seat_id: int
    ticket_id: int
    price: float


class BookedTicketCreate(BookedTicketBase):
    """
    Lớp dùng để tạo mới vé đã đặt.
    """

    pass


class BookedTicketUpdate(BaseModel):
    """
    Lớp dùng để cập nhật thông tin vé đã đặt.

    Attributes:
        status (Optional[str]): Trạng thái mới của vé (ví dụ: 'canceled').
    """

    status: Optional[str] = None


class BookedTicket(BookedTicketBase):
    """
    Lớp đại diện cho vé đã đặt được trả về từ API.

    Attributes:
        booked_ticket_id (int): ID của vé đã đặt.
        user_id (int): ID của người dùng đã đặt vé.
        booking_time (datetime): Thời gian đặt vé.
        status (str): Trạng thái của vé đã đặt.
    """

    booked_ticket_id: int
    user_id: int
    booking_time: datetime
    status: str

    class Config:
        orm_mode = True