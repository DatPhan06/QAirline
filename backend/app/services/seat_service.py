# backend/app/services/seat_service.py

from sqlalchemy.orm import Session
from typing import List, Optional
from app import models, schemas

def create_seat(db: Session, seat: schemas.SeatCreate) -> models.Seat:
    """
    Tạo một ghế mới.
    """
    db_seat = models.Seat(
        airplane_id=seat.airplane_id,
        seat_number=seat.seat_number,
        seat_class=seat.seat_class,
        status=seat.status or "available",
    )
    db.add(db_seat)
    db.commit()
    db.refresh(db_seat)
    return db_seat

def get_seat(db: Session, seat_id: int) -> Optional[models.Seat]:
    """
    Lấy thông tin ghế theo ID.
    """
    return db.query(models.Seat).filter(models.Seat.seat_id == seat_id).first()

def get_seats(db: Session) -> List[models.Seat]:
    """
    Lấy danh sách tất cả ghế.
    """
    return db.query(models.Seat).all()

def update_seat(db: Session, seat_id: int, seat_update: schemas.SeatUpdate) -> Optional[models.Seat]:
    """
    Cập nhật thông tin ghế.
    """
    seat = get_seat(db, seat_id)
    if not seat:
        return None
    for key, value in seat_update.dict(exclude_unset=True).items():
        setattr(seat, key, value)
    db.commit()
    db.refresh(seat)
    return seat

def delete_seat(db: Session, seat_id: int) -> Optional[models.Seat]:
    """
    Xóa ghế.
    """
    seat = get_seat(db, seat_id)
    if not seat:
        return None
    db.delete(seat)
    db.commit()
    return seat