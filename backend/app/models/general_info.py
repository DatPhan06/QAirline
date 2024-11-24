from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime, timezone
from app.base import Base

class GeneralInfo(Base):
    """
    Mô hình GeneralInfo đại diện cho bảng 'general_info' trong cơ sở dữ liệu.
    Attributes:
        info_id (int): Khóa chính, tự động tăng.
        title (str): Tiêu đề của thông tin, không được để trống, tối đa 100 ký tự.
        content (str): Nội dung của thông tin, không được để trống.
        created_at (datetime): Thời gian tạo bản ghi, mặc định là thời gian hiện tại theo múi giờ UTC.
        updated_at (datetime): Thời gian cập nhật bản ghi, mặc định là thời gian hiện tại theo múi giờ UTC, tự động cập nhật khi có thay đổi.
    """
    __tablename__ = "general_info"

    info_id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))
