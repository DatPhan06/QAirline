from sqlalchemy.orm import Session
from .. import models, schemas

def create_booking(db: Session, booking: schemas.BookedTicketCreate) -> models.BookedTicket:
    """
    Tạo một đặt chỗ mới.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        booking (schemas.BookedTicketCreate): Thông tin đặt chỗ cần tạo.

    Returns:
        models.BookedTicket: Đặt chỗ vừa được tạo.
    """
    db_booking = models.BookedTicket(**booking.dict())
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking

def get_booking(db: Session, booking_id: int) -> models.BookedTicket:
    """
    Lấy thông tin đặt chỗ theo ID.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        booking_id (int): ID của đặt chỗ cần lấy thông tin.

    Returns:
        models.BookedTicket: Đặt chỗ nếu tìm thấy, ngược lại là None.
    """
    return db.query(models.BookedTicket).filter(models.BookedTicket.booked_ticket_id == booking_id).first()

def get_bookings(db: Session) -> list[models.BookedTicket]:
    """
    Lấy danh sách tất cả các đặt chỗ.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        list[models.BookedTicket]: Danh sách các đặt chỗ.
    """
    return db.query(models.BookedTicket).all()