from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, database, services

router = APIRouter(
    prefix="/flights",
    tags=["flights"],
)

@router.post("/", response_model=schemas.Flight)
def create_flight(flight: schemas.FlightCreate, db: Session = Depends(database.get_db)):
    return services.flight_service.create_flight(db, flight)

@router.get("/{flight_id}", response_model=schemas.Flight)
def read_flight(flight_id: int, db: Session = Depends(database.get_db)):
    db_flight = services.flight_service.get_flight(db, flight_id)
    if db_flight is None:
        raise HTTPException(status_code=404, detail="Flight not found")
    return db_flight

@router.get("/", response_model=List[schemas.Flight])
def read_flights(db: Session = Depends(database.get_db)):
    return services.flight_service.get_flights(db)