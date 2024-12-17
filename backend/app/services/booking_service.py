from typing import List, Optional
from datetime import datetime, timezone

from sqlalchemy.orm import Session

from .. import models, schemas


def create_booking(
    db: Session,
    booking: schemas.BookedTicketCreate,
    current_user: models.User,
) -> models.BookedTicket:
    """
    Tạo một vé đã đặt mới.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        booking (schemas.BookedTicketCreate): Thông tin vé cần đặt.
        current_user (models.User): Người dùng hiện tại (đã đăng nhập).

    Returns:
        models.BookedTicket: Vé đã đặt vừa được tạo.
    """
    db_booking = models.BookedTicket(
        user_id=current_user.user_id,
        flight_id=booking.flight_id,
        seat_id=booking.seat_id,
        ticket_id=booking.ticket_id,
        price=booking.price,
        booking_time=datetime.now(timezone.utc),
        status="booked",
    )
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking


def get_booking(db: Session, booking_id: int) -> Optional[models.BookedTicket]:
    """
    Lấy thông tin vé đã đặt theo ID.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        booking_id (int): ID của vé đã đặt cần lấy thông tin.

    Returns:
        Optional[models.BookedTicket]: Vé đã đặt nếu tìm thấy, ngược lại là None.
    """
    return (
        db.query(models.BookedTicket)
        .filter(models.BookedTicket.booked_ticket_id == booking_id)
        .first()
    )


def get_bookings_by_user(
    db: Session, user_id: int
) -> List[models.BookedTicket]:
    """
    Lấy danh sách tất cả vé đã đặt của một người dùng.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        user_id (int): ID của người dùng.

    Returns:
        List[models.BookedTicket]: Danh sách vé đã đặt.
    """
    return (
        db.query(models.BookedTicket)
        .filter(models.BookedTicket.user_id == user_id)
        .all()
    )


def update_booking(
    db: Session,
    booking: models.BookedTicket,
    booking_update: schemas.BookedTicketUpdate,
) -> models.BookedTicket:
    """
    Cập nhật thông tin vé đã đặt.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        booking (models.BookedTicket): Vé đã đặt cần cập nhật.
        booking_update (schemas.BookedTicketUpdate): Thông tin cần cập nhật.

    Returns:
        models.BookedTicket: Vé đã đặt sau khi cập nhật.
    """
    update_data = booking_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(booking, key, value)
    booking.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(booking)
    return booking


def delete_booking(db: Session, booking: models.BookedTicket) -> None:
    """
    Xóa vé đã đặt.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        booking (models.BookedTicket): Vé đã đặt cần xóa.

    Returns:
        None
    """
    db.delete(booking)
    db.commit()

def get_all_bookings(db: Session) -> List[models.BookedTicket]:
    """
    Lấy danh sách tất cả vé đã đặt.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        List[models.BookedTicket]: Danh sách tất cả vé đã đặt.
    """
    return db.query(models.BookedTicket).all()

def get_bookings_by_ticket_id(db: Session, ticket_id: int) -> List[models.BookedTicket]:
    """
    Lấy thông tin booking theo ticket_id.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        ticket_id (int): ID của vé.

    Returns:
        List[models.BookedTicket]: Danh sách thông tin booking.
    """
    return db.query(models.BookedTicket).filter(models.BookedTicket.ticket_id == ticket_id).all()