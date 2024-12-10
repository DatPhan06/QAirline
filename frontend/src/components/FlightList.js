import React, { useState } from "react";
import styles from "./FlightList.module.css";

// FlightList.js
const FlightList = ({ flights, onFlightClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const flightsPerPage = 10;

  // Tính toán các chuyến bay hiển thị trên trang hiện tại
  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = flights.slice(indexOfFirstFlight, indexOfLastFlight);

  // Số trang tổng cộng
  const totalPages = Math.ceil(flights.length / flightsPerPage);

  // Hàm xử lý khi người dùng chuyển trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.flightListContainer}>
      {flights.length === 0 ? (
        <p className={styles.noFlights}>Hiện tại không có chuyến bay nào.</p>
      ) : (
        <>
          <h2 className={styles.sectionTitle}>VUI TỪNG CHUYẾN BAY</h2>
          <ul className={styles.flightList}>
            {currentFlights.map((flight) => (
              <li
                key={flight.flight_id}
                className={styles.flightCard}
                onClick={() => onFlightClick(flight)}
              >
                <div className={styles.flightHeader}>
                  <span className={styles.flightNumber}>
                    {flight.flight_number}
                  </span>
                  <span className={styles.flightStatus}>{flight.status}</span>
                </div>
                <div className={styles.flightRow}>
                  <p className={styles.flightDetails}>
                    <span>Khởi hành:</span> {flight.departure_airport.iata_code}{" "}
                    - {new Date(flight.departure_time).toLocaleString()}
                  </p>
                  <p className={styles.flightDetails}>
                    <span>Điểm đến:</span> {flight.arrival_airport.iata_code} -{" "}
                    {new Date(flight.arrival_time).toLocaleString()}
                  </p>
                </div>
                <div className={styles.flightRow}>
                  <p className={styles.flightDetails}>
                    <span>Thời gian bay:</span> {flight.flight_duration} phút
                  </p>
                  <p className={styles.flightDetails}>
                    <span>Giá vé:</span> {flight.price.toLocaleString()} VND
                  </p>
                </div>{" "}
              </li>
            ))}
          </ul>
          {/* Điều hướng phân trang */}
          <div className={styles.pagination}>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`${styles.pageButton} ${
                  currentPage === index + 1 ? styles.activePageButton : ""
                }`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FlightList;
