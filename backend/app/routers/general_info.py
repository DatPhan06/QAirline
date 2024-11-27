from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, database, services

router = APIRouter(
    prefix="/general-info",
    tags=["general-info"],
)

@router.post("/", response_model=schemas.GeneralInfo)
def create_general_info(
    general_info: schemas.GeneralInfoCreate,
    db: Session = Depends(database.get_db)
) -> schemas.GeneralInfo:
    """
    Tạo một thông tin chung mới.

    Args:
        general_info (schemas.GeneralInfoCreate): Thông tin cần tạo.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        schemas.GeneralInfo: Thông tin đã được tạo.
    """
    return services.general_info_service.create_general_info(db, general_info)

@router.get("/{info_id}", response_model=schemas.GeneralInfo)
def get_general_info(
    info_id: int,
    db: Session = Depends(database.get_db)
) -> schemas.GeneralInfo:
    """
    Lấy thông tin chung theo ID.

    Args:
        info_id (int): ID của thông tin cần lấy.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Raises:
        HTTPException: Nếu thông tin không tồn tại.

    Returns:
        schemas.GeneralInfo: Thông tin tìm được.
    """
    general_info = services.general_info_service.get_general_info(db, info_id)
    if not general_info:
        raise HTTPException(status_code=404, detail="General info not found")
    return general_info

@router.get("/", response_model=List[schemas.GeneralInfo])
def get_all_general_info(db: Session = Depends(database.get_db)) -> List[schemas.GeneralInfo]:
    """
    Lấy danh sách tất cả các thông tin chung.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        List[schemas.GeneralInfo]: Danh sách các thông tin chung.
    """
    return services.general_info_service.get_all_general_info(db)

@router.put("/{info_id}", response_model=schemas.GeneralInfo)
def update_general_info(
    info_id: int,
    general_info: schemas.GeneralInfoUpdate,
    db: Session = Depends(database.get_db)
) -> schemas.GeneralInfo:
    """
    Cập nhật thông tin chung theo ID.

    Args:
        info_id (int): ID của thông tin cần cập nhật.
        general_info (schemas.GeneralInfoUpdate): Thông tin cập nhật.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Raises:
        HTTPException: Nếu thông tin không tồn tại.

    Returns:
        schemas.GeneralInfo: Thông tin sau khi cập nhật.
    """
    updated_info = services.general_info_service.update_general_info(db, info_id, general_info)
    if not updated_info:
        raise HTTPException(status_code=404, detail="General info not found")
    return updated_info

@router.delete("/{info_id}", response_model=dict)
def delete_general_info(
    info_id: int,
    db: Session = Depends(database.get_db)
) -> dict:
    """
    Xóa thông tin chung theo ID.

    Args:
        info_id (int): ID của thông tin cần xóa.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Raises:
        HTTPException: Nếu thông tin không tồn tại.

    Returns:
        dict: Thông báo xóa thành công.
    """
    success = services.general_info_service.delete_general_info(db, info_id)
    if not success:
        raise HTTPException(status_code=404, detail="General info not found")
    return {"detail": "General info deleted successfully"}
