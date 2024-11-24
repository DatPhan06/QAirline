from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime, timezone
from app.base import Base

class GeneralInfo(Base):
    __tablename__ = "general_info"

    info_id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))
