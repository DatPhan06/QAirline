from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas

def create_airport(db: Session, airport: schemas.AirportCreate) -> models.Airport:
    db_airport = models.Airport(**airport.dict())
    db.add(db_airport)
    db.commit()
    db.refresh(db_airport)
    return db_airport

def get_airport(db: Session, airport_id: int) -> models.Airport:
    return db.query(models.Airport).filter(models.Airport.airport_id == airport_id).first()

def get_airports(db: Session) -> List[models.Airport]:
    return db.query(models.Airport).all()
