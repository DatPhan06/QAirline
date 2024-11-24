from sqlalchemy import Column, Integer, String, Text, DateTime, Float
from datetime import datetime, timezone
from app.base import Base

class Promotion(Base):
    __tablename__ = "promotions"

    promotion_id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    discount_percentage = Column(Float, nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))
