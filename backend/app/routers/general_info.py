# backend/app/routers/general_info.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from ..schemas.general_info import GeneralInfo
from ..services.general_info_service import get_general_info
from ..database import get_db

router = APIRouter()

@router.get("/general-info", response_model=List[GeneralInfo])
def read_general_info(db: Session = Depends(get_db)):
    return get_general_info(db)