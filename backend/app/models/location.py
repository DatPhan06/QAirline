from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.base import Base

class Location(Base):
    """
    Model đại diện cho bảng 'locations' trong cơ sở dữ liệu.

    Attributes:
        location_id (int): ID của địa điểm, tự động tăng, duy nhất.
        city (str): Thành phố, khóa chính.
        country (str): Quốc gia.
        screen (str): Thông tin màn hình.
        food (str): Món ăn đặc trưng.
        activity (str): Hoạt động nổi bật.
        experience (str): Trải nghiệm đáng nhớ.
        airport_id (int): ID của sân bay liên kết.
    Relationships:
        airport (relationship): Liên kết tới sân bay thuộc thành phố này.
    """

    __tablename__ = "locations"

    location_id = Column(Integer, autoincrement=True, unique=True)
    city = Column(String(100), primary_key=True)
    country = Column(String(100))
    screen = Column(String(255))
    food = Column(String(255))
    activity = Column(String(255))
    experience = Column(String(255))

    airport_id = Column(Integer, ForeignKey("airports.airport_id"))
    airport = relationship("Airport", back_populates="locations")