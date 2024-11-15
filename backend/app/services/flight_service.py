from sqlalchemy.orm import Session
from .. import models, schemas

def create_flight(db: Session, flight: schemas.FlightCreate):
    db_flight = models.Flight(**flight.dict())
    db.add(db_flight)
    db.commit()
    db.refresh(db_flight)
    return db_flight

def get_flight(db: Session, flight_id: int):
    return db.query(models.Flight).filter(models.Flight.id == flight_id).first()

def get_flights(db: Session):
    return db.query(models.Flight).all()