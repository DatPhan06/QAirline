from pydantic import BaseModel
from datetime import datetime


class NewsBase(BaseModel):
    title: str
    content: str
    author_id: int


class NewsCreate(NewsBase):
    pass

class News(NewsBase):
    news_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
