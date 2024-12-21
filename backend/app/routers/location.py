from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, database, services

router = APIRouter(
    prefix="/locations",
    tags=["locations"],
)

@router.post("/", response_model=schemas.Location)
def create_location(location: schemas.LocationCreate, db: Session = Depends(database.get_db)) -> schemas.Location:
    """
    Tạo một địa điểm mới.

    Args:
        location (schemas.LocationCreate): Thông tin địa điểm cần tạo.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        schemas.Location: Thông tin địa điểm đã được tạo.
    """
    db_location = services.location_service.create_location(db, location)
    return db_location

@router.get("/{location_id}", response_model=schemas.Location)
def read_location(location_id: int, db: Session = Depends(database.get_db)) -> schemas.Location:
    """
    Đọc thông tin của một địa điểm.

    Args:
        location_id (int): ID của địa điểm cần đọc.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Raises:
        HTTPException: Nếu địa điểm không tồn tại.

    Returns:
        schemas.Location: Thông tin địa điểm.
    """
    db_location = services.location_service.get_location(db, location_id)
    if db_location is None:
        raise HTTPException(status_code=404, detail="Location not found")
    return db_location

@router.get("/", response_model=List[schemas.Location])
def read_locations(db: Session = Depends(database.get_db)) -> List[schemas.Location]:
    """
    Đọc thông tin của tất cả các địa điểm.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        List[schemas.Location]: Danh sách thông tin các địa điểm.
    """
    return services.location_service.get_locations(db)

@router.put("/{location_id}", response_model=schemas.Location)
def update_location(location_id: int, location: schemas.LocationCreate, db: Session = Depends(database.get_db)) -> schemas.Location:
    """
    Cập nhật thông tin của một địa điểm.

    Args:
        location_id (int): ID của địa điểm cần cập nhật.
        location (schemas.LocationCreate): Thông tin địa điểm cần cập nhật.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Raises:
        HTTPException: Nếu địa điểm không tồn tại.

    Returns:
        schemas.Location: Thông tin địa điểm đã được cập nhật.
    """
    db_location = services.location_service.get_location(db, location_id)
    if db_location is None:
        raise HTTPException(status_code=404, detail="Location not found")
    return services.location_service.update_location(db, db_location, location)

@router.delete("/{location_id}", response_model=schemas.Location)
def delete_location(location_id: int, db: Session = Depends(database.get_db)) -> schemas.Location:
    """
    Xóa một địa điểm.

    Args:
        location_id (int): ID của địa điểm cần xóa.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Raises:
        HTTPException: Nếu địa điểm không tồn tại.

    Returns:
        schemas.Location: Thông tin địa điểm đã bị xóa.
    """
    db_location = services.location_service.get_location(db, location_id)
    if db_location is None:
        raise HTTPException(status_code=404, detail="Location not found")
    return services.location_service.delete_location(db, db_location)