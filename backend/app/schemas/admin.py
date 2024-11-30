from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class AdminBase(BaseModel):
    username: str = Field(..., max_length=50)
    role: str = Field(..., max_length=50)
    permissions: Optional[str] = Field(None, max_length=50)


class AdminCreate(AdminBase):
    password: str  


class AdminUpdate(BaseModel):
    username: Optional[str] = Field(None, max_length=50)
    role: Optional[str] = Field(None, max_length=50)
    permissions: Optional[str] = Field(None, max_length=50)
    password: Optional[str] 


class Admin(AdminBase):
    admin_id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        orm_mode = True
