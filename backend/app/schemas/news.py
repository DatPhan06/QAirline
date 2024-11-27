from pydantic import BaseModel
from datetime import datetime


class NewsBase(BaseModel):
    """
        Schema cơ sở cho mô hình 'News' trong cơ sở dữ liệu.
        Attributes:
            title (str): Tiêu đề của bài viết
            content (str): Nội dung chi tiết của bài viết
            author_id (int): ID của tác giả bài viết
    """
    title: str
    content: str
    author_id: int

class NewsCreate(NewsBase):
    """
        Schema dùng để tạo mới một bài viết.
        Kế thừa từ NewsBase
    """
    pass

class News(NewsBase):
    """
        Schema đại diện cho bài viết trong cơ sở dữ liệu với ID và thông tin thời gian.
        Kế thừa từ NewsBase và bổ sung thêm các thuộc tính: news_id, created_at, updated_at.
        Attributes:
            news_id (int): ID của bài viết, khóa chính.
            created_at (datetime): Thời gian tạo bản ghi, không thay đổi sau khi tạo.
            updated_at (datetime): Thời gian cập nhật bản ghi, tự động cập nhật khi có thay đổi.
        Config:
            orm_mode (bool): Cho phép chuyển đổi từ ORM model sang Pydantic model.
    """
    news_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

