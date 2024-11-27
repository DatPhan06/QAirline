from pydantic import BaseModel
from datetime import datetime

class GeneralInfoBase(BaseModel):
    title: str
    content: str

class GeneralInfoCreate(GeneralInfoBase):
    pass

class GeneralInfoUpdate(GeneralInfoBase):
    pass

class GeneralInfo(GeneralInfoBase):
    info_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
