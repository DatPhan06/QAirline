from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import List, Optional
from .. import models, schemas


def create_notification(db: Session, notification: schemas.NotificationCreate) -> models.Notification:
    """
    Tạo thông báo mới.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        notification (schemas.NotificationCreate): Dữ liệu thông báo cần tạo.

    Returns:
        models.Notification: Thông báo vừa được tạo.
    """
    db_notification = models.Notification(**notification.dict())
    db.add(db_notification)
    db.commit()
    db.refresh(db_notification)
    return db_notification


def get_notification(db: Session, notification_id: int) -> Optional[models.Notification]:
    """
    Lấy thông tin thông báo theo ID.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        notification_id (int): ID của thông báo cần lấy.

    Returns:
        Optional[models.Notification]: Thông báo với ID tương ứng nếu tồn tại, ngược lại trả về None.
    """
    return db.query(models.Notification).filter(models.Notification.notification_id == notification_id).first()


def get_notifications(db: Session) -> List[models.Notification]:
    """
    Lấy danh sách tất cả thông báo.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        List[models.Notification]: Danh sách tất cả thông báo trong cơ sở dữ liệu.
    """
    return db.query(models.Notification).all()


def update_notification(db: Session, notification_id: int, notification_update: schemas.NotificationCreate) -> Optional[models.Notification]:
    """
    Cập nhật thông báo theo ID.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        notification_id (int): ID của thông báo cần cập nhật.
        notification_update (schemas.NotificationCreate): Dữ liệu mới để cập nhật thông báo.

    Returns:
        Optional[models.Notification]: Thông báo đã được cập nhật nếu tìm thấy, ngược lại trả về None.
    """
    db_notification = get_notification(db, notification_id)
    if not db_notification:
        return None

    update_data = notification_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_notification, key, value)

    db.commit()
    db.refresh(db_notification)
    return db_notification


def delete_notification(db: Session, notification_id: int) -> bool:
    """
    Xóa thông báo theo ID.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        notification_id (int): ID của thông báo cần xóa.

    Returns:
        bool: True nếu xóa thành công, False nếu thông báo không tồn tại.
    """
    db_notification = get_notification(db, notification_id)
    if not db_notification:
        return False

    db.delete(db_notification)
    db.commit()
    return True

def get_user_notifications(db: Session, user_id: int) -> List[models.Notification]:
    """
    Lấy danh sách thông báo của người dùng cụ thể và thông báo chung.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        user_id (int): ID của người dùng.

    Returns:
        List[models.Notification]: Danh sách thông báo.
    """
    return db.query(models.Notification).filter(
        or_(
            models.Notification.user_id == user_id,
            models.Notification.type == "all"       
        )
    ).order_by(models.Notification.created_at.desc()).all()