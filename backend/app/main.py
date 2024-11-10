from fastapi import FastAPI
from .routers import flights, bookings
from .database import engine, Base

app = FastAPI(title="Flight Booking System")

# Include routers
app.include_router(flights.router)
app.include_router(bookings.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Flight Booking System API"}

# Create database tables
Base.metadata.create_all(bind=engine)