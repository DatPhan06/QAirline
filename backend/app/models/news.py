from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.base import Base

class News(Base):
    """
    Mô hình News đại diện cho bảng 'news' trong cơ sở dữ liệu.
    Thuộc tính:
        news_id (int): Khóa chính, tự động tăng.
        title (str): Tiêu đề của tin tức, không được để trống, tối đa 100 ký tự.
        content (str): Nội dung của tin tức, không được để trống.
        published_date (datetime): Ngày xuất bản của tin tức, không được để trống.
        author_id (int): Khóa ngoại tham chiếu đến 'admins.admin_id', không được để trống.
        created_at (datetime): Ngày tạo bản ghi, mặc định là thời gian hiện tại theo múi giờ UTC.
        updated_at (datetime): Ngày cập nhật bản ghi, mặc định là thời gian hiện tại theo múi giờ UTC, tự động cập nhật khi có thay đổi.
    """
    __tablename__ = "news"

    news_id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    content = Column(Text, nullable=False)
    published_date = Column(DateTime, nullable=False)
    author_id = Column(Integer, ForeignKey("admins.admin_id"), nullable=False)
    created_at = Column(DateTime, default=datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))
    
    # Relationships
    author = relationship("Admin", back_populates="news")