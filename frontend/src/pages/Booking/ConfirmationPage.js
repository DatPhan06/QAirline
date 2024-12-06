// frontend/src/pages/Booking/ConfirmationPage.js

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ConfirmationPage.module.css";

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight, seat } = location.state || {};

  if (!flight || !seat) {
    return <p>Không có thông tin đặt vé. Vui lòng thử lại.</p>;
  }

  return (
    <div className={styles.confirmationContainer}>
      <h1 className={styles.title}>Xác nhận đặt vé</h1>

      <div className={styles.flightInfo}>
        <h2>Thông tin chuyến bay</h2>
        <p>
          <strong>Chuyến bay:</strong> {flight.flight_number}
        </p>
        <p>
          <strong>Điểm khởi hành:</strong> {flight.departure_airport.name} -{" "}
          {flight.departure_airport.city}
        </p>
        <p>
          <strong>Điểm đến:</strong> {flight.arrival_airport.name} -{" "}
          {flight.arrival_airport.city}
        </p>
        <p>
          <strong>Thời gian khởi hành:</strong>{" "}
          {new Date(flight.departure_time).toLocaleString()}
        </p>
        <p>
          <strong>Thời gian đến:</strong>{" "}
          {new Date(flight.arrival_time).toLocaleString()}
        </p>
        <p>
          <strong>Ghế:</strong> {seat.seat_number} ({seat.seat_class})
        </p>
        <p>
          <strong>Giá vé:</strong> {flight.price.toLocaleString()} VND
        </p>
      </div>

      <button onClick={() => navigate("/")} className={styles.homeButton}>
        Về trang chủ
      </button>
    </div>
  );
};

export default ConfirmationPage;
