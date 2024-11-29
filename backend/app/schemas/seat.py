# backend/app/schemas/seat.py

from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class SeatBase(BaseModel):
    """
    Lớp cơ sở cho thông tin ghế.

    Đây là lớp cơ sở chứa các trường thông tin chung cho một ghế bao gồm:
    - ID máy bay
    - Số ghế
    - Loại ghế
    - Trạng thái ghế (mặc định là 'available')
    """
    airplane_id: int  # ID của máy bay mà ghế này thuộc về
    seat_number: str  # Số hiệu ghế
    seat_class: str  # Loại ghế (ví dụ: hạng phổ thông, hạng thương gia)
    status: Optional[str] = "available"  # Trạng thái của ghế, mặc định là 'available'

class SeatCreate(SeatBase):
    """
    Lớp xác định thông tin khi tạo một ghế mới.

    Lớp này kế thừa từ `SeatBase` và sử dụng để tạo ghế mới trong cơ sở dữ liệu.
    Không cần phải thêm trường nào mới vì tất cả các trường cần thiết đã có trong `SeatBase`.
    """
    pass

class SeatUpdate(BaseModel):
    """
    Lớp xác định thông tin cập nhật cho một ghế.

    Lớp này dùng để xác định các trường có thể được cập nhật khi sửa đổi thông tin ghế.
    Tất cả các trường là tùy chọn, vì chỉ các trường cần thiết sẽ được cập nhật.

    Các trường bao gồm:
    - airplane_id: ID máy bay (tùy chọn)
    - seat_number: Số ghế (tùy chọn)
    - seat_class: Loại ghế (tùy chọn)
    - status: Trạng thái ghế (tùy chọn)
    """
    airplane_id: Optional[int] = None  # ID máy bay, có thể được cập nhật
    seat_number: Optional[str] = None  # Số ghế, có thể được cập nhật
    seat_class: Optional[str] = None  # Loại ghế, có thể được cập nhật
    status: Optional[str] = None  # Trạng thái ghế, có thể được cập nhật

class Seat(SeatBase):
    """
    Lớp đại diện cho thông tin ghế đầy đủ, bao gồm ID và thời gian tạo/cập nhật.

    Lớp này kế thừa từ `SeatBase` và bổ sung thêm các trường:
    - seat_id: ID của ghế trong cơ sở dữ liệu
    - created_at: Thời gian tạo ghế
    - updated_at: Thời gian cập nhật ghế lần cuối
    """
    seat_id: int  # ID duy nhất của ghế trong cơ sở dữ liệu
    created_at: datetime  # Thời gian tạo ghế
    updated_at: datetime  # Thời gian cập nhật ghế lần cuối

    class Config:
        """
        Cấu hình của Pydantic cho phép tương tác với ORM (SQLAlchemy).

        Thiết lập `orm_mode = True` để Pydantic có thể chuyển đổi dữ liệu từ đối tượng 
        ORM (SQLAlchemy) thành dữ liệu JSON một cách chính xác.
        """
        orm_mode = True
