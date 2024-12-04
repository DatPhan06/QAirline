-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th12 04, 2024 lúc 03:06 PM
-- Phiên bản máy phục vụ: 8.0.30
-- Phiên bản PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `qairline`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `admins`
--

CREATE TABLE `admins` (
  `admin_id` int NOT NULL,
  `role` varchar(50) NOT NULL,
  `permissions` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `hashed_password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `admins`
--

INSERT INTO `admins` (`admin_id`, `role`, `permissions`, `created_at`, `updated_at`, `username`, `hashed_password`) VALUES
(1, 'Admin', 'Full', '2024-11-25 10:00:00', '2024-11-25 12:00:00', 'admin1', 'hashedpassword1'),
(2, 'Editor', 'Limited', '2024-11-24 09:00:00', '2024-11-24 11:00:00', 'editor1', 'hashedpassword2'),
(3, 'full', 'full', '2024-12-01 16:07:22', '2024-12-01 16:07:22', '1234', '$2b$12$khBjm6fqVGXAfTLt08dt8OiUM5zR7yoOeBWWP/Q6tXJDTmwl5Axyu');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `airplanes`
--

CREATE TABLE `airplanes` (
  `airplane_id` int NOT NULL,
  `model` varchar(100) NOT NULL,
  `manufacturer` varchar(100) NOT NULL,
  `seat_capacity` int NOT NULL,
  `range_km` int DEFAULT NULL,
  `year_of_manufacture` int DEFAULT NULL,
  `maintenance_status` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `airplanes`
--

INSERT INTO `airplanes` (`airplane_id`, `model`, `manufacturer`, `seat_capacity`, `range_km`, `year_of_manufacture`, `maintenance_status`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Boeing 737', 'Boeing', 150, 6000, 2015, 'Good', 'Active', '2024-11-25 10:30:00', '2024-11-25 10:45:00'),
(2, 'Airbus A320', 'Airbus', 180, 5700, 2018, 'Excellent', 'Active', '2024-11-25 10:35:00', '2024-11-25 10:50:00'),
(3, '123', '123', 123, 123, 123, '123', '1', '2024-12-02 06:37:37', '2024-12-02 06:37:37'),
(4, '123', '123', 123, 123, 123, '123', '1', '2024-12-02 19:13:45', '2024-12-02 19:13:45');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `airports`
--

CREATE TABLE `airports` (
  `airport_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `iata_code` varchar(3) NOT NULL,
  `icao_code` varchar(4) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `airports`
--

INSERT INTO `airports` (`airport_id`, `name`, `city`, `country`, `iata_code`, `icao_code`, `created_at`, `updated_at`) VALUES
(1, 'Noi Bai International Airport', 'Hanoi', 'Vietnam', 'HAN', 'VVNB', '2024-11-25 10:40:00', '2024-11-25 10:50:00'),
(2, 'Tan Son Nhat International Airport', 'Ho Chi Minh City', 'Vietnam', 'SGN', 'VVTS', '2024-11-25 10:45:00', '2024-11-25 10:55:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `alembic_version`
--

CREATE TABLE `alembic_version` (
  `version_num` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `alembic_version`
--

INSERT INTO `alembic_version` (`version_num`) VALUES
('97ad43fcabbc');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `booked_tickets`
--

CREATE TABLE `booked_tickets` (
  `booked_ticket_id` int NOT NULL,
  `user_id` int NOT NULL,
  `flight_id` int NOT NULL,
  `seat_id` int NOT NULL,
  `ticket_id` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `booking_time` datetime DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `booked_tickets`
--

INSERT INTO `booked_tickets` (`booked_ticket_id`, `user_id`, `flight_id`, `seat_id`, `ticket_id`, `price`, `booking_time`, `status`, `created_at`, `updated_at`) VALUES
(1, 7, 1, 1, 1, 100.00, '2024-11-25 12:00:00', 'Booked', '2024-11-25 12:10:00', '2024-11-25 12:15:00'),
(3, 1, 1, 1, 1, 12345.00, '2024-12-25 17:24:16', 'Booked', '2024-12-25 17:24:16', '2024-12-26 17:25:08'),
(8, 1, 11, 1, 1, 1234.00, '2024-12-25 17:25:29', 'Booked', '2024-12-26 17:25:29', '2024-12-26 17:25:29');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `flights`
--

CREATE TABLE `flights` (
  `flight_id` int NOT NULL,
  `airplane_id` int NOT NULL,
  `flight_number` varchar(20) NOT NULL,
  `departure_time` datetime NOT NULL,
  `arrival_time` datetime NOT NULL,
  `flight_duration` time DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `available_seats` int DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `departure_airport_id` int NOT NULL,
  `arrival_airport_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `flights`
--

INSERT INTO `flights` (`flight_id`, `airplane_id`, `flight_number`, `departure_time`, `arrival_time`, `flight_duration`, `status`, `available_seats`, `price`, `created_at`, `updated_at`, `departure_airport_id`, `arrival_airport_id`) VALUES
(1, 1, 'VN123', '2024-12-01 08:40:00', '2024-12-01 10:00:00', '02:00:00', 'Scheduled', 140, 100.00, '2024-11-25 10:50:00', '2024-12-02 19:13:45', 1, 2),
(2, 2, 'VN456', '2024-12-01 14:00:00', '2024-12-01 16:30:00', '02:30:00', 'Scheduled', 160, 120.00, '2024-11-25 11:00:00', '2024-11-25 11:05:00', 2, 1),
(4, 1, 'aloalo', '2024-11-27 16:44:59', '2024-11-27 16:44:59', '16:44:59', 'scheduled', 0, 100.00, '2024-11-27 16:44:17', '2024-11-27 16:44:17', 1, 2),
(11, 1, 'string', '2024-11-27 16:57:43', '2024-11-27 16:57:43', '16:57:43', 'scheduled', 0, 0.00, '2024-11-27 16:57:10', '2024-11-27 16:57:10', 1, 2),
(12, 1, '123', '2024-12-02 01:05:00', '2024-12-03 01:05:00', '12:23:23', '1', 120, 12.00, '2024-12-01 17:42:06', '2024-12-01 17:42:06', 1, 2),
(15, 1, '12', '2024-12-03 06:00:00', '2024-12-03 18:31:00', '12:23:23', 'hehe', 123, 123.00, '2024-12-03 09:30:21', '2024-12-03 09:30:21', 1, 1),
(19, 1, '120', '2024-12-03 06:00:00', '2024-12-03 18:31:00', '12:23:23', 'hehe', 123, 123.00, '2024-12-03 09:30:21', '2024-12-03 09:30:21', 1, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `flight_logs`
--

CREATE TABLE `flight_logs` (
  `log_id` int NOT NULL,
  `flight_id` int NOT NULL,
  `log_message` text NOT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `general_info`
--

CREATE TABLE `general_info` (
  `info_id` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `general_info`
--

INSERT INTO `general_info` (`info_id`, `title`, `content`, `created_at`, `updated_at`) VALUES
(1, 'hehe', 'test', '2024-11-07 21:35:28', '2024-11-13 21:35:28'),
(2, '22222', '222222', '2024-11-21 21:35:46', '2024-11-22 21:35:46'),
(3, 'hehe', 'hehehehehe', '2024-12-02 10:19:41', '2024-12-02 10:19:41'),
(4, 'hehe', 'hehe', '2024-12-02 10:19:41', '2024-12-02 10:19:41'),
(5, 'hehe', 'hehe', '2024-12-02 11:31:58', '2024-12-02 11:31:58');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `news`
--

CREATE TABLE `news` (
  `news_id` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `author_id` int NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `news`
--

INSERT INTO `news` (`news_id`, `title`, `content`, `author_id`, `created_at`, `updated_at`) VALUES
(1, 'string', 'string', 1, '2024-12-02 11:31:58', '2024-12-02 11:31:58'),
(2, '123', '123\n', 3, '2024-12-02 11:31:58', '2024-12-02 11:31:58'),
(3, 'hehe', 'hehehe', 3, '2024-12-02 11:31:58', '2024-12-02 11:31:58'),
(4, 'hehe', 'hehe', 3, '2024-12-02 11:31:58', '2024-12-02 11:31:58');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `notifications`
--

CREATE TABLE `notifications` (
  `notification_id` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `type` varchar(50) NOT NULL,
  `user_id` int DEFAULT NULL,
  `flight_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `notifications`
--

INSERT INTO `notifications` (`notification_id`, `title`, `content`, `type`, `user_id`, `flight_id`, `created_at`, `updated_at`) VALUES
(1, 'hehe', 'hehe', 'hehe', 1, 1, '2024-12-02 11:31:58', '2024-12-02 11:31:58');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `promotions`
--

CREATE TABLE `promotions` (
  `promotion_id` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `discount_percentage` float NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `promotions`
--

INSERT INTO `promotions` (`promotion_id`, `title`, `description`, `discount_percentage`, `start_date`, `end_date`, `created_at`, `updated_at`) VALUES
(1, 'hehe', 'hehe', 12, '2024-12-12 00:00:00', '2024-12-24 00:00:00', '2024-12-02 11:31:58', '2024-12-02 11:31:58');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `seats`
--

CREATE TABLE `seats` (
  `seat_id` int NOT NULL,
  `airplane_id` int NOT NULL,
  `seat_number` varchar(10) NOT NULL,
  `seat_class` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `seats`
--

INSERT INTO `seats` (`seat_id`, `airplane_id`, `seat_number`, `seat_class`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'string', 'string', 'string', '2024-11-25 11:15:00', '2024-11-29 15:49:37'),
(2, 2, '1B', 'Business', 'Available', '2024-11-25 11:25:00', '2024-11-25 11:30:00'),
(3, 1, 'ALC123', 'hehe', 'available', '2024-11-29 15:49:37', '2024-11-29 15:49:37');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tickets`
--

CREATE TABLE `tickets` (
  `ticket_id` int NOT NULL,
  `flight_id` int NOT NULL,
  `class_type` varchar(50) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `status` varchar(50) DEFAULT NULL,
  `seat_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `tickets`
--

INSERT INTO `tickets` (`ticket_id`, `flight_id`, `class_type`, `price`, `status`, `seat_id`) VALUES
(1, 1, 'Economy', 100.00, 'Available', 1),
(2, 2, 'Business', 120.00, 'Available', 2),
(3, 1, 'string', 100.00, 'available', 1),
(4, 1, 'string', 100.00, 'available', 1),
(5, 2, 'string', 100.00, 'available', 1),
(7, 2, 'string', 100.00, 'available', 1),
(8, 2, 'string', 100.00, 'available', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `hashed_password` varchar(255) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`user_id`, `username`, `full_name`, `email`, `hashed_password`, `phone`, `created_at`, `updated_at`) VALUES
(1, '123', '123', '123@gmail.com', '$2b$12$LwjzmxG5Byslf2RXVJhVQO9MOVbtrfyR16u2D3jJdBIRkGqOxcQk6', NULL, '2024-11-25 11:00:39', '2024-11-25 11:00:39'),
(2, 'dat', 'dat', 'dat@gmail.com', '$2b$12$sc1E/HMUXkgS809JnWsiVuOZSvKln44L.TF4QTLKKcKJ3NCLEC756', NULL, '2024-11-25 13:57:07', '2024-11-25 13:57:07'),
(3, 'dat1', 'dat1', 'dat1@gmail.com', '$2b$12$ySAIgZh1S6ranReWCwc1mefDcrMbKK4YX3TIxy38TrcoOkmDUuNQe', NULL, '2024-11-25 13:57:07', '2024-11-25 13:57:07'),
(4, 'testuser1', 'Test User 1', 'testuser1@gmail.com', 'hashedpassword3', '1234567890', '2024-11-25 10:55:00', '2024-11-25 11:00:00'),
(5, 'testuser2', 'Test User 2', 'testuser2@gmail.com', 'hashedpassword4', '0987654321', '2024-11-25 11:05:00', '2024-11-25 11:10:00'),
(7, 'hello', 'hello', 'hello@gmail.com', '$2b$12$reBeco4dZ.R1aZhUVyupN.axyoffXKTZPaPzNtVEYWrO0nascQ3uG', NULL, '2024-11-29 09:17:35', '2024-11-29 09:17:35'),
(8, 'hehe', 'hehe', 'hehe@gmail.com', '$2b$12$ZZMlvg/H4Gs31FNyTfPzluaWuguC3T3B4Vc88sAqFuFgn3r4m69bm', NULL, '2024-12-03 08:14:06', '2024-12-03 08:14:06'),
(9, 'hehehe', 'hehehe', 'hehehe@gmail.com', '$2b$12$gj2dwrzqpSlffOC57OC22OTjKLBoc8z6Uk9N3lME/Gn3qKkk5TOsO', NULL, '2024-12-03 08:14:06', '2024-12-03 08:14:06');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `ix_admins_admin_id` (`admin_id`);

--
-- Chỉ mục cho bảng `airplanes`
--
ALTER TABLE `airplanes`
  ADD PRIMARY KEY (`airplane_id`),
  ADD KEY `ix_airplanes_airplane_id` (`airplane_id`);

--
-- Chỉ mục cho bảng `airports`
--
ALTER TABLE `airports`
  ADD PRIMARY KEY (`airport_id`),
  ADD UNIQUE KEY `iata_code` (`iata_code`),
  ADD UNIQUE KEY `icao_code` (`icao_code`),
  ADD KEY `ix_airports_airport_id` (`airport_id`);

--
-- Chỉ mục cho bảng `alembic_version`
--
ALTER TABLE `alembic_version`
  ADD PRIMARY KEY (`version_num`);

--
-- Chỉ mục cho bảng `booked_tickets`
--
ALTER TABLE `booked_tickets`
  ADD PRIMARY KEY (`booked_ticket_id`),
  ADD KEY `flight_id` (`flight_id`),
  ADD KEY `seat_id` (`seat_id`),
  ADD KEY `ticket_id` (`ticket_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `ix_booked_tickets_booked_ticket_id` (`booked_ticket_id`);

--
-- Chỉ mục cho bảng `flights`
--
ALTER TABLE `flights`
  ADD PRIMARY KEY (`flight_id`),
  ADD UNIQUE KEY `flight_number` (`flight_number`),
  ADD KEY `airplane_id` (`airplane_id`),
  ADD KEY `ix_flights_flight_id` (`flight_id`),
  ADD KEY `arrival_airport_id` (`arrival_airport_id`),
  ADD KEY `departure_airport_id` (`departure_airport_id`);

--
-- Chỉ mục cho bảng `flight_logs`
--
ALTER TABLE `flight_logs`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `flight_id` (`flight_id`),
  ADD KEY `ix_flight_logs_log_id` (`log_id`);

--
-- Chỉ mục cho bảng `general_info`
--
ALTER TABLE `general_info`
  ADD PRIMARY KEY (`info_id`),
  ADD KEY `ix_general_info_info_id` (`info_id`);

--
-- Chỉ mục cho bảng `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`news_id`),
  ADD KEY `author_id` (`author_id`),
  ADD KEY `ix_news_news_id` (`news_id`);

--
-- Chỉ mục cho bảng `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `flight_id` (`flight_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `ix_notifications_notification_id` (`notification_id`);

--
-- Chỉ mục cho bảng `promotions`
--
ALTER TABLE `promotions`
  ADD PRIMARY KEY (`promotion_id`),
  ADD KEY `ix_promotions_promotion_id` (`promotion_id`);

--
-- Chỉ mục cho bảng `seats`
--
ALTER TABLE `seats`
  ADD PRIMARY KEY (`seat_id`),
  ADD KEY `airplane_id` (`airplane_id`),
  ADD KEY `ix_seats_seat_id` (`seat_id`);

--
-- Chỉ mục cho bảng `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`ticket_id`),
  ADD KEY `flight_id` (`flight_id`),
  ADD KEY `ix_tickets_ticket_id` (`ticket_id`),
  ADD KEY `seat_id` (`seat_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `ix_users_user_id` (`user_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `admins`
--
ALTER TABLE `admins`
  MODIFY `admin_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `airplanes`
--
ALTER TABLE `airplanes`
  MODIFY `airplane_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `airports`
--
ALTER TABLE `airports`
  MODIFY `airport_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `booked_tickets`
--
ALTER TABLE `booked_tickets`
  MODIFY `booked_ticket_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `flights`
--
ALTER TABLE `flights`
  MODIFY `flight_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT cho bảng `flight_logs`
--
ALTER TABLE `flight_logs`
  MODIFY `log_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `general_info`
--
ALTER TABLE `general_info`
  MODIFY `info_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `news`
--
ALTER TABLE `news`
  MODIFY `news_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notification_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `promotions`
--
ALTER TABLE `promotions`
  MODIFY `promotion_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `seats`
--
ALTER TABLE `seats`
  MODIFY `seat_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `tickets`
--
ALTER TABLE `tickets`
  MODIFY `ticket_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `booked_tickets`
--
ALTER TABLE `booked_tickets`
  ADD CONSTRAINT `booked_tickets_ibfk_1` FOREIGN KEY (`flight_id`) REFERENCES `flights` (`flight_id`),
  ADD CONSTRAINT `booked_tickets_ibfk_2` FOREIGN KEY (`seat_id`) REFERENCES `seats` (`seat_id`),
  ADD CONSTRAINT `booked_tickets_ibfk_3` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`ticket_id`),
  ADD CONSTRAINT `booked_tickets_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Các ràng buộc cho bảng `flights`
--
ALTER TABLE `flights`
  ADD CONSTRAINT `flights_ibfk_1` FOREIGN KEY (`airplane_id`) REFERENCES `airplanes` (`airplane_id`),
  ADD CONSTRAINT `flights_ibfk_2` FOREIGN KEY (`arrival_airport_id`) REFERENCES `airports` (`airport_id`),
  ADD CONSTRAINT `flights_ibfk_3` FOREIGN KEY (`departure_airport_id`) REFERENCES `airports` (`airport_id`);

--
-- Các ràng buộc cho bảng `flight_logs`
--
ALTER TABLE `flight_logs`
  ADD CONSTRAINT `flight_logs_ibfk_1` FOREIGN KEY (`flight_id`) REFERENCES `flights` (`flight_id`);

--
-- Các ràng buộc cho bảng `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `news_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `admins` (`admin_id`);

--
-- Các ràng buộc cho bảng `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`flight_id`) REFERENCES `flights` (`flight_id`),
  ADD CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Các ràng buộc cho bảng `seats`
--
ALTER TABLE `seats`
  ADD CONSTRAINT `seats_ibfk_1` FOREIGN KEY (`airplane_id`) REFERENCES `airplanes` (`airplane_id`);

--
-- Các ràng buộc cho bảng `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`flight_id`) REFERENCES `flights` (`flight_id`),
  ADD CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`seat_id`) REFERENCES `seats` (`seat_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
