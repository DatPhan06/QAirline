# backend/app/routers/seats.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
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

    Args:
        seat (schemas.SeatCreate): Thông tin ghế cần tạo.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        models.Seat: Thông tin ghế vừa được tạo.
    """
    return services.seat_service.create_seat(db, seat)

@router.get("/{seat_id}", response_model=schemas.Seat)
def get_seat(
    seat_id: int,
    db: Session = Depends(get_db),
) -> models.Seat:
    """
    Lấy thông tin ghế theo ID.

    Args:
        seat_id (int): ID của ghế cần lấy thông tin.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Raises:
        HTTPException: Nếu ghế không tồn tại.

    Returns:
        models.Seat: Thông tin ghế.
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

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        List[models.Seat]: Danh sách tất cả ghế.
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

    Args:
        seat_id (int): ID của ghế cần cập nhật.
        seat_update (schemas.SeatUpdate): Thông tin cập nhật ghế.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Raises:
        HTTPException: Nếu ghế không tồn tại.

    Returns:
        models.Seat: Thông tin ghế sau khi cập nhật.
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

    Args:
        seat_id (int): ID của ghế cần xóa.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Raises:
        HTTPException: Nếu ghế không tồn tại.

    Returns:
        models.Seat: Thông tin ghế vừa bị xóa.
    """
    seat = services.seat_service.delete_seat(db, seat_id)
    if not seat:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Ghế không tồn tại")
    return seat

@router.get("/airplane/{airplane_id}", response_model=List[schemas.Seat])
def get_seats_by_airplane_id(
    airplane_id: int,
    db: Session = Depends(get_db),
) -> List[models.Seat]:
    seats = services.seat_service.get_seats_by_airplane_id(db, airplane_id)
    if not seats:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No seats found for this airplane")
    return seats