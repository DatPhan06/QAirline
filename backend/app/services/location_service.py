from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas

def create_location(db: Session, location: schemas.LocationCreate) -> models.Location:
    """
    Tạo một địa điểm mới.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        location (schemas.LocationCreate): Thông tin địa điểm cần tạo.

    Returns:
        models.Location: Đối tượng địa điểm vừa được tạo.
    """
    db_location = models.Location(**location.dict())
    db.add(db_location)  
    db.commit()
    db.refresh(db_location)
    return db_location

def get_location(db: Session, location_id: int) -> models.Location:
    """
    Lấy thông tin một địa điểm theo ID.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        location_id (int): ID của địa điểm cần lấy thông tin.

    Returns:
        models.Location: Đối tượng địa điểm nếu tìm thấy, ngược lại là None.
    """
    return db.query(models.Location).filter(models.Location.location_id == location_id).first()

def get_locations(db: Session) -> List[models.Location]:
    """
    Lấy danh sách tất cả các địa điểm.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        
    Returns:
        list[models.Location]: Danh sách các địa điểm.
    """
    return db.query(models.Location).all()

def update_location(db: Session, db_location: models.Location, location: schemas.LocationCreate) -> models.Location:
    """
    Cập nhật thông tin của một địa điểm.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        db_location (models.Location): Đối tượng địa điểm cần cập nhật.
        location (schemas.LocationCreate): Thông tin địa điểm cần cập nhật.

    Returns:
        models.Location: Đối tượng địa điểm đã được cập nhật.
    """
    for key, value in location.dict().items():
        setattr(db_location, key, value)
    db.commit()
    db.refresh(db_location)
    return db_location

def delete_location(db: Session, db_location: models.Location) -> models.Location:
    """
    Xóa một địa điểm.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        db_location (models.Location): Đối tượng địa điểm cần xóa.

    Returns:
        models.Location: Đối tượng địa điểm đã bị xóa.
    """
    db.delete(db_location)
    db.commit()
    return db_location