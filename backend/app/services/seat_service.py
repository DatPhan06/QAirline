# backend/app/services/seat_service.py

from sqlalchemy.orm import Session
from typing import List, Optional
from app import models, schemas

def create_seat(db: Session, seat: schemas.SeatCreate) -> models.Seat:
    """
    Tạo một ghế mới trong cơ sở dữ liệu.

    Thực hiện việc tạo một đối tượng ghế mới từ thông tin được cung cấp trong 
    `seat` (bao gồm mã máy bay, số ghế, loại ghế, và trạng thái). Nếu trạng thái 
    không được cung cấp, mặc định là "available".

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        seat (schemas.SeatCreate): Thông tin ghế cần tạo.

    Returns:
        models.Seat: Đối tượng ghế đã được tạo trong cơ sở dữ liệu.
    """
    db_seat = models.Seat(
        airplane_id=seat.airplane_id,
        seat_number=seat.seat_number,
        seat_class=seat.seat_class,
        status=seat.status or "available",
    )
    # Thêm ghế mới vào cơ sở dữ liệu
    db.add(db_seat)
    db.commit()  # Lưu thay đổi vào cơ sở dữ liệu
    db.refresh(db_seat)  # Làm mới đối tượng ghế sau khi đã commit
    return db_seat

def get_seat(db: Session, seat_id: int) -> Optional[models.Seat]:
    """
    Lấy thông tin của một ghế dựa trên ID.

    Tìm và trả về thông tin của một ghế với ID cụ thể từ cơ sở dữ liệu. 
    Nếu không tìm thấy ghế, trả về `None`.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        seat_id (int): ID của ghế cần lấy thông tin.

    Returns:
        Optional[models.Seat]: Đối tượng ghế nếu tìm thấy, `None` nếu không tìm thấy.
    """
    return db.query(models.Seat).filter(models.Seat.seat_id == seat_id).first()

def get_seats(db: Session) -> List[models.Seat]:
    """
    Lấy danh sách tất cả ghế trong cơ sở dữ liệu.

    Trả về một danh sách các đối tượng ghế có trong cơ sở dữ liệu.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        List[models.Seat]: Danh sách các đối tượng ghế.
    """
    return db.query(models.Seat).all()

def update_seat(db: Session, seat_id: int, seat_update: schemas.SeatUpdate) -> Optional[models.Seat]:
    """
    Cập nhật thông tin của một ghế dựa trên ID.

    Cập nhật thông tin ghế với ID cụ thể bằng các thông tin mới từ `seat_update`.
    Chỉ các trường được cung cấp trong `seat_update` sẽ được cập nhật. 
    Nếu không tìm thấy ghế với ID tương ứng, trả về `None`.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        seat_id (int): ID của ghế cần cập nhật.
        seat_update (schemas.SeatUpdate): Thông tin mới cần cập nhật cho ghế.

    Returns:
        Optional[models.Seat]: Đối tượng ghế đã được cập nhật nếu thành công, `None` nếu không tìm thấy ghế.
    """
    seat = get_seat(db, seat_id)
    if not seat:
        return None
    # Cập nhật các trường của ghế
    for key, value in seat_update.dict(exclude_unset=True).items():
        setattr(seat, key, value)
    db.commit()  # Lưu thay đổi vào cơ sở dữ liệu
    db.refresh(seat)  # Làm mới đối tượng ghế sau khi đã commit
    return seat

def delete_seat(db: Session, seat_id: int) -> Optional[models.Seat]:
    """
    Xóa ghế khỏi cơ sở dữ liệu.

    Xóa ghế có ID tương ứng khỏi cơ sở dữ liệu. Nếu không tìm thấy ghế với ID 
    tương ứng, trả về `None`.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        seat_id (int): ID của ghế cần xóa.

    Returns:
        Optional[models.Seat]: Đối tượng ghế đã bị xóa nếu thành công, `None` nếu không tìm thấy ghế.
    """
    seat = get_seat(db, seat_id)
    if not seat:
        return None
    db.delete(seat)  # Xóa ghế khỏi cơ sở dữ liệu
    db.commit()  # Lưu thay đổi vào cơ sở dữ liệu
    return seat

def get_seats_by_airplane_id(db: Session, airplane_id: int) -> List[models.Seat]:
    return db.query(models.Seat).filter(models.Seat.airplane_id == airplane_id).all()
