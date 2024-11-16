# QAIRLINE Project Structure (FastAPI & ReactJS)

## Project Overview

QAIRLINE là một hệ thống đặt vé máy bay được xây dựng bằng FastAPI cho backend và ReactJS cho frontend. Dự án này bao gồm các tính năng như quản lý vé, thông tin chuyến bay, và các dịch vụ bổ trợ.

## Project Structure

```bash
├── backend/                        # Backend FastAPI
│   ├── app/
│   │   ├── main.py                 # Điểm bắt đầu của ứng dụng chính
│   │   ├── models/
│   │   │   ├── flight.py           # Các model liên quan đến chuyến bay
│   │   │   ├── booking.py          # Các model liên quan đến đặt vé
│   │   │   ├── user.py             # Các model liên quan đến người dùng
│   │   ├── schemas/
│   │   │   ├── flight.py           # Các schema Pydantic để kiểm tra dữ liệu
│   │   │   ├── booking.py          # Các schema Pydantic cho request/response
│   │   │   ├── user.py             # Các schema Pydantic cho người dùng
│   │   ├── routers/
│   │   │   ├── flights.py          # Các API endpoint cho chuyến bay
│   │   │   ├── bookings.py         # Các API endpoint cho đặt vé
│   │   │   ├── users.py            # Các API endpoint cho người dùng
│   │   ├── services/
│   │   │   ├── flight_service.py   # Logic nghiệp vụ cho chuyến bay
│   │   │   ├── booking_service.py  # Logic nghiệp vụ cho đặt vé
│   │   │   ├── user_service.py     # Logic nghiệp vụ cho người dùng
│   │   ├── database.py             # Thiết lập và kết nối cơ sở dữ liệu
│   │   ├── config.py               # Cấu hình ứng dụng
│   │   └── templates/              # Thư mục chứa các mẫu thiết kế (design patterns) cho ứng dụng
│   ├── tests/                      # Thư mục chứa các unit test
│   │   ├── test_flights.py         # Unit test cho module chuyến bay
│   │   ├── test_bookings.py        # Unit test cho module đặt vé
│   ├── requirements.txt            # Các phụ thuộc cho backend
│   ├── Dockerfile                  # Dockerfile để xây dựng image cho backend
│   ├── .env                        # Các biến môi trường cho backend
│   └── alembic.ini                 # Cấu hình Alembic cho migrations
│
├── frontend/                       # Frontend ReactJS
│   ├── public/                     # Tài nguyên tĩnh như index.html, icons, v.v.
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js           # Component thanh điều hướng
│   │   │   ├── FlightList.js       # Component hiển thị danh sách chuyến bay
│   │   │   ├── PrivateRoute.js     # Component bảo vệ route yêu cầu đăng nhập
│   │   ├── pages/
│   │   │   ├── Home.js             # Trang chủ của ứng dụng
│   │   │   ├── Account/
│   │   │   │   ├── SignIn.js       # Trang đăng nhập
│   │   │   │   ├── SignUp.js       # Trang đăng ký
│   │   │   │   ├── Profile.js      # Trang hồ sơ cá nhân
│   │   │   │   ├── Logout.js       # Trang đăng xuất
│   │   │   ├── Booking/
│   │   │   │   ├── Booking.js      # Trang đặt vé
│   │   │   │   ├── BookTicket.js   # Trang mua vé
│   │   │   │   ├── ManageTicket.js # Trang quản lý vé
│   │   │   │   ├── PaymentGuide.js # Trang hướng dẫn thanh toán
│   │   │   │   ├── AddOnServices.js# Trang dịch vụ bổ trợ
│   │   │   ├── Info/
│   │   │   │   ├── TicketSchedule.js # Trang vé & lịch bay
│   │   │   │   ├── SpecialServices.js # Trang dịch vụ đặc biệt
│   │   │   │   ├── CheckIn.js      # Trang làm thủ tục
│   │   │   │   ├── DocumentRequirements.js # Trang yêu cầu giấy tờ
│   │   │   ├── Explore/
│   │   │   │   ├── Destinations.js # Trang điểm đến
│   │   │   │   ├── Offers.js       # Trang ưu đãi
│   │   │   │   ├── FlightExperience.js # Trang trải nghiệm bay
│   │   ├── services/
│   │   │   └── api.js              # Các hàm tương tác với API
│   │   ├── App.js                  # Component chính của React
│   │   ├── AppRoutes.js            # Định nghĩa các route của ứng dụng
│   │   └── index.js                # Điểm bắt đầu cho ứng dụng React
│   ├── package.json                # Các phụ thuộc cho frontend
│   ├── Dockerfile                  # Dockerfile để xây dựng image cho frontend
│   └── .env                        # Các biến môi trường cho frontend
│
├── [docker-compose.yml](http://_vscodecontentref_/1)              # Docker Compose để chạy các dịch vụ
└── .env                            # Các biến môi trường cho dự án
```

## ## Mô tả

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

## Cài đặt

### Yêu cầu

- Docker
- Docker Compose
- Node.js
- npm

### Thiết lập

1. **Clone repository:**

   ```bash
   git clone https://github.com/your-repo/qairline.git
   cd qairline
   ```

2. **Thiết lập biến môi trường:**
   Tạo file .env trong thư mục gốc và cấu hình các biến môi trường cần thiết.

   ```bash
      cp .env.example .env
   ```

3. **Build và chạy ứng dụng bằng Docker Compose:**
   ```bash
      docker-compose up --build
   ```

## Chạy Ứng dụng

### Backend

1. **Đi tới thư mục backend:**

   ```bash
      cd backend
   ```

2. **Cài đặt các phụ thuộc:**
   ```bash
      pip install -r requirements.txt
   ```
3. **Chạy ứng dụng:**
   ```bash
      uvicorn app.main:app --reload
   ```

### Frontend

1. **Đi tới thư mục frontend:**

   ```bash
      cd frontend
   ```

2. **Cài đặt các phụ thuộc:**
   ```bash
      npm install
   ```
3. **Chạy ứng dụng:**
   ```bash
      npm start
   ```

## Sử dụng:

### Truy cập Ứng dụng

- Frontend: Mở trình duyệt và truy cập http://localhost:3000
- Backend: API sẽ chạy trên http://localhost:8000

### Tài liệu API

- Swagger UI: Truy cập http://localhost:8000/docs để xem tài liệu API.
- ReDoc: Truy cập http://localhost:8000/redoc để xem tài liệu API.
