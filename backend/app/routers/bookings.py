from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas, database

router = APIRouter(
    prefix="/bookings",
    tags=["bookings"],
)

@router.post("/", response_model=schemas.Booking)
def create_booking(booking: schemas.BookingCreate, db: Session = Depends(database.get_db)) -> schemas.Booking:
    """
    Tạo một đặt chỗ mới.

    Args:
        booking (schemas.BookingCreate): Thông tin đặt chỗ.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        schemas.Booking: Đặt chỗ đã được tạo.
    """
    db_booking = models.Booking(**booking.dict())
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking

@router.get("/{booking_id}", response_model=schemas.Booking)
def read_booking(booking_id: int, db: Session = Depends(database.get_db)) -> schemas.Booking:
    """
    Đọc thông tin một đặt chỗ.

    Args:
        booking_id (int): ID của đặt chỗ.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        schemas.Booking: Thông tin đặt chỗ.
    """
    db_booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()
    if db_booking is None:
        raise HTTPException(status_code=404, detail="Booking not found")
    return db_booking