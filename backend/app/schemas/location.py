from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class LocationBase(BaseModel):
    """
    Schema cơ sở cho thông tin địa điểm.

    Attributes:
        city (str): Tên thành phố.
        country (str): Tên quốc gia.
        screen (str): Thông tin màn hình.
        food (str): Món ăn đặc trưng.
        activity (str): Hoạt động nổi bật.
        experience (str): Trải nghiệm đáng nhớ.
        airport_id (int): ID của sân bay liên kết.
    """
    city: str
    country: str
    screen: str
    food: str
    activity: str
    experience: str
    airport_id: int

class LocationCreate(LocationBase):
    """
    Schema dùng để tạo mới địa điểm.
    Kế thừa từ LocationBase.
    """
    pass

class LocationUpdate(LocationBase):
    """
    Schema dùng để cập nhật thông tin địa điểm.
    
    Attributes:
        city (Optional[str]): Tên thành phố mới.
        country (Optional[str]): Tên quốc gia mới.
        screen (Optional[str]): Thông tin màn hình mới.
        food (Optional[str]): Món ăn đặc trưng mới.
        activity (Optional[str]): Hoạt động nổi bật mới.
        experience (Optional[str]): Trải nghiệm đáng nhớ mới.
        airport_id (Optional[int]): ID của sân bay liên kết mới.
    """
    city: Optional[str] = None
    country: Optional[str] = None
    screen: Optional[str] = None
    food: Optional[str] = None
    activity: Optional[str] = None
    experience: Optional[str] = None
    airport_id: Optional[int] = None

class Location(LocationBase):
    """
    Schema đại diện cho địa điểm trong cơ sở dữ liệu.
    Kế thừa từ LocationBase và bổ sung các trường tự động.

    Attributes:
        location_id (int): ID của địa điểm.
        created_at (datetime): Thời gian tạo.
        updated_at (datetime): Thời gian cập nhật.
    """
    location_id: int

    class Config:
        orm_mode = True