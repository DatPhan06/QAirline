# QAIRLINE Project Structure (FastAPI & ReactJS)

## Project Root:

```bash
├── backend/                        # Backend FastAPI
│   ├── app/
│   │   ├── main.py                 # Điểm bắt đầu của ứng dụng chính
│   │   ├── models/
│   │   │   ├── flight.py           # Các model liên quan đến chuyến bay
│   │   │   ├── booking.py          # Các model liên quan đến đặt vé
│   │   ├── schemas/
│   │   │   ├── flight.py           # Các model Pydantic để kiểm tra dữ liệu
│   │   │   ├── booking.py          # Các model Pydantic cho request/response
│   │   ├── routers/
│   │   │   ├── flights.py          # Các API endpoint cho chuyến bay
│   │   │   ├── bookings.py         # Các API endpoint cho đặt vé
│   │   ├── services/
│   │   │   ├── flight_service.py   # Logic nghiệp vụ cho chuyến bay
│   │   │   ├── booking_service.py  # Logic nghiệp vụ cho đặt vé
│   │   ├── db.py                   # Thiết lập và kết nối cơ sở dữ liệu
│   │   ├── config.py               # Cấu hình ứng dụng
│   │   └── templates/              # Thư mục chứa các mẫu thiết kế (design patterns) cho ứng dụng
│   ├── tests/                      # Thư mục chứa các unit test
│   │   ├── test_flights.py         # Unit test cho module chuyến bay
│   │   ├── test_bookings.py        # Unit test cho module đặt vé
│   ├── requirements.txt            # Các phụ thuộc cho backend
│   ├── Dockerfile                  # Dockerfile để xây dựng image cho backend
│   ├── .env
│   └── alembic.ini
│
├── frontend/                       # Frontend ReactJS
│   ├── public/                     # Tài nguyên tĩnh như index.html, icons, v.v.
│   ├── src/
│   │   ├── components/
│   │   │   ├── FlightList.js       # Component hiển thị danh sách chuyến bay
│   │   │   ├── BookingForm.js      # Component để đặt vé
│   │   │   └── BookingDetails.js   # Component để xem chi tiết đặt vé
│   │   ├── pages/
│   │   │   ├── Home.js             # Trang chủ của ứng dụng
│   │   │   ├── Flights.js          # Trang liên quan đến chuyến bay
│   │   │   └── Bookings.js         # Trang liên quan đến đặt vé
│   │   ├── services/
│   │   │   └── api.js              # Các hàm tương tác với API
│   │   ├── App.js                  # Component chính của React
│   │   └── index.js                # Điểm bắt đầu cho ứng dụng React
│   ├── package.json                # Các phụ thuộc cho frontend
│   ├── Dockerfile                  # Dockerfile để xây dựng image cho frontend
│   └── .env
│
├── docker-compose.yml              # Docker Compose để chạy các dịch vụ
└── .env                            # Các biến môi trường cho dự án

```

## Descriptions:

1. **backend/app/**

   - Thư mục này chứa tất cả các file ứng dụng FastAPI.
   - **routers/** chứa các API route cho chuyến bay và đặt vé.
   - **services/** bao gồm logic nghiệp vụ hoạt động trên các model.
   - **templates/** chứa các mẫu thiết kế để tái sử dụng trong toàn ứng dụng.

2. **frontend/src/**

   - **components/** chứa các thành phần UI có thể tái sử dụng.
   - **services/api.js** xử lý tất cả các yêu cầu tới backend bằng fetch hoặc axios.

3. **docker-compose.yml**

   - Dùng để khởi chạy cả backend (FastAPI) và frontend (ReactJS) bằng Docker containers.

4. **backend/Dockerfile (trong thư mục backend)**

   - Dockerfile được sử dụng để xây dựng image cho backend.

5. **frontend/Dockerfile (trong thư mục frontend)**
   - Dockerfile được sử dụng để xây dựng image cho frontend.

uvicorn app.main:app --reload
npm start
