from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.location import Location
from app.schemas.location import LocationSchema

router = APIRouter()

@router.get("/locations/", response_model=List[LocationSchema])
def get_locations(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(Location).offset(skip).limit(limit).all()