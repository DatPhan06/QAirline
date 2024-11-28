from sqlalchemy.orm import Session
from typing import List, Optional
from .. import models, schemas


def create_promotion(db: Session, promotion: schemas.PromotionCreate) -> models.Promotion:
    """
    Tạo khuyến mãi mới.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        promotion (schemas.PromotionCreate): Thông tin khuyến mãi cần tạo.

    Returns:
        models.Promotion: Đối tượng khuyến mãi vừa được tạo.
    """
    db_promotion = models.Promotion(**promotion.dict())
    db.add(db_promotion)
    db.commit()
    db.refresh(db_promotion)
    return db_promotion


def get_promotion(db: Session, promotion_id: int) -> Optional[models.Promotion]:
    """
    Lấy thông tin khuyến mãi theo ID.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        promotion_id (int): ID của khuyến mãi cần lấy thông tin.

    Returns:
        Optional[models.Promotion]: Đối tượng khuyến mãi nếu tìm thấy, ngược lại là None.
    """
    return db.query(models.Promotion).filter(models.Promotion.promotion_id == promotion_id).first()


def get_promotions(db: Session) -> List[models.Promotion]:
    """
    Lấy danh sách tất cả khuyến mãi.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        List[models.Promotion]: Danh sách các khuyến mãi.
    """
    return db.query(models.Promotion).all()


def update_promotion(db: Session, promotion_id: int, promotion_update: schemas.PromotionCreate) -> Optional[models.Promotion]:
    """
    Cập nhật thông tin khuyến mãi.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        promotion_id (int): ID của khuyến mãi cần cập nhật.
        promotion_update (schemas.PromotionCreate): Dữ liệu khuyến mãi mới để cập nhật.

    Returns:
        Optional[models.Promotion]: Đối tượng khuyến mãi đã được cập nhật nếu tìm thấy, ngược lại là None.
    """
    db_promotion = get_promotion(db, promotion_id)
    if not db_promotion:
        return None

    update_data = promotion_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_promotion, key, value)

    db.commit()
    db.refresh(db_promotion)
    return db_promotion


def delete_promotion(db: Session, promotion_id: int) -> bool:
    """
    Xóa khuyến mãi theo ID.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        promotion_id (int): ID của khuyến mãi cần xóa.

    Returns:
        bool: True nếu xóa thành công, False nếu khuyến mãi không tồn tại.
    """
    db_promotion = get_promotion(db, promotion_id)
    if not db_promotion:
        return False

    db.delete(db_promotion)
    db.commit()
    return True
