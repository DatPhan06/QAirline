from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, database, services

router = APIRouter(
    prefix="/bookings",
    tags=["bookings"],
)

@router.post("/", response_model=schemas.BookedTicket)
def create_booking(booking: schemas.BookedTicketCreate, db: Session = Depends(database.get_db)) -> schemas.BookedTicket:
    """
    Tạo một đặt chỗ mới.

    Args:
        booking (schemas.BookedTicketCreate): Thông tin đặt chỗ.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        schemas.BookedTicket: Đặt chỗ đã được tạo.
    """
    db_booking = services.booking_service.create_booking(db, booking)
    return db_booking

@router.get("/{booking_id}", response_model=schemas.BookedTicket)
def read_booking(booking_id: int, db: Session = Depends(database.get_db)) -> schemas.BookedTicket:
    """
    Đọc thông tin một đặt chỗ.

    Args:
        booking_id (int): ID của đặt chỗ.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Raises:
        HTTPException: Nếu đặt chỗ không tồn tại.

    Returns:
        schemas.BookedTicket: Thông tin đặt chỗ.
    """
    db_booking = services.booking_service.get_booking(db, booking_id)
    if db_booking is None:
        raise HTTPException(status_code=404, detail="Booking not found")
    return db_booking

@router.get("/", response_model=List[schemas.BookedTicket])
def read_bookings(db: Session = Depends(database.get_db)) -> List[schemas.BookedTicket]:
    """
    Đọc thông tin của tất cả các đặt chỗ.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        List[schemas.BookedTicket]: Danh sách thông tin các đặt chỗ.
    """
    return services.booking_service.get_bookings(db)