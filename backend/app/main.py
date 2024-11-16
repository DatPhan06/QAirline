from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import flights_router, bookings_router, users_router
from .database import engine, Base
import os
from dotenv import load_dotenv

# Load biến môi trường từ file .env
load_dotenv()

app = FastAPI(title="Flight Booking System")

# Cấu hình CORS
origins = [
    os.getenv("FRONTEND_URL"),  # Địa chỉ của frontend ReactJS
    # Thêm các địa chỉ khác nếu cần
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(flights_router)
app.include_router(bookings_router)
app.include_router(users_router)

# Tạo các bảng trong cơ sở dữ liệu
Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"message": "Welcome to Flight Booking System API"}