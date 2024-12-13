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
      <h2 className={styles.sectionTitle}>DANH SÁCH CHUYẾN BAY</h2>
      <table className={styles.flightTable}>
        <thead>
          <tr>
            <th>Số hiệu </th>
            <th>Khởi hành</th>
            <th>Thời gian bay </th>
            <th>Điểm đến</th>
            <th>Giá vé (VND)</th>
          </tr>
        </thead>
        <tbody>
          {currentFlights.map((flight) => (
            <tr key={flight.flight_id} onClick={() => onFlightClick(flight)}>
              <td>{flight.flight_number}</td>
              <td>
                {flight.departure_airport.iata_code}<br />
                <span className={styles.subInfo}>
                  {new Date(flight.departure_time).toLocaleString()}
                </span>
              </td>
              <td>{flight.flight_duration}</td>
              <td>
                {flight.arrival_airport.iata_code}<br />
                <span className={styles.subInfo}>
                  {new Date(flight.arrival_time).toLocaleString()}
                </span>
              </td>
              <td>{flight.price.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

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
