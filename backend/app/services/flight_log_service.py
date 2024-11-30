from sqlalchemy.orm import Session
from typing import List, Optional
from .. import models, schemas


def create_flightlog(db: Session, flightlog: schemas.FlightLogCreate) -> models.FlightLog:
    """
    Tạo nhật ký chuyến bay mới.
    """
    db_flightlog = models.FlightLog(**flightlog.dict())
    db.add(db_flightlog)
    db.commit()
    db.refresh(db_flightlog)
    return db_flightlog


def get_flightlog(db: Session, log_id: int) -> Optional[models.FlightLog]:
    """
    Lấy thông tin nhật ký chuyến bay theo ID.
    """
    return db.query(models.FlightLog).filter(models.FlightLog.log_id == log_id).first()


def get_flightlogs(db: Session) -> List[models.FlightLog]:
    """
    Lấy danh sách tất cả nhật ký chuyến bay.
    """
    return db.query(models.FlightLog).all()


def update_flightlog(db: Session, log_id: int, flightlog_update: schemas.FlightLogCreate) -> Optional[models.FlightLog]:
    """
    Cập nhật thông tin nhật ký chuyến bay theo ID.
    """
    db_flightlog = get_flightlog(db, log_id)
    if not db_flightlog:
        return None

    update_data = flightlog_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_flightlog, key, value)

    db.commit()
    db.refresh(db_flightlog)
    return db_flightlog


def delete_flightlog(db: Session, log_id: int) -> bool:
    """
    Xóa nhật ký chuyến bay theo ID.
    """
    db_flightlog = get_flightlog(db, log_id)
    if not db_flightlog:
        return False

    db.delete(db_flightlog)
    db.commit()
    return True
