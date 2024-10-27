# Flight Booking System

## Giới thiệu

Dự án **Flight Booking System** là một hệ thống đặt vé máy bay được phát triển theo mô hình MVC. Nó bao gồm:

- **Backend**: Xây dựng bằng FastAPI.
- **Frontend**: Xây dựng bằng ReactJS.

## Cấu trúc thư mục

```bash
flight_booking_system/
│
├── backend/                  # Thư mục chứa toàn bộ mã nguồn backend
│   ├── app/                  # Chứa các module chính của ứng dụng backend
│   │   ├── __init__.py       # Đánh dấu thư mục là một Python package
│   │   ├── main.py           # Điểm bắt đầu của ứng dụng FastAPI
│   │   ├── models/           # Models định nghĩa cấu trúc cơ sở dữ liệu
│   │   │   ├── __init__.py
│   │   │   ├── user.py       # Model đại diện cho bảng người dùng
│   │   │   ├── flight.py     # Model đại diện cho bảng chuyến bay
│   │   │   └── booking.py    # Model đại diện cho bảng đặt vé
│   │   ├── views/            # Views xử lý các yêu cầu API (Controllers)
│   │   │   ├── __init__.py
│   │   │   ├── user.py       # Xử lý các yêu cầu liên quan đến người dùng
│   │   │   ├── flight.py     # Xử lý các yêu cầu liên quan đến chuyến bay
│   │   │   └── booking.py    # Xử lý các yêu cầu liên quan đến đặt vé
│   │   ├── schemas/          # Schemas (Data Transfer Objects)
│   │   │   ├── __init__.py
│   │   │   ├── user.py       # Định nghĩa các schema cho người dùng
│   │   │   ├── flight.py     # Định nghĩa các schema cho chuyến bay
│   │   │   └── booking.py    # Định nghĩa các schema cho đặt vé
│   │   ├── controllers/      # Logic xử lý các thao tác CRUD
│   │   │   ├── __init__.py
│   │   │   ├── user.py       # Logic CRUD cho người dùng
│   │   │   ├── flight.py     # Logic CRUD cho chuyến bay
│   │   │   └── booking.py    # Logic CRUD cho đặt vé
│   │   ├── core/             # Chứa các tệp cấu hình và bảo mật
│   │   │   ├── __init__.py
│   │   │   ├── config.py     # Cấu hình của ứng dụng (biến môi trường, cài đặt)
│   │   │   └── security.py   # Cài đặt bảo mật (JWT, mã hóa mật khẩu)
│   │   ├── db/               # Kết nối cơ sở dữ liệu và các thiết lập liên quan
│   │   │   ├── __init__.py
│   │   │   ├── base.py       # Định nghĩa các lớp cơ sở cho models
│   │   │   └── session.py    # Tạo phiên kết nối cơ sở dữ liệu
│   │   └── utils/            # Chứa các hàm và tiện ích hỗ trợ
│   │       ├── __init__.py
│   │       └── helpers.py    # Các hàm hỗ trợ xử lý khác nhau trong ứng dụng
│   ├── tests/                # Chứa các bài kiểm thử cho backend
│   │   ├── __init__.py
│   │   ├── test_user.py      # Kiểm thử các chức năng liên quan đến người dùng
│   │   ├── test_flight.py    # Kiểm thử các chức năng liên quan đến chuyến bay
│   │   └── test_booking.py   # Kiểm thử các chức năng liên quan đến đặt vé
│   ├── .env                  # File chứa biến môi trường (bí mật, cấu hình)
│   ├── alembic.ini           # File cấu hình Alembic cho quản lý migration
│   ├── Dockerfile            # File Docker để container hóa backend
│   └── requirements.txt      # Danh sách các thư viện cần thiết cho backend
│
└── frontend/                 # Thư mục chứa toàn bộ mã nguồn frontend
    ├── public/               # Chứa các file tĩnh và file HTML gốc
    ├── src/                  # Chứa các thành phần chính của ReactJS
    │   ├── components/       # Chứa các thành phần giao diện (Views)
    │   │   ├── FlightList.js # Component hiển thị danh sách chuyến bay
    │   │   ├── Login.js      # Component giao diện đăng nhập
    │   │   └── Register.js   # Component giao diện đăng ký người dùng
    │   ├── pages/            # Chứa các trang chính của ứng dụng (Controllers)
    │   │   ├── HomePage.js   # Trang chủ của ứng dụng
    │   │   └── FlightPage.js # Trang quản lý chuyến bay
    │   ├── services/         # Chứa logic gọi API (Models)
    │   │   ├── flightService.js # Logic gọi API cho chuyến bay
    │   │   └── authService.js   # Logic gọi API cho xác thực người dùng
    │   ├── App.js            # Thành phần chính của ứng dụng React
    │   └── index.js          # File khởi tạo ứng dụng React
    ├── .env                  # File chứa biến môi trường cho frontend
    ├── Dockerfile            # File Docker để container hóa frontend
    └── package.json          # Quản lý các thư viện cần thiết cho frontend
```

## Mô tả chi tiết các thư mục

### Backend

- **`backend/app/models/`**: Chứa các mô hình dữ liệu tương ứng với các bảng trong cơ sở dữ liệu.
  - **`user.py`**: Định nghĩa mô hình cho bảng người dùng.
  - **`flight.py`**: Định nghĩa mô hình cho bảng chuyến bay.
  - **`booking.py`**: Định nghĩa mô hình cho bảng đặt vé.
- **`backend/app/views/`**: Xử lý các yêu cầu từ người dùng và gửi phản hồi tương ứng. Đây là phần **Controllers** trong mô hình MVC.

  - **`user.py`**: Xử lý các yêu cầu liên quan đến người dùng như đăng ký, đăng nhập.
  - **`flight.py`**: Xử lý các yêu cầu liên quan đến chuyến bay như tạo mới, lấy danh sách chuyến bay.
  - **`booking.py`**: Xử lý các yêu cầu liên quan đến việc đặt vé.

- **`backend/app/schemas/`**: Định nghĩa các lớp Pydantic để xác thực và chuyển đổi dữ liệu từ/to frontend.

  - **`user.py`**: Định nghĩa các schema cho người dùng, ví dụ như schema đăng ký, đăng nhập.
  - **`flight.py`**: Định nghĩa các schema cho chuyến bay.
  - **`booking.py`**: Định nghĩa các schema cho đặt vé.

- **`backend/app/controllers/`**: Chứa các logic xử lý CRUD cho các mô hình dữ liệu.

  - **`user.py`**: Thực hiện các thao tác CRUD cho người dùng như tạo, cập nhật, xóa người dùng.
  - **`flight.py`**: Thực hiện các thao tác CRUD cho chuyến bay.
  - **`booking.py`**: Thực hiện các thao tác CRUD cho đặt vé.

- **`backend/app/core/`**: Chứa các tệp cấu hình và bảo mật cho ứng dụng.

  - **`config.py`**: Định nghĩa các biến cấu hình cho ứng dụng, bao gồm các biến môi trường.
  - **`security.py`**: Cài đặt các chức năng bảo mật như tạo mã JWT, mã hóa mật khẩu.

- **`backend/app/db/`**: Thiết lập kết nối và quản lý cơ sở dữ liệu.

  - **`base.py`**: Định nghĩa các lớp cơ sở cho các mô hình dữ liệu.
  - **`session.py`**: Thiết lập phiên kết nối với cơ sở dữ liệu để thực hiện các thao tác.

- **`backend/app/utils/`**: Chứa các hàm tiện ích hỗ trợ các phần khác của ứng dụng.

  - **`helpers.py`**: Các hàm hỗ trợ xử lý khác nhau, ví dụ như hàm tạo mã ngẫu nhiên hoặc xử lý chuỗi.

- **`backend/tests/`**: Chứa các bài kiểm thử để đảm bảo các chức năng hoạt động chính xác.
  - **`test_user.py`**: Kiểm thử các chức năng liên quan đến người dùng như đăng ký, đăng nhập.
  - **`test_flight.py`**: Kiểm thử các chức năng liên quan đến chuyến bay.
  - **`test_booking.py`**: Kiểm thử các chức năng liên quan đến đặt vé.

### Frontend

- **`frontend/public/`**: Chứa các file tĩnh và file HTML gốc để ReactJS sử dụng.

  - **`index.html`**: File HTML gốc mà React sẽ render vào. Các file như ảnh và file favicon cũng nằm trong thư mục này.

- **`frontend/src/`**: Chứa toàn bộ mã nguồn của ứng dụng ReactJS.

  - **`components/`**: Chứa các thành phần giao diện (UI components) có thể tái sử dụng.

    - **`FlightList.js`**: Component hiển thị danh sách các chuyến bay.
    - **`Login.js`**: Component giao diện đăng nhập người dùng.
    - **`Register.js`**: Component giao diện đăng ký người dùng mới.

  - **`pages/`**: Định nghĩa các trang chính của ứng dụng, quản lý giao diện của từng trang.

    - **`HomePage.js`**: Trang chủ của ứng dụng.
    - **`FlightPage.js`**: Trang quản lý danh sách các chuyến bay.

  - **`services/`**: Chứa các hàm gọi API để tương tác với backend.

    - **`flightService.js`**: Chứa các hàm gọi API liên quan đến chuyến bay, ví dụ như lấy danh sách chuyến bay.
    - **`authService.js`**: Chứa các hàm gọi API liên quan đến xác thực người dùng như đăng ký, đăng nhập.

  - **`App.js`**: Thành phần chính của ứng dụng ReactJS, định nghĩa cấu trúc tổng thể và định tuyến cho các trang.
  - **`index.js`**: File khởi tạo ứng dụng React, render thành phần **App** vào DOM.

### Khác

- **`.env`**: Chứa các biến môi trường như thông tin kết nối cơ sở dữ liệu và các thông tin nhạy cảm khác. File này không nên commit lên Git.
- **`Dockerfile`**: Được sử dụng để container hóa các thành phần **backend** và **frontend** để triển khai dễ dàng hơn.
- **`requirements.txt`**: Danh sách các thư viện Python cần thiết cho backend.
- **`package.json`**: Quản lý các thư viện cần thiết cho frontend (ReactJS).
