from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import database, schemas, services

router = APIRouter(
    prefix="/flightlogs",
    tags=["flightlogs"],
)


@router.post("/", response_model=schemas.FlightLog)
def create_flightlog(
    flightlog: schemas.FlightLogCreate, db: Session = Depends(database.get_db)
):
    """
    Tạo nhật ký chuyến bay mới.

    Args:
        flightlog (schemas.FlightLogCreate): Dữ liệu nhật ký chuyến bay cần tạo.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        schemas.FlightLog: Đối tượng nhật ký chuyến bay vừa được tạo.
    """
    return services.flight_log_service.create_flightlog(db, flightlog)


@router.get("/{log_id}", response_model=schemas.FlightLog)
def read_flightlog(
    log_id: int, db: Session = Depends(database.get_db)
):
    """
    Lấy thông tin nhật ký chuyến bay theo ID.

    Args:
        log_id (int): ID của nhật ký chuyến bay cần lấy thông tin.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Raises:
        HTTPException: Nếu không tìm thấy nhật ký chuyến bay với ID được cung cấp.

    Returns:
        schemas.FlightLog: Thông tin của nhật ký chuyến bay được tìm thấy.
    """
    flightlog = services.flight_log_service.get_flightlog(db, log_id)
    if not flightlog:
        raise HTTPException(status_code=404, detail="Flight log not found")
    return flightlog


@router.get("/", response_model=List[schemas.FlightLog])
def read_flightlogs(db: Session = Depends(database.get_db)):
    """
    Lấy danh sách tất cả nhật ký chuyến bay.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        List[schemas.FlightLog]: Danh sách tất cả các nhật ký chuyến bay.
    """
    return services.flight_log_service.get_flightlogs(db)


@router.put("/{log_id}", response_model=schemas.FlightLog)
def update_flightlog(
    log_id: int,
    flightlog_update: schemas.FlightLogCreate,
    db: Session = Depends(database.get_db),
):
    """
    Cập nhật thông tin nhật ký chuyến bay theo ID.

    Args:
        log_id (int): ID của nhật ký chuyến bay cần cập nhật.
        flightlog_update (schemas.FlightLogCreate): Dữ liệu cập nhật cho nhật ký chuyến bay.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Raises:
        HTTPException: Nếu không tìm thấy nhật ký chuyến bay với ID được cung cấp.

    Returns:
        schemas.FlightLog: Thông tin nhật ký chuyến bay sau khi cập nhật.
    """
    updated_flightlog = services.flight_log_service.update_flightlog(
        db, log_id, flightlog_update
    )
    if not updated_flightlog:
        raise HTTPException(status_code=404, detail="Flight log not found")
    return updated_flightlog


@router.delete("/{log_id}")
def delete_flightlog(
    log_id: int, db: Session = Depends(database.get_db)
):
    """
    Xóa nhật ký chuyến bay theo ID.

    Args:
        log_id (int): ID của nhật ký chuyến bay cần xóa.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Raises:
        HTTPException: Nếu không tìm thấy nhật ký chuyến bay với ID được cung cấp.

    Returns:
        dict: Thông báo xác nhận xóa thành công.
    """
    success = services.flight_log_service.delete_flightlog(db, log_id)
    if not success:
        raise HTTPException(status_code=404, detail="Flight log not found")
    return {"message": success}
