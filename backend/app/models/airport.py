from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from sqlalchemy.orm import relationship
from ..base import Base

class Airport(Base):
    """
    Model đại diện cho bảng 'airports' trong cơ sở dữ liệu.
    Attributes:
        airport_id (int): ID của sân bay, khóa chính.
        name (str): Tên sân bay, không được để trống.
        city (str): Thành phố, không được để trống.
        country (str): Quốc gia, không được để trống.
        iata_code (str): Mã IATA của sân bay, duy nhất và không được để trống.
        icao_code (str): Mã ICAO của sân bay, duy nhất và không được để trống.
        created_at (datetime): Thời gian tạo bản ghi, mặc định là thời gian hiện tại.
        updated_at (datetime): Thời gian cập nhật bản ghi, mặc định là thời gian hiện tại và tự động cập nhật khi có thay đổi.
    Relationships:
        departure_flights (relationship): Liên kết tới các chuyến bay khởi hành từ sân bay.
        arrival_flights (relationship): Liên kết tới các chuyến bay đến sân bay.
    """
    __tablename__ = "airports"

    airport_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    city = Column(String(100), nullable=False)
    country = Column(String(100), nullable=False)
    iata_code = Column(String(3), unique=True, nullable=False)
    icao_code = Column(String(4), unique=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Quan hệ
    departure_flights = relationship("Flight", foreign_keys="[Flight.departure_airport_id]", back_populates="departure_airport")
    arrival_flights = relationship("Flight", foreign_keys="[Flight.arrival_airport_id]", back_populates="arrival_airport")   