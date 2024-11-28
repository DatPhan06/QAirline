from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class NotificationBase(BaseModel):
    title: str
    content: str
    type: Optional[str] = "general"
    user_id: Optional[int]
    flight_id: Optional[int]

    class Config:
        orm_mode = True


class NotificationCreate(NotificationBase):
    pass


class Notification(NotificationBase):
    notification_id: int
    created_at: datetime
    updated_at: datetime
