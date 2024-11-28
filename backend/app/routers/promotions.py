from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import database, schemas, services

router = APIRouter(
    prefix="/promotions",
    tags=["promotions"],
)

@router.post("/", response_model=schemas.Promotion)
def create_promotion(
    promotion: schemas.PromotionCreate, db: Session = Depends(database.get_db)
):
    """
    Tạo khuyến mãi mới.

    Args:
        promotion (schemas.PromotionCreate): Thông tin khuyến mãi cần tạo.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        schemas.Promotion: Đối tượng khuyến mãi vừa được tạo.
    """
    return services.promotion_service.create_promotion(db, promotion)


@router.get("/{promotion_id}", response_model=schemas.Promotion)
def read_promotion(
    promotion_id: int, db: Session = Depends(database.get_db)
):
    """
    Lấy thông tin khuyến mãi theo ID.

    Args:
        promotion_id (int): ID của khuyến mãi cần lấy.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        schemas.Promotion: Đối tượng khuyến mãi nếu tìm thấy.
    
    Raises:
        HTTPException: Nếu khuyến mãi không được tìm thấy (404).
    """
    promotion = services.promotion_service.get_promotion(db, promotion_id)
    if not promotion:
        raise HTTPException(status_code=404, detail="Promotion not found")
    return promotion


@router.get("/", response_model=List[schemas.Promotion])
def read_promotions(db: Session = Depends(database.get_db)):
    """
    Lấy danh sách tất cả khuyến mãi.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        List[schemas.Promotion]: Danh sách các khuyến mãi.
    """
    return services.promotion_service.get_promotions(db)


@router.put("/{promotion_id}", response_model=schemas.Promotion)
def update_promotion(
    promotion_id: int,
    promotion_update: schemas.PromotionCreate,
    db: Session = Depends(database.get_db),
):
    """
    Cập nhật thông tin khuyến mãi theo ID.

    Args:
        promotion_id (int): ID của khuyến mãi cần cập nhật.
        promotion_update (schemas.PromotionCreate): Dữ liệu khuyến mãi mới để cập nhật.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        schemas.Promotion: Khuyến mãi đã được cập nhật nếu tìm thấy.
    
    Raises:
        HTTPException: Nếu khuyến mãi không được tìm thấy (404).
    """
    updated_promotion = services.promotion_service.update_promotion(
        db, promotion_id, promotion_update
    )
    if not updated_promotion:
        raise HTTPException(status_code=404, detail="Promotion not found")
    return updated_promotion


@router.delete("/{promotion_id}")
def delete_promotion(
    promotion_id: int, db: Session = Depends(database.get_db)
):
    """
    Xóa khuyến mãi theo ID.

    Args:
        promotion_id (int): ID của khuyến mãi cần xóa.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        dict: Thông báo xác nhận việc xóa thành công.
    
    Raises:
        HTTPException: Nếu khuyến mãi không được tìm thấy (404).
    """
    success = services.promotion_service.delete_promotion(db, promotion_id)
    if not success:
        raise HTTPException(status_code=404, detail="Promotion not found")
    return {"message": success}
