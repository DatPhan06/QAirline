from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas

def create_airport(db: Session, airport: schemas.AirportCreate) -> models.Airport:
    """
    Tạo một sân bay mới.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        airport (schemas.AirportCreate): Thông tin sân bay cần tạo.

    Returns:
        models.Airport: Đối tượng sân bay vừa được tạo.
    """
    db_airport = models.Airport(**airport.dict())
    db.add(db_airport)
    db.commit()
    db.refresh(db_airport)
    return db_airport

def get_airport(db: Session, airport_id: int) -> models.Airport:
    """
    Lấy thông tin một sân bay theo ID.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        airport_id (int): ID của sân bay cần lấy thông tin.

    Returns:
        models.Airport: Đối tượng sân bay nếu tìm thấy, ngược lại là None.
    """
    return db.query(models.Airport).filter(models.Airport.airport_id == airport_id).first()

def get_airports(db: Session) -> List[models.Airport]:
    """
    Lấy danh sách tất cả các sân bay.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        list[models.Airport]: Danh sách các sân bay.
    """
    return db.query(models.Airport).all()

def update_airport(db: Session, db_airport: models.Airport, airport: schemas.AirportCreate) -> models.Airport:
    """
    Cập nhật thông tin của một sân bay.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        db_airport (models.Airport): Đối tượng sân bay cần cập nhật.
        airport (schemas.AirportCreate): Thông tin sân bay cần cập nhật.

    Returns:
        models.Airport: Đối tượng sân bay đã được cập nhật.
    """
    for key, value in airport.dict().items():
        setattr(db_airport, key, value)
    db.commit()
    db.refresh(db_airport)
    return db_airport

def delete_airport(db: Session, db_airport: models.Airport) -> models.Airport:
    """
    Xóa một sân bay.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        db_airport (models.Airport): Đối tượng sân bay cần xóa.

    Returns:
        models.Airport: Đối tượng sân bay đã bị xóa.
    """
    db.delete(db_airport)
    db.commit()
    return db_airport