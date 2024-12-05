from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.base import Base

class Airplane(Base):
    """
    Mô hình máy bay.
    Thuộc tính:
        airplane_id (int): ID của máy bay.
        model (str): Mô hình của máy bay.
        manufacturer (str): Nhà sản xuất của máy bay.
        seat_capacity (int): Tổng số ghế.
        range_km (int, optional): Tầm bay tính bằng km.
        year_of_manufacture (int, optional): Năm sản xuất.
        maintenance_status (str, optional): Trạng thái bảo trì (ví dụ: 'up-to-date').
        status (str, optional): Trạng thái hiện tại (ví dụ: 'active').
        created_at (datetime): Thời gian tạo bản ghi.
        updated_at (datetime): Thời gian cập nhật bản ghi.
    Quan hệ:
        seats (relationship): Máy bay có nhiều ghế.
        flights (relationship): Máy bay phục vụ nhiều chuyến bay.
    """
    __tablename__ = "airplanes"

    airplane_id = Column(Integer, primary_key=True, index=True)
    model = Column(String(100), nullable=False)  # Model of the airplane
    manufacturer = Column(String(100), nullable=False)  # Manufacturer of the airplane
    seat_capacity = Column(Integer, nullable=False)  # Total seat capacity
    range_km = Column(Integer, nullable=True)  # Range in kilometers
    year_of_manufacture = Column(Integer, nullable=True)  # Manufacturing year
    maintenance_status = Column(String(50), nullable=True)  # Maintenance status (e.g., 'up-to-date')
    status = Column(String(50), nullable=True)  # Current status (e.g., 'active')
    created_at = Column(DateTime, default=datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))

    # Relationships
    seats = relationship("Seat", back_populates="airplane")  # Airplane has many seats
    flights = relationship("Flight",foreign_keys="[Flight.airplane_id]", back_populates="airplane")  # Airplane serves many flights
