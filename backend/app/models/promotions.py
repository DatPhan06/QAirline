from sqlalchemy import Column, Integer, String, Text, DateTime, Float
from datetime import datetime, timezone
from app.base import Base

class Promotion(Base):
    """
    Lớp Promotion đại diện cho bảng 'promotions' trong cơ sở dữ liệu.
    Attributes:
        promotion_id (int): ID của khuyến mãi, là khóa chính.
        title (str): Tiêu đề của khuyến mãi, không được để trống.
        description (str): Mô tả chi tiết của khuyến mãi, không được để trống.
        discount_percentage (float): Phần trăm giảm giá của khuyến mãi, không được để trống.
        start_date (datetime): Ngày bắt đầu của khuyến mãi, không được để trống.
        end_date (datetime): Ngày kết thúc của khuyến mãi, không được để trống.
        created_at (datetime): Ngày tạo bản ghi, mặc định là thời gian hiện tại theo múi giờ UTC.
        updated_at (datetime): Ngày cập nhật bản ghi, mặc định là thời gian hiện tại theo múi giờ UTC và tự động cập nhật khi có thay đổi.
    """
    __tablename__ = "promotions"

    promotion_id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    discount_percentage = Column(Float, nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))
