from typing import List, Union

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func


from .. import models, schemas, services
from ..database import get_db
from ..services.auth import get_current_active_user, get_current_admin, get_current_user_or_admin


router = APIRouter(
    prefix="/bookings",
    tags=["bookings"],
)

# backend/app/routers/bookings.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from .. import models, schemas, database, services
from ..services.auth import get_current_admin

router = APIRouter(
    prefix="/bookings",
    tags=["bookings"],
)

@router.get("/stats/overview")
def get_booking_stats(
    db: Session = Depends(get_db),
    current_admin: models.Admin = Depends(get_current_admin),
):
    total_bookings = db.query(models.BookedTicket).count()
    total_revenue = db.query(func.sum(models.BookedTicket.price)).scalar() or 0

    bookings_by_user = (
        db.query(models.User.username, func.count(models.BookedTicket.booked_ticket_id).label('bookings'))
        .join(models.BookedTicket, models.BookedTicket.user_id == models.User.user_id)
        .group_by(models.User.username)
        .all()
    )
    bookings_by_user = [{"username": username, "bookings": bookings} for username, bookings in bookings_by_user]

    bookings_by_flight = (
        db.query(models.Flight.flight_number, func.count(models.BookedTicket.booked_ticket_id).label('bookings'))
        .join(models.BookedTicket, models.BookedTicket.flight_id == models.Flight.flight_id)
        .group_by(models.Flight.flight_number)
        .all()
    )
    bookings_by_flight = [{"flightNumber": flight_number, "bookings": bookings} for flight_number, bookings in bookings_by_flight]

    return {
        "totalBookings": total_bookings,
        "totalRevenue": total_revenue,
        "bookingsByUser": bookings_by_user,
        "bookingsByFlight": bookings_by_flight,
    }

@router.post("/", response_model=schemas.BookedTicket)
def create_booking(
    booking: schemas.BookedTicketCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user),
) -> models.BookedTicket:
    """
    Tạo một vé đã đặt mới.

    Args:
        booking (schemas.BookedTicketCreate): Thông tin vé cần đặt.
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        current_user (models.User): Người dùng hiện tại (đã đăng nhập).

    Returns:
        models.BookedTicket: Vé đã đặt vừa được tạo.
    """
    return services.booking_service.create_booking(db, booking, current_user)

@router.get("/{booking_id}", response_model=schemas.BookedTicket)
def get_booking(
    booking_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user),
) -> models.BookedTicket:
    """
    Lấy thông tin vé đã đặt theo ID.

    Args:
        booking_id (int): ID của vé đã đặt cần lấy thông tin.
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        current_user (models.User): Người dùng hiện tại (đã đăng nhập).

    Raises:
        HTTPException: Nếu không tìm thấy vé với ID đã cho hoặc người dùng không có quyền truy cập.

    Returns:
        models.BookedTicket: Thông tin vé đã đặt.
    """
    booking = services.booking_service.get_booking(db, booking_id)
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Vé đã đặt không tồn tại"
        )
    if booking.user_id != current_user.user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Bạn không có quyền truy cập vé này",
        )
    return booking

@router.get("/ticket/{ticket_id}", response_model=schemas.BookedTicket)
def get_booking_by_ticket_id(
    ticket_id: int,
    db: Session = Depends(get_db),
    current_user: Union[models.User, models.Admin] = Depends(get_current_user_or_admin),
) -> models.BookedTicket:
    """
    Lấy thông tin booking theo ticket_id.

    Args:
        ticket_id (int): ID của vé.
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        current_user (Union[models.User, models.Admin]): Người dùng hiện tại (đã đăng nhập).

    Returns:
        models.BookedTicket: Thông tin booking.
    """
    booking = services.booking_service.get_booking_by_ticket_id(db, ticket_id)
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Booking không tồn tại"
        )
    return booking


@router.get("/", response_model=List[schemas.BookedTicket])
def get_bookings(
    db: Session = Depends(get_db),
    current_user: Union[models.User, models.Admin] = Depends(get_current_user_or_admin),
) -> List[models.BookedTicket]:
    """
    Lấy danh sách tất cả vé đã đặt của người dùng hiện tại.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        current_user (models.User): Người dùng hiện tại (đã đăng nhập).

    Returns:
        List[models.BookedTicket]: Danh sách vé đã đặt.
    """
    if isinstance(current_user, models.Admin):
        return services.booking_service.get_all_bookings(db)
    return services.booking_service.get_bookings_by_user(db, current_user.user_id)

@router.put("/{booking_id}", response_model=schemas.BookedTicket)
def update_booking(
    booking_id: int,
    booking_update: schemas.BookedTicketUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user),
) -> models.BookedTicket:
    """
    Cập nhật thông tin vé đã đặt.

    Args:
        booking_id (int): ID của vé đã đặt cần cập nhật.
        booking_update (schemas.BookedTicketUpdate): Thông tin cần cập nhật.
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        current_user (models.User): Người dùng hiện tại (đã đăng nhập).

    Raises:
        HTTPException: Nếu vé đã đặt không tồn tại hoặc người dùng không có quyền truy cập.

    Returns:
        models.BookedTicket: Vé đã đặt sau khi cập nhật.
    """
    booking = services.booking_service.get_booking(db, booking_id)
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Vé đã đặt không tồn tại"
        )
    if booking.user_id != current_user.user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Bạn không có quyền cập nhật vé này",
        )
    return services.booking_service.update_booking(db, booking, booking_update)

@router.delete("/{booking_id}", response_model=dict)
def delete_booking(
    booking_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user),
) -> dict:
    """
    Xóa vé đã đặt.

    Args:
        booking_id (int): ID của vé đã đặt cần xóa.
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        current_user (models.User): Người dùng hiện tại (đã đăng nhập).

    Raises:
        HTTPException: Nếu vé đã đặt không tồn tại hoặc người dùng không có quyền truy cập.

    Returns:
        dict: Thông báo xác nhận xóa thành công.
    """
    booking = services.booking_service.get_booking(db, booking_id)
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Vé đã đặt không tồn tại"
        )
    if booking.user_id != current_user.user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Bạn không có quyền xóa vé này",
        )
    services.booking_service.delete_booking(db, booking)
    return {"detail": "Xóa vé đã đặt thành công"}