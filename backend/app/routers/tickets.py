# backend/app/routers/tickets.py

from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .. import models, schemas, services
from ..database import get_db

router = APIRouter(
    prefix="/tickets",
    tags=["tickets"],
)


@router.post("/", response_model=schemas.Ticket)
def create_ticket(
    ticket: schemas.TicketCreate, db: Session = Depends(get_db)
) -> models.Ticket:
    """
    Tạo một vé mới.

    Args:
        ticket (schemas.TicketCreate): Thông tin vé cần tạo.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        models.Ticket: Vé vừa được tạo.
    """
    return services.ticket_service.create_ticket(db, ticket)


@router.get("/{ticket_id}", response_model=schemas.Ticket)
def get_ticket(ticket_id: int, db: Session = Depends(get_db)) -> models.Ticket:
    """
    Lấy thông tin vé theo ID.

    Args:
        ticket_id (int): ID của vé cần lấy thông tin.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Raises:
        HTTPException: Nếu không tìm thấy vé với ID đã cho.

    Returns:
        models.Ticket: Thông tin vé.
    """
    ticket = services.ticket_service.get_ticket(db, ticket_id)
    if not ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Vé không tồn tại"
        )
    return ticket


@router.get("/", response_model=List[schemas.Ticket])
def get_tickets(db: Session = Depends(get_db)) -> List[models.Ticket]:
    """
    Lấy danh sách tất cả vé.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        List[models.Ticket]: Danh sách vé.
    """
    return services.ticket_service.get_tickets(db)


@router.put("/{ticket_id}", response_model=schemas.Ticket)
def update_ticket(
    ticket_id: int, ticket_update: schemas.TicketUpdate, db: Session = Depends(get_db)
) -> models.Ticket:
    """
    Cập nhật thông tin vé.

    Args:
        ticket_id (int): ID của vé cần cập nhật.
        ticket_update (schemas.TicketUpdate): Thông tin cần cập nhật.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Raises:
        HTTPException: Nếu vé không tồn tại.

    Returns:
        models.Ticket: Vé sau khi cập nhật.
    """
    ticket = services.ticket_service.update_ticket(db, ticket_id, ticket_update)
    if not ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Vé không tồn tại"
        )
    return ticket


@router.delete("/{ticket_id}", response_model=dict)
def delete_ticket(ticket_id: int, db: Session = Depends(get_db)) -> dict:
    """
    Xóa vé khỏi hệ thống.

    Args:
        ticket_id (int): ID của vé cần xóa.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Raises:
        HTTPException: Nếu vé không tồn tại.

    Returns:
        dict: Thông báo xác nhận xóa thành công.
    """
    success = services.ticket_service.delete_ticket(db, ticket_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Vé không tồn tại"
        )
    return {"detail": "Xóa vé thành công"}

@router.get("/flight/{flight_id}/seat/{seat_id}", response_model=schemas.Ticket)
def get_ticket_by_flight_and_seat(
    flight_id: int,
    seat_id: int,
    db: Session = Depends(get_db)
) -> models.Ticket:
    """
    Lấy thông tin vé theo flight_id và seat_id.

    Args:
        flight_id (int): ID của chuyến bay
        seat_id (int): ID của ghế
        db (Session): Database session

    Returns:
        models.Ticket: Thông tin vé
    """
    ticket = services.ticket_service.get_ticket_by_flight_and_seat(db, flight_id, seat_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket

@router.post("/flight/{flight_id}/create-all", response_model=List[schemas.Ticket])
def create_tickets_for_flight(
    flight_id: int,
    db: Session = Depends(get_db)
) -> List[models.Ticket]:
    """
    Tạo vé cho tất cả các ghế của một chuyến bay.

    Args:
        flight_id (int): ID của chuyến bay
        db (Session): Database session

    Returns:
        List[models.Ticket]: Danh sách các vé được tạo
    """
    return services.ticket_service.create_tickets_for_flight(db, flight_id)

@router.get("/flight/{flight_id}", response_model=List[schemas.Ticket])
def get_tickets_by_flight_id(flight_id: int, db: Session = Depends(get_db)) -> List[models.Ticket]:
    """
    Lấy danh sách vé theo ID của chuyến bay.

    Args:
        flight_id (int): ID của chuyến bay.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        List[models.Ticket]: Danh sách vé của chuyến bay.
    """
    tickets = services.ticket_service.get_tickets_by_flight_id(db, flight_id)
    if not tickets:
        raise HTTPException(status_code=404, detail="Không tìm thấy vé cho chuyến bay này")
    return tickets