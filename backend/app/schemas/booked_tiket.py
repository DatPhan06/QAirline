from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel
from .flight import Flight
from .user import User
from .seat import Seat


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
    flight: Flight
    user_id: int
    user: User 
    seat: Seat
    booking_time: datetime
    status: str

    class Config:
        orm_mode = True

class BookingStats(BaseModel):
    month: Optional[datetime]
    day: Optional[int]
    bookings: int
    revenue: float

    class Config:
        orm_mode = True

class BookingStatsOverview(BaseModel):
    totalBookings: int
    totalRevenue: float
    bookingsByMonth: Optional[List[BookingStats]]
    bookingsByDay: Optional[List[BookingStats]]
    class Config:
        orm_mode = True