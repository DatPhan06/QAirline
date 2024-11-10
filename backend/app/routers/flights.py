from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas, database

router = APIRouter(
    prefix="/flights",
    tags=["flights"],
)

@router.post("/", response_model=schemas.Flight)
def create_flight(flight: schemas.FlightCreate, db: Session = Depends(database.get_db)):
    db_flight = models.Flight(**flight.dict())
    db.add(db_flight)
    db.commit()
    db.refresh(db_flight)
    return db_flight

@router.get("/{flight_id}", response_model=schemas.Flight)
def read_flight(flight_id: int, db: Session = Depends(database.get_db)):
    db_flight = db.query(models.Flight).filter(models.Flight.id == flight_id).first()
    if db_flight is None:
        raise HTTPException(status_code=404, detail="Flight not found")
    return db_flight