from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class NotificationBase(BaseModel):
    """
    Schema cơ sở cho mô hình 'Notification' trong cơ sở dữ liệu.
    Attributes:
        title (str): Tiêu đề của thông báo, không được để trống.
        content (str): Nội dung chi tiết của thông báo, không được để trống.
        type (Optional[str]): Loại thông báo, mặc định là "general".
        user_id (Optional[int]): ID của người dùng liên quan đến thông báo (nếu có).
        flight_id (Optional[int]): ID của chuyến bay liên quan đến thông báo (nếu có).
    Config:
        orm_mode (bool): Cho phép chuyển đổi từ ORM model sang Pydantic model.
    """
    title: str
    content: str
    type: Optional[str] = "general"
    user_id: Optional[int]
    flight_id: Optional[int]

    class Config:
        orm_mode = True


class NotificationCreate(NotificationBase):
    """
    Schema dùng để tạo thông báo mới.
    Kế thừa từ NotificationBase.
    """
    pass


class Notification(NotificationBase):
    """
    Schema đại diện cho thông báo trong cơ sở dữ liệu với ID và thông tin thời gian.
    Kế thừa từ NotificationBase và bổ sung thêm các thuộc tính: notification_id, created_at, updated_at.
    Attributes:
        notification_id (int): ID của thông báo, khóa chính.
        created_at (datetime): Thời gian tạo thông báo, không thay đổi sau khi tạo.
        updated_at (datetime): Thời gian cập nhật thông báo, tự động cập nhật khi có thay đổi.
    """
    notification_id: int
    created_at: datetime
    updated_at: datetime
