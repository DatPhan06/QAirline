# backend/app/services/ticket_service.py

from typing import List, Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException

from .. import models, schemas


def create_ticket(db: Session, ticket: schemas.TicketCreate) -> models.Ticket:
    """
    Tạo một vé mới.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        ticket (schemas.TicketCreate): Thông tin vé cần tạo.

    Returns:
        models.Ticket: Vé vừa được tạo.
    """
    db_ticket = models.Ticket(
        flight_id=ticket.flight_id,
        seat_id=ticket.seat_id,
        class_type=ticket.class_type,
        price=ticket.price,
        status="available",
    )
    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)
    return db_ticket


def get_ticket(db: Session, ticket_id: int) -> Optional[models.Ticket]:
    """
    Lấy thông tin vé theo ID.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        ticket_id (int): ID của vé cần lấy thông tin.

    Returns:
        Optional[models.Ticket]: Vé nếu tìm thấy, ngược lại là None.
    """
    return db.query(models.Ticket).filter(models.Ticket.ticket_id == ticket_id).first()


def get_tickets(db: Session) -> List[models.Ticket]:
    """
    Lấy danh sách tất cả vé.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        List[models.Ticket]: Danh sách vé.
    """
    return db.query(models.Ticket).all()


def update_ticket(
    db: Session, ticket_id: int, ticket_update: schemas.TicketUpdate
) -> Optional[models.Ticket]:
    """
    Cập nhật thông tin vé.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        ticket_id (int): ID của vé cần cập nhật.
        ticket_update (schemas.TicketUpdate): Thông tin cần cập nhật.

    Returns:
        Optional[models.Ticket]: Vé sau khi cập nhật nếu tồn tại, ngược lại là None.
    """
    db_ticket = get_ticket(db, ticket_id)
    if not db_ticket:
        return None
    update_data = ticket_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_ticket, key, value)
    db.commit()
    db.refresh(db_ticket)
    return db_ticket


def delete_ticket(db: Session, ticket_id: int) -> bool:
    """
    Xóa vé khỏi hệ thống.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        ticket_id (int): ID của vé cần xóa.

    Returns:
        bool: True nếu xóa thành công, ngược lại False.
    """
    db_ticket = get_ticket(db, ticket_id)
    if not db_ticket:
        return False
    db.delete(db_ticket)
    db.commit()
    return True

def get_ticket_by_flight_and_seat(db: Session, flight_id: int, seat_id: int) -> Optional[models.Ticket]:
    """
    Lấy thông tin vé theo flight_id và seat_id.

    Args:
        db (Session): Database session
        flight_id (int): ID của chuyến bay
        seat_id (int): ID của ghế

    Returns:
        Optional[models.Ticket]: Ticket object if found, None otherwise
    """
    return db.query(models.Ticket).filter(
        models.Ticket.flight_id == flight_id,
        models.Ticket.seat_id == seat_id
    ).first()

def create_tickets_for_flight(db: Session, flight_id: int) -> List[models.Ticket]:
    """
    Tạo vé cho tất cả các ghế của một chuyến bay.

    Args:
        db (Session): Database session
        flight_id (int): ID của chuyến bay

    Returns:
        List[models.Ticket]: Danh sách các vé được tạo
    """
    # Get flight info
    flight = db.query(models.Flight).get(flight_id)
    if not flight:
        raise HTTPException(status_code=404, detail="Flight not found")

    # Get all seats for the airplane
    seats = db.query(models.Seat).filter(
        models.Seat.airplane_id == flight.airplane_id
    ).all()

    tickets = []
    for seat in seats:
        # Set price based on seat class
        price = flight.price
        if seat.seat_class.lower() == "business":
            price *= 2  # Business class costs twice as much

        ticket = models.Ticket(
            flight_id=flight_id,
            seat_id=seat.seat_id,
            class_type=seat.seat_class,
            price=price,
            status="available"
        )
        db.add(ticket)
        tickets.append(ticket)

    db.commit()
    return tickets