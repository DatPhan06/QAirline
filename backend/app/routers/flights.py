from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, database, services

router = APIRouter(
    prefix="/flights",
    tags=["flights"],
)

@router.post("/", response_model=schemas.Flight)
def create_flight(flight: schemas.FlightCreate, db: Session = Depends(database.get_db)) -> schemas.Flight:
    """
    Tạo một chuyến bay mới.

    Args:
        flight (schemas.FlightCreate): Thông tin chuyến bay cần tạo.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        schemas.Flight: Thông tin chuyến bay đã được tạo.
    """
    db_flight = services.flight_service.create_flight(db, flight)
    return db_flight

@router.get("/{flight_id}", response_model=schemas.Flight)
def read_flight(flight_id: int, db: Session = Depends(database.get_db)) -> schemas.Flight:
    """
    Đọc thông tin của một chuyến bay.

    Args:
        flight_id (int): ID của chuyến bay cần đọc.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Raises:
        HTTPException: Nếu chuyến bay không tồn tại.

    Returns:
        schemas.Flight: Thông tin chuyến bay.
    """
    db_flight = services.flight_service.get_flight(db, flight_id)
    if db_flight is None:
        raise HTTPException(status_code=404, detail="Flight not found")
    return db_flight

@router.get("/", response_model=List[schemas.Flight])
def read_flights(db: Session = Depends(database.get_db)) -> List[schemas.Flight]:
    """
    Đọc thông tin của tất cả các chuyến bay.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        List[schemas.Flight]: Danh sách thông tin các chuyến bay.
    """
    return services.flight_service.get_flights(db)