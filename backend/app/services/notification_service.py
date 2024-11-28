from sqlalchemy.orm import Session
from typing import List, Optional
from .. import models, schemas


def create_notification(db: Session, notification: schemas.NotificationCreate) -> models.Notification:
    """
    Tạo thông báo mới.
    """
    db_notification = models.Notification(**notification.dict())
    db.add(db_notification)
    db.commit()
    db.refresh(db_notification)
    return db_notification


def get_notification(db: Session, notification_id: int) -> Optional[models.Notification]:
    """
    Lấy thông tin thông báo theo ID.
    """
    return db.query(models.Notification).filter(models.Notification.notification_id == notification_id).first()


def get_notifications(db: Session) -> List[models.Notification]:
    """
    Lấy danh sách tất cả thông báo.
    """
    return db.query(models.Notification).all()


def update_notification(db: Session, notification_id: int, notification_update: schemas.NotificationCreate) -> Optional[models.Notification]:
    """
    Cập nhật thông báo.
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
    """
    db_notification = get_notification(db, notification_id)
    if not db_notification:
        return False

    db.delete(db_notification)
    db.commit()
    return True
