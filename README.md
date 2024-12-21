# QAIRLINE Project Structure (FastAPI & ReactJS)

## Project Overview

QAIRLINE là một hệ thống đặt vé máy bay được xây dựng bằng FastAPI cho backend và ReactJS cho frontend. Dự án này bao gồm các tính năng như quản lý vé, thông tin chuyến bay, và các dịch vụ bổ trợ.

## Project Structure

```bash
├── backend/                        # Backend FastAPI
│   ├── app/
│   │   ├── main.py                 # Điểm bắt đầu của ứng dụng chính
│   │   ├── models/                 # Các model database
│   │   ├── schemas/                # Schemas Pydantic
│   │   ├── routers/                # API endpoints
│   │   ├── services/               # Business logic
│   │   ├── database.py             # Thiết lập và kết nối cơ sở dữ liệu
│   │   ├── config.py               # Cấu hình ứng dụng
│   │   ├── base.py                 # File Base của model
│   ├── tests/                      # Unit tests
│   ├── requirements.txt            # Dependencies
│   ├── Dockerfile                  # Docker config cho backend
│   ├── .env                        # Biến môi trường backend
│   └── alembic.ini                # Cấu hình migrations
│
├── frontend/                      # Frontend ReactJS
│   ├── public/                    # Static assets
│   ├── src/
│   │   ├── components/            # Shared components
│   │   ├── assets/                # File tĩnh
│   │   ├── style/                 # thuộc tính CSS chung
│   │   ├── pages/                 # Page components
│   │   ├── services/              # API services
│   │   ├── App.js                 # Root component
│   │   ├── AppRoutes.js           # Route definitions
│   │   └── index.js               # Entry point
│   ├── package.json               # Dependencies
│   ├── Dockerfile                 # Docker config cho frontend
│   └── .env                       # Biến môi trường frontend
│
├── db_init/                       # Database initialization
│
├── docker-compose.yml             # Docker compose config
└── .env                          # Biến môi trường project
```

# Giải Thích Chi Tiết Các Thành Phần Dự Án

## **Backend** - FastAPI

### **Thư mục và file chính:**

- **`backend/app/`**: Chứa toàn bộ mã nguồn chính của backend.

  - **`main.py`**: Điểm bắt đầu của ứng dụng FastAPI, nơi khởi tạo ứng dụng và các router.
  - **`models/`**: Định nghĩa các model database sử dụng SQLAlchemy. Đây là nơi khai báo cấu trúc bảng và mối quan hệ trong cơ sở dữ liệu.
  - **`schemas/`**: Định nghĩa các schemas sử dụng Pydantic để xác thực dữ liệu đầu vào/đầu ra (request/response).
  - **`routers/`**: Tập hợp các endpoint API, tổ chức logic theo từng module hoặc chức năng.
  - **`services/`**: Chứa logic nghiệp vụ để tách biệt xử lý dữ liệu khỏi routers, giúp code dễ bảo trì.
  - **`database.py`**: Thiết lập kết nối đến cơ sở dữ liệu, bao gồm URL kết nối và khởi tạo engine.
  - **`config.py`**: Chứa các cấu hình của ứng dụng như thông tin cơ sở dữ liệu, secret keys hoặc các thông số liên quan.
  - **`base.py`**: File cơ sở cho các model, thường chứa các định nghĩa chung như Base của SQLAlchemy.

- **`backend/tests/`**: Chứa các file để viết unit test cho backend.
- **`requirements.txt`**: Danh sách các thư viện Python cần thiết để chạy ứng dụng.
- **`Dockerfile`**: Cấu hình Docker cho backend, giúp đóng gói ứng dụng trong container.
- **`.env`**: Chứa các biến môi trường của backend như thông tin cơ sở dữ liệu, secret keys.
- **`alembic.ini`**: Cấu hình Alembic để thực hiện migrations cho cơ sở dữ liệu.

---

## **Frontend** - ReactJS

### **Thư mục và file chính:**

- **`frontend/public/`**: Chứa các file tĩnh như `index.html` (template gốc cho ứng dụng React).
- **`frontend/src/`**: Thư mục chứa mã nguồn chính của React.

  - **`components/`**: Các thành phần giao diện có thể tái sử dụng (Reusable components).
  - **`assets/`**: Chứa các file tĩnh như hình ảnh, biểu tượng hoặc tài nguyên CSS riêng lẻ.
  - **`style/`**: Chứa các file CSS chung để định nghĩa kiểu dáng cho toàn ứng dụng.
  - **`pages/`**: Định nghĩa các trang lớn trong ứng dụng, thường liên kết với các route cụ thể.
  - **`services/`**: Chứa các module giao tiếp với API backend, quản lý logic gọi API.
  - **`App.js`**: Component gốc của ứng dụng, nơi khởi tạo các thành phần chính.
  - **`AppRoutes.js`**: Định nghĩa các route của ứng dụng React.
  - **`index.js`**: Entry point của ứng dụng React, nơi ứng dụng được khởi động.

- **`package.json`**: Quản lý các dependencies của React và scripts cần thiết để chạy/đóng gói ứng dụng.
- **`Dockerfile`**: Cấu hình Docker cho frontend, dùng để đóng gói ứng dụng React vào container.
- **`.env`**: Biến môi trường cho frontend, thường chứa thông tin API endpoint.

---

## **Các Thành Phần Hỗ Trợ Khác**

- **`db_init/`**: Chứa các file khởi tạo cơ sở dữ liệu như scripts SQL hoặc cấu hình ban đầu.
- **`docker-compose.yml`**: File cấu hình Docker Compose để chạy cả backend và frontend trong các container liên kết với nhau.
- **`.env`**: Chứa các biến môi trường chung cho toàn bộ dự án, như thông tin cấu hình mạng hoặc các secret dùng chung.

---

# Mẫu Thiết Kế Sử Dụng Trong Dự Án

Dự án này áp dụng **mẫu thiết kế kiến trúc phân tầng (Layered Architecture)** kết hợp với **Module-based Design**, cùng các công cụ DevOps như Docker. Dưới đây là giải thích chi tiết.

---

## **1. Mẫu Thiết Kế Kiến Trúc Phân Tầng (Layered Architecture)**

### **Backend - FastAPI**

Dự án backend tuân theo kiến trúc phân tầng với các lớp chính:

- **Lớp Data Access (Models và Database):**

  - **Thư mục:** `models/`, `database.py`
  - **Chức năng:** Quản lý việc truy cập và thao tác với cơ sở dữ liệu (ORM).
  - **Ví dụ:** Khai báo cấu trúc bảng và các quan hệ trong SQLAlchemy.

- **Lớp Logic Nghiệp Vụ (Services):**

  - **Thư mục:** `services/`
  - **Chức năng:** Xử lý logic nghiệp vụ (business logic) tách biệt khỏi API endpoint.
  - **Ví dụ:** Tính toán hoặc xử lý dữ liệu trước khi gửi đến API.

- **Lớp API (Routers):**

  - **Thư mục:** `routers/`
  - **Chức năng:** Cung cấp các API endpoint để giao tiếp với frontend hoặc dịch vụ khác.
  - **Ví dụ:** Xử lý các yêu cầu HTTP như GET, POST, PUT.

- **Lớp Schema Validation:**

  - **Thư mục:** `schemas/`
  - **Chức năng:** Sử dụng Pydantic để xác thực và định dạng dữ liệu request/response.

- **Lớp Cấu Hình và Khởi Tạo:**
  - **Files:** `main.py`, `config.py`
  - **Chức năng:** Khởi tạo ứng dụng và cấu hình môi trường.

---

### **Frontend - ReactJS**

Frontend được tổ chức theo các tầng chức năng rõ ràng:

- **Lớp View (Components và Pages):**

  - **Thư mục:** `components/`, `pages/`
  - **Chức năng:** Tạo và quản lý giao diện người dùng.
  - **Ví dụ:** `components/` chứa các thành phần tái sử dụng, `pages/` định nghĩa các trang lớn.

- **Lớp Dữ liệu (Services):**

  - **Thư mục:** `services/`
  - **Chức năng:** Giao tiếp với API backend, xử lý logic API.

- **Lớp Style và Assets:**
  - **Thư mục:** `style/`, `assets/`
  - **Chức năng:** Chứa CSS chung và tài nguyên tĩnh như hình ảnh, biểu tượng.

---

## **2. Module-based Design**

Cả backend và frontend đều được tổ chức theo mô hình module hóa:

- **Backend:**

  - Các thư mục như `routers/`, `services/`, `models/` đại diện cho từng module chức năng cụ thể.
  - **Lợi ích:** Tăng tính tái sử dụng và dễ bảo trì.

- **Frontend:**
  - Các thư mục như `components/`, `pages/`, `services/` chia theo từng phần giao diện hoặc chức năng.
  - **Lợi ích:** Tổ chức code rõ ràng và dễ mở rộng.

---

## **3. Kết Hợp DevOps và Docker**

- **File Docker:**
  - `Dockerfile` trong frontend/backend giúp đóng gói ứng dụng.
  - `docker-compose.yml` cho phép chạy cả backend và frontend trong các container liên kết.
- **Lợi ích:**
  - Dễ dàng triển khai đồng nhất môi trường.
  - Hỗ trợ phát triển theo mô hình microservices.

---

## **Tóm Tắt**

- **Mẫu thiết kế chính:**
  - **Layered Architecture**: Phân chia chức năng thành các tầng rõ ràng.
  - **Module-based Design**: Tách biệt các module để tăng tính tái sử dụng và bảo trì.
- **Hỗ trợ triển khai:** Docker và DevOps giúp triển khai linh hoạt, đồng nhất môi trường.

Cấu trúc này phù hợp cho các dự án lớn, có khả năng mở rộng và dễ dàng quản lý.

## Cài Đặt

### Yêu Cầu

- Docker
- Docker Compose

## Thiết Lập

1. Clone repository:

```
   git clone https://github.com/DatPhan06/QAirline
   cd qairline
```

2. Thiết lập biến môi trường:
   Tạo file .env từ file mẫu .env.example và cấu hình các biến môi trường cần thiết.

   ```
   cp .env.example .env
   ```

3. Build và chạy ứng dụng bằng Docker Compose:

```
   docker-compose up --build
```

## Chạy Ứng Dụng

### Sử Dụng Docker Compose

Sau khi chạy lệnh docker-compose up --build, ứng dụng sẽ tự động khởi chạy cả backend và frontend trong các container riêng biệt.

- Frontend: Truy cập http://localhost:3000
- Backend: API sẽ chạy trên http://localhost:8000

## Sử Dụng

### Tài Liệu API

- Swagger UI: Truy cập http://localhost:8000/docs
- ReDoc: Truy cập http://localhost:8000/redoc
