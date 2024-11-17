from sqlalchemy.orm import Session
from .. import models, schemas

def create_booking(db: Session, booking: schemas.BookingCreate) -> models.Booking:
    """
    Tạo một đặt chỗ mới.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        booking (schemas.BookingCreate): Thông tin đặt chỗ cần tạo.

    Returns:
        models.Booking: Đặt chỗ vừa được tạo.
    """
    db_booking = models.Booking(**booking.dict())
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking

def get_booking(db: Session, booking_id: int) -> models.Booking:
    """
    Lấy thông tin đặt chỗ theo ID.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        booking_id (int): ID của đặt chỗ cần lấy.

    Returns:
        models.Booking: Đặt chỗ tương ứng với ID, nếu có.
    """
    return db.query(models.Booking).filter(models.Booking.id == booking_id).first()