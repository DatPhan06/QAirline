from fastapi import HTTPException
from sqlalchemy.orm import Session, joinedload
from typing import List  # Add this import
from .. import models, schemas


def create_flight(db: Session, flight: schemas.FlightCreate) -> models.Flight:
    """
    Tạo một chuyến bay mới.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        flight (schemas.FlightCreate): Thông tin chuyến bay cần tạo.

    Returns:
        models.Flight: Đối tượng chuyến bay vừa được tạo.
    """
    db_flight = models.Flight(**flight.dict())
    db.add(db_flight)
    db.commit()
    db.refresh(db_flight)
    return db_flight

def get_flight(db: Session, flight_id: int) -> models.Flight:
    """
    Lấy thông tin một chuyến bay theo ID.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        flight_id (int): ID của chuyến bay cần lấy thông tin.

    Returns:
        models.Flight: Đối tượng chuyến bay nếu tìm thấy, ngược lại là None.
    """
    return db.query(models.Flight).options(
            joinedload(models.Flight.airplane).joinedload(models.Airplane.seats)
        ).filter(models.Flight.flight_id == flight_id).first()

def get_flights(db: Session) -> List[models.Flight]:
    """
    Lấy danh sách tất cả các chuyến bay.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        list[models.Flight]: Danh sách các chuyến bay.
    """
    flights = db.query(models.Flight).options(
        joinedload(models.Flight.departure_airport),
        joinedload(models.Flight.arrival_airport)
    ).all()
    return flights
    
def update_flight(db: Session, db_flight: models.Flight, flight: schemas.FlightCreate) -> models.Flight:
    """
    Cập nhật thông tin của một chuyến bay.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        db_flight (models.Flight): Đối tượng chuyến bay cần cập nhật.
        flight (schemas.FlightCreate): Thông tin chuyến bay cần cập nhật.

    Returns:
        models.Flight: Đối tượng chuyến bay đã được cập nhật.
    """
    update_data = flight.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_flight, key, value)
    db.commit()
    db.refresh(db_flight)
    return db_flight

def delete_flight(db: Session, db_flight: models.Flight) -> None:
    """
    Xóa một chuyến bay.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        db_flight (models.Flight): Đối tượng chuyến bay cần xóa.

    Returns:
        models.Flight: Đối tượng chuyến bay đã bị xóa.
    """
    db.delete(db_flight)
    db.commit()