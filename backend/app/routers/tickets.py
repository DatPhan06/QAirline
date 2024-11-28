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