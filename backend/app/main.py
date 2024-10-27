from fastapi import FastAPI

app = FastAPI(title="Flight Booking System")

@app.get("/")
def read_root():
    return {"message": "Welcome to Flight Booking System API"}
