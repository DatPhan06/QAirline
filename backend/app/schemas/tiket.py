# backend/app/schemas/ticket.py

from typing import Optional
from decimal import Decimal
from pydantic import BaseModel


class TicketBase(BaseModel):
    """
    Lớp cơ sở cho vé.

    Attributes:
        flight_id (int): ID của chuyến bay.
        seat_id (int): ID của ghế ngồi.
        class_type (str): Loại vé (ví dụ: 'Economy', 'Business').
        price (Decimal): Giá vé.
    """

    flight_id: int
    seat_id: int
    class_type: str
    price: Decimal


class TicketCreate(TicketBase):
    """
    Lớp dùng để tạo mới vé.
    """

    pass


class TicketUpdate(BaseModel):
    """
    Lớp dùng để cập nhật thông tin vé.

    Attributes:
        class_type (Optional[str]): Loại vé mới.
        price (Optional[Decimal]): Giá vé mới.
        status (Optional[str]): Trạng thái vé mới.
        seat_id (Optional[int]): ID ghế ngồi mới.
    """

    class_type: Optional[str] = None
    price: Optional[Decimal] = None
    status: Optional[str] = None
    seat_id: Optional[int] = None


class Ticket(TicketBase):
    """
    Lớp đại diện cho vé được trả về từ API.

    Attributes:
        ticket_id (int): ID của vé.
        status (str): Trạng thái của vé.
    """

    ticket_id: int
    status: str

    class Config:
        orm_mode = True