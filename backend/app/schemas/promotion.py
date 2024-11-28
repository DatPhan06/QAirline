from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class PromotionBase(BaseModel):
    """
        Schema cơ sở cho mô hình 'Promotion' trong cơ sở dữ liệu.
        Attributes:
            title (str): Tiêu đề của khuyến mãi, không được để trống.
            description (str): Mô tả chi tiết của khuyến mãi, không được để trống.
            discount_percentage (float): Phần trăm giảm giá, nằm trong khoảng từ 0 đến 100.
            start_date (datetime): Ngày bắt đầu khuyến mãi.
            end_date (datetime): Ngày kết thúc khuyến mãi.
    """
    title: str
    description: str
    discount_percentage: float = Field(..., ge=0, le=100, description="Giảm giá nằm trong khoảng từ 0 đến 100%")
    start_date: datetime
    end_date: datetime


class PromotionCreate(PromotionBase):       
    """
        Schema dùng để tạo khuyến mãi mới.
        Kế thừa từ PromotionBase, không bổ sung thuộc tính mới.
    """
    pass


class Promotion(PromotionBase):
    """
    Schema đại diện cho khuyến mãi trong cơ sở dữ liệu với ID và thông tin thời gian.
    Kế thừa từ PromotionBase và bổ sung thêm các thuộc tính: promotion_id, created_at, updated_at.
    Attributes:
        promotion_id (int): ID của khuyến mãi, khóa chính.
        created_at (datetime): Thời gian tạo khuyến mãi, không thay đổi sau khi tạo.
        updated_at (datetime): Thời gian cập nhật khuyến mãi, tự động cập nhật khi có thay đổi.
    """
    promotion_id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        orm_mode = True
