// FlightDetail.js
import React from "react";
import styles from "./FlightDetail.module.css";

const FlightDetail = ({ flight }) => {
  return (
    <div className={styles.flightDetailContainer}>
      <h1>Chi tiết chuyến bay</h1>
      <p>Số hiệu: {flight.flight_number}</p>
      <p>Điểm khởi hành: {flight.departure_airport.name}</p>
      <p>Điểm đến: {flight.arrival_airport.name}</p>
      <p>
        Thời gian khởi hành: {new Date(flight.departure_time).toLocaleString()}
      </p>
      <p>Thời gian đến: {new Date(flight.arrival_time).toLocaleString()}</p>

      {/* Hiển thị thông tin máy bay nếu có */}
      {flight.airplane && (
        <>
          <h2>Thông tin máy bay</h2>
          <p>Mô hình: {flight.airplane.model}</p>
          <p>Nhà sản xuất: {flight.airplane.manufacturer}</p>
          <p>Sức chứa: {flight.airplane.seat_capacity}</p>

          {/* Hiển thị danh sách ghế */}
          <h2>Danh sách chỗ ngồi</h2>
          <ul className={styles.seatList}>
            {flight.airplane.seats.map((seat) => (
              <li key={seat.seat_id} className={styles.seatItem}>
                Ghế số: {seat.seat_number}, Loại ghế: {seat.seat_class}, Trạng
                thái: {seat.status}
              </li>
            ))}
          </ul>
        </>
      )}

      <button onClick={() => window.location.reload()}>
        Quay lại danh sách
      </button>
    </div>
  );
};

export default FlightDetail;
