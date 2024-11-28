from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import database, schemas, services

router = APIRouter(
    prefix="/notifications",
    tags=["notifications"],
)


@router.post("/", response_model=schemas.Notification)
def create_notification(
    notification: schemas.NotificationCreate, db: Session = Depends(database.get_db)
):
    """
    Tạo thông báo mới.

    Args:
        notification (schemas.NotificationCreate): Thông tin thông báo cần tạo.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        schemas.Notification: Thông báo vừa được tạo.
    """
    return services.notification_service.create_notification(db, notification)


@router.get("/{notification_id}", response_model=schemas.Notification)
def read_notification(
    notification_id: int, db: Session = Depends(database.get_db)
):
    """
    Lấy thông tin thông báo theo ID.

    Args:
        notification_id (int): ID của thông báo cần lấy.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        schemas.Notification: Thông báo với ID tương ứng.
    
    Raises:
        HTTPException: Nếu thông báo không được tìm thấy (404).
    """
    notification = services.notification_service.get_notification(db, notification_id)
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    return notification


@router.get("/", response_model=List[schemas.Notification])
def read_notifications(db: Session = Depends(database.get_db)):
    """
    Lấy danh sách tất cả thông báo.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        list[schemas.Notification]: Danh sách các thông báo.
    """
    return services.notification_service.get_notifications(db)


@router.put("/{notification_id}", response_model=schemas.Notification)
def update_notification(
    notification_id: int,
    notification_update: schemas.NotificationCreate,
    db: Session = Depends(database.get_db),
):
    """
    Cập nhật thông báo theo ID.

    Args:
        notification_id (int): ID của thông báo cần cập nhật.
        notification_update (schemas.NotificationCreate): Thông tin cập nhật thông báo.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        schemas.Notification: Thông báo đã được cập nhật.
    
    Raises:
        HTTPException: Nếu thông báo không được tìm thấy (404).
    """
    updated_notification = services.notification_service.update_notification(
        db, notification_id, notification_update
    )
    if not updated_notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    return updated_notification


@router.delete("/{notification_id}")
def delete_notification(
    notification_id: int, db: Session = Depends(database.get_db)
):
    """
    Xóa thông báo theo ID.

    Args:
        notification_id (int): ID của thông báo cần xóa.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        dict: Thông báo xác nhận việc xóa thành công.
    
    Raises:
        HTTPException: Nếu thông báo không được tìm thấy (404).
    """
    success = services.notification_service.delete_notification(db, notification_id)
    if not success:
        raise HTTPException(status_code=404, detail="Notification not found")
    return {"message": success}
