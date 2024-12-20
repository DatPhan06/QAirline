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

    # Store original flight data before update
    original_flight_data = db_flight.__dict__.copy()

    # Update the flight
    updated_flight = services.flight_service.update_flight(db, db_flight, flight_update)

    # Identify changed fields
    changed_fields = []
    for field, new_value in flight_update.dict(exclude_unset=True).items():
        old_value = original_flight_data.get(field)  # Use dict.get() instead of getattr()
        if old_value != new_value:
            changed_fields.append((field, old_value, new_value))


# If there are changes, send notifications
    if changed_fields:
            # Fetch all users who have booked tickets for this flight
        booked_tickets = db.query(models.BookedTicket).filter(models.BookedTicket.flight_id == flight_id).all()
        user_ids = {ticket.user_id for ticket in booked_tickets}

        # Create a detailed message about the changes

        # Mapping field names to user-friendly labels
        field_labels = {
            "flight_number": "Số hiệu chuyến bay",
            "airplane_id": "Máy bay",
            "departure_airport_id": "Sân bay đi",
            "arrival_airport_id": "Sân bay đến",
            "departure_time": "Thời gian khởi hành",
            "arrival_time": "Thời gian hạ cánh",
            "flight_duration": "Thời lượng bay",
            "status": "Trạng thái",
            "available_seats": "Ghế trống",
            "price": "Giá vé",
        }

        # Function to format field values
        def format_value(field, value):
            if field in ["departure_time", "arrival_time"]:
                if isinstance(value, datetime):
                    return value.strftime("%d/%m/%Y %H:%M")
                return value
            elif field == "price":
                return f"{value:,.0f} VND"
            elif field.endswith("_airport_id"):
                airport = db.query(models.Airport).filter(models.Airport.airport_id == value).first()
                return airport.name if airport else value
            elif field == "airplane_id":
                airplane = db.query(models.Airplane).filter(models.Airplane.airplane_id == value).first()
                return airplane.name if airplane else value
            else:
                return str(value)

        # Build the changes description
        changes_description = "\n".join([
            f"- {field_labels.get(field, field)}: {format_value(field, old_value)} → {format_value(field, new_value)}"
            for field, old_value, new_value in changed_fields
        ])

        notification_content = f"""
        Chuyến bay **{updated_flight.flight_number}** đã có những thay đổi sau:

        {changes_description}

        Vui lòng kiểm tra lại thông tin chuyến bay của bạn.
        """

        # Create notifications for each user
        for user_id in user_ids:
            notification = models.Notification(
                title="Thay đổi thông tin chuyến bay",
                content=notification_content.strip(),
                type="FLIGHT_UPDATE",
                user_id=user_id,
                flight_id=flight_id,
                created_at=datetime.now(timezone.utc),
            )
            db.add(notification)

        db.commit()

    return updated_flight