from sqlalchemy import Column, Integer, ForeignKey, Text, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.base import Base

class FlightLog(Base):
    """
    FlightLog là một lớp đại diện cho bảng 'flight_logs' trong cơ sở dữ liệu.
    Thuộc tính:
        log_id (int): ID của log, là khóa chính.
        flight_id (int): ID của chuyến bay, là khóa ngoại tham chiếu đến bảng 'flights'.
        log_message (str): Thông điệp log, không được để trống.
        created_at (datetime): Thời gian tạo log, mặc định là thời gian hiện tại theo múi giờ UTC.
    Quan hệ:
        flight (Flight): Quan hệ nhiều-một với lớp Flight, mỗi log thuộc về một chuyến bay.
    """
    __tablename__ = "flight_logs"

    log_id = Column(Integer, primary_key=True, index=True)
    flight_id = Column(Integer, ForeignKey("flights.flight_id"), nullable=False)
    log_message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.now(timezone.utc))

    # Relationships
    flight = relationship("Flight", back_populates="logs")  # Log belongs to a flight