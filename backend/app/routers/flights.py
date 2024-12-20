from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timezone
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

@router.put("/{flight_id}", response_model=schemas.Flight)
def update_flight(flight_id: int, flight: schemas.FlightCreate, db: Session = Depends(database.get_db)) -> schemas.Flight:
    """
    Cập nhật thông tin của một chuyến bay.

    Args:
        flight_id (int): ID của chuyến bay cần cập nhật.
        flight (schemas.FlightCreate): Thông tin chuyến bay cần cập nhật.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Raises:
        HTTPException: Nếu chuyến bay không tồn tại.

    Returns:
        schemas.Flight: Thông tin chuyến bay đã được cập nhật.
    """
    db_flight = services.flight_service.get_flight(db, flight_id)
    if db_flight is None:
        raise HTTPException(status_code=404, detail="Flight not found")
    return services.flight_service.update_flight(db, db_flight, flight)

@router.delete("/{flight_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_flight(flight_id: int, db: Session = Depends(database.get_db)) -> None:
    """
    Xóa một chuyến bay.

    Args:
        flight_id (int): ID của chuyến bay cần xóa.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Raises:
        HTTPException: Nếu chuyến bay không tồn tại.

    Returns:
        schemas.Flight: Thông tin chuyến bay đã bị xóa.
    """
    db_flight = services.flight_service.get_flight(db, flight_id)
    if db_flight is None:
        raise HTTPException(status_code=404, detail="Flight not found")
    services.flight_service.delete_flight(db, db_flight)

@router.get("/stats/overview")
def get_flight_stats(db: Session = Depends(database.get_db)):
    """
    Lấy thống kê chuyến bay.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        dict: Thống kê chuyến bay.
    """
    return services.flight_service.get_flight_stats(db)

@router.put("/{flight_id}/update-and-notify", response_model=schemas.Flight)
def update_flight_and_notify(
    flight_id: int,
    flight_update: schemas.FlightCreate,
    db: Session = Depends(database.get_db)
) -> schemas.Flight:
    """
    Cập nhật thông tin chuyến bay và gửi thông báo đến người dùng đã đặt vé.

    Args:
        flight_id (int): ID của chuyến bay cần cập nhật.
        flight_update (schemas.FlightCreate): Thông tin chuyến bay cần cập nhật.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        schemas.Flight: Thông tin chuyến bay đã được cập nhật.
    """
    db_flight = services.flight_service.get_flight(db, flight_id)
    if db_flight is None:
        raise HTTPException(status_code=404, detail="Flight not found")

    updated_flight = services.flight_service.update_flight(db, db_flight, flight_update)

    # Fetch all users who have booked tickets for this flight
    booked_tickets = db.query(models.BookedTicket).filter(models.BookedTicket.flight_id == flight_id).all()
    user_ids = {ticket.user_id for ticket in booked_tickets}

    # Create notifications for each user
    for user_id in user_ids:
        notification = models.Notification(
            title="Thay đổi thông tin chuyến bay",
            content=f"Chuyến bay {updated_flight.flight_number} đã được cập nhật. Vui lòng kiểm tra lại thông tin chuyến bay của bạn.",
            type="FLIGHT_UPDATE",
            user_id=user_id,
            flight_id=flight_id,
            created_at=datetime.now(timezone.utc),
        )
        db.add(notification)

    db.commit()
    return updated_flight