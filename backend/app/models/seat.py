from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.base import Base

class Seat(Base):
    """
    Mô tả lớp Seat.
    Thuộc tính:
        seat_id (int): ID của ghế, khóa chính.
        airplane_id (int): ID của máy bay, khóa ngoại tham chiếu đến bảng airplanes.
        seat_number (str): Số ghế.
        seat_class (str): Hạng ghế.
        status (str): Trạng thái của ghế, mặc định là "available".
        created_at (datetime): Thời gian tạo ghế, mặc định là thời gian hiện tại theo múi giờ UTC.
        updated_at (datetime): Thời gian cập nhật ghế, mặc định là thời gian hiện tại theo múi giờ UTC, cập nhật khi có thay đổi.
    Quan hệ:
        airplane (Airplane): Ghế thuộc về một máy bay.
        tickets (List[Ticket]): Ghế có thể có nhiều vé.
        booked_tickets (List[BookedTicket]): Ghế có thể có nhiều vé đã đặt.
    """
    __tablename__ = "seats"

    seat_id = Column(Integer, primary_key=True, index=True)
    airplane_id = Column(Integer, ForeignKey("airplanes.airplane_id"), nullable=False)
    seat_number = Column(String(10), nullable=False)
    seat_class = Column(String(50), nullable=False)
    status = Column(String(50), nullable=False, default="available")
    created_at = Column(DateTime, default=datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))

    # # Relationships
    airplane = relationship("Airplane", back_populates="seats")  # Seat belongs to an airplane
    tickets = relationship("Ticket", back_populates="seat")  # Seat can have many tickets
    booked_tickets = relationship("BookedTicket", back_populates="seat")
