# backend/app/routers/seats.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app import models, schemas, services
from app.database import get_db

router = APIRouter(
    prefix="/seats",
    tags=["seats"],
)

@router.post("/", response_model=schemas.Seat)
def create_seat(
    seat: schemas.SeatCreate,
    db: Session = Depends(get_db),
) -> models.Seat:
    """
    Tạo một ghế mới.
    """
    return services.seat_service.create_seat(db, seat)

@router.get("/{seat_id}", response_model=schemas.Seat)
def get_seat(
    seat_id: int,
    db: Session = Depends(get_db),
) -> models.Seat:
    """
    Lấy thông tin ghế theo ID.
    """
    seat = services.seat_service.get_seat(db, seat_id)
    if not seat:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Ghế không tồn tại")
    return seat

@router.get("/", response_model=List[schemas.Seat])
def get_seats(
    db: Session = Depends(get_db),
) -> List[models.Seat]:
    """
    Lấy danh sách tất cả ghế.
    """
    return services.seat_service.get_seats(db)

@router.put("/{seat_id}", response_model=schemas.Seat)
def update_seat(
    seat_id: int,
    seat_update: schemas.SeatUpdate,
    db: Session = Depends(get_db),
) -> models.Seat:
    """
    Cập nhật thông tin ghế.
    """
    seat = services.seat_service.update_seat(db, seat_id, seat_update)
    if not seat:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Ghế không tồn tại")
    return seat

@router.delete("/{seat_id}", response_model=schemas.Seat)
def delete_seat(
    seat_id: int,
    db: Session = Depends(get_db),
) -> models.Seat:
    """
    Xóa ghế.
    """
    seat = services.seat_service.delete_seat(db, seat_id)
    if not seat:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Ghế không tồn tại")
    return seat