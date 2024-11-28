from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class PromotionBase(BaseModel):
    title: str
    description: str
    discount_percentage: float = Field(..., ge=0, le=100, description="Giảm giá nằm trong khoảng từ 0 đến 100%")
    start_date: datetime
    end_date: datetime

    class Config:
        orm_mode = True


class PromotionCreate(PromotionBase):
    pass


class Promotion(PromotionBase):
    promotion_id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        orm_mode = True
