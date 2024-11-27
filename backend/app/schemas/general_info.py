from pydantic import BaseModel
from datetime import datetime

class GeneralInfoBase(BaseModel):
    """
    Schema cơ sở cho mô hình 'GeneralInfo' trong cơ sở dữ liệu.
    Attributes:
        title (str): Tiêu đề của thông tin chung, không được để trống.
        content (str): Nội dung chi tiết của thông tin chung, không được để trống.
    """
    title: str
    content: str

class GeneralInfoCreate(GeneralInfoBase):
    """
        Schema dùng để tạo mới thông tin chung.
        Kế thừa từ GeneralInfoBase, không có thuộc tính mới.
    """
    pass

class GeneralInfoUpdate(GeneralInfoBase):
    """
        Schema dùng để cập nhật thông tin chung.
        Kế thừa từ GeneralInfoBase, không có thuộc tính mới.
    """
    pass

class GeneralInfo(GeneralInfoBase):
    """
        Schema đại diện cho thông tin chung trong cơ sở dữ liệu với ID và thông tin thời gian.
        Kế thừa từ GeneralInfoBase và bổ sung thêm các thuộc tính: info_id, created_at, updated_at.
        Attributes:
            info_id (int): ID của thông tin chung, khóa chính.
            created_at (datetime): Thời gian tạo bản ghi, không thay đổi sau khi tạo.
            updated_at (datetime): Thời gian cập nhật bản ghi, tự động cập nhật khi có thay đổi.
        Config:
            orm_mode (bool): Cho phép chuyển đổi từ ORM model sang Pydantic model.
    """
    info_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

