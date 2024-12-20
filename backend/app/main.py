from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import *
from .base import Base
from .database import engine
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
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Bao gồm các router
app.include_router(flights_router)
app.include_router(bookings_router)
app.include_router(users_router)
app.include_router(login_auth_router)
app.include_router(general_info_router)
app.include_router(airports_router)
app.include_router(seats_router)
app.include_router(news_router)
app.include_router(notification_router)
app.include_router(promotion_router)
app.include_router(tickets_router)
app.include_router(flight_log_router)
app.include_router(admin_router)
app.include_router(airplane_router)
app.include_router(location_router) 
app.include_router(chat_router)

# Tạo các bảng trong cơ sở dữ liệu
Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root() -> dict:
    """
    Hàm xử lý yêu cầu GET tại endpoint gốc.

    Trả về:
        dict: Thông điệp chào mừng.
    """
    return {"message": "Welcome to Flight Booking System API"}