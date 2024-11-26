from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, database, services

router = APIRouter(
    prefix="/airports",
    tags=["airports"],
)

@router.post("/", response_model=schemas.Airport)
def create_airport(airport: schemas.AirportCreate, db: Session = Depends(database.get_db)) -> schemas.Airport:
    """
    Tạo một sân bay mới.

    Args:
        airport (schemas.AirportCreate): Thông tin sân bay cần tạo.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        schemas.Airport: Thông tin sân bay đã được tạo.
    """
    db_airport = services.airport_service.create_airport(db, airport)
    return db_airport

@router.get("/{airport_id}", response_model=schemas.Airport)
def read_airport(airport_id: int, db: Session = Depends(database.get_db)) -> schemas.Airport:
    """
    Đọc thông tin của một sân bay.

    Args:
        airport_id (int): ID của sân bay cần đọc.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Raises:
        HTTPException: Nếu sân bay không tồn tại.

    Returns:
        schemas.Airport: Thông tin sân bay.
    """
    db_airport = services.airport_service.get_airport(db, airport_id)
    if db_airport is None:
        raise HTTPException(status_code=404, detail="Airport not found")
    return db_airport

@router.get("/", response_model=List[schemas.Airport])
def read_airports(db: Session = Depends(database.get_db)) -> List[schemas.Airport]:
    """
    Đọc thông tin của tất cả các sân bay.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        List[schemas.Airport]: Danh sách thông tin các sân bay.
    """
    return services.airport_service.get_airports(db)
