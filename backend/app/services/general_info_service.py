from fastapi import HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas


def create_general_info(db: Session, general_info: schemas.GeneralInfoCreate) -> models.GeneralInfo:
    """
    Tạo một thông tin chung mới.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        general_info (schemas.GeneralInfoCreate): Thông tin cần tạo.

    Returns:
        models.GeneralInfo: Đối tượng thông tin chung vừa được tạo.
    """
    db_general_info = models.GeneralInfo(**general_info.dict())
    db.add(db_general_info)
    db.commit()
    db.refresh(db_general_info)
    return db_general_info


def get_general_info(db: Session, info_id: int) -> models.GeneralInfo:
    """
    Lấy thông tin chung theo ID.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        info_id (int): ID của thông tin cần lấy.

    Returns:
        models.GeneralInfo: Đối tượng thông tin chung nếu tìm thấy, ngược lại là None.
    """
    general_info = db.query(models.GeneralInfo).filter(models.GeneralInfo.info_id == info_id).first()
    if not general_info:
        raise HTTPException(status_code=404, detail="General info not found")
    return general_info


def get_all_general_info(db: Session) -> List[models.GeneralInfo]:
    """
    Lấy danh sách tất cả các thông tin chung.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        list[models.GeneralInfo]: Danh sách các thông tin chung.
    """
    return db.query(models.GeneralInfo).all()


def update_general_info(
    db: Session,
    info_id: int,
    general_info_update: schemas.GeneralInfoUpdate,
) -> models.GeneralInfo:
    """
    Cập nhật thông tin chung theo ID.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        info_id (int): ID của thông tin cần cập nhật.
        general_info_update (schemas.GeneralInfoUpdate): Dữ liệu cập nhật.

    Returns:
        models.GeneralInfo: Đối tượng thông tin chung sau khi cập nhật.
    """
    db_general_info = db.query(models.GeneralInfo).filter(models.GeneralInfo.info_id == info_id).first()
    if not db_general_info:
        raise HTTPException(status_code=404, detail="General info not found")

    for key, value in general_info_update.dict(exclude_unset=True).items():
        setattr(db_general_info, key, value)

    db.commit()
    db.refresh(db_general_info)
    return db_general_info


def delete_general_info(db: Session, info_id: int) -> bool:
    """
    Xóa thông tin chung theo ID.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        info_id (int): ID của thông tin cần xóa.

    Returns:
        bool: True nếu xóa thành công, False nếu không tìm thấy thông tin.
    """
    db_general_info = db.query(models.GeneralInfo).filter(models.GeneralInfo.info_id == info_id).first()
    if not db_general_info:
        raise HTTPException(status_code=404, detail="General info not found")

    db.delete(db_general_info)
    db.commit()
    return True
