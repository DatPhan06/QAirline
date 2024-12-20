import React, { useState } from "react";
import styles from "./FlightList.module.css";

// FlightList.js
const FlightList = ({ flights, onFlightClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const flightsPerPage = 10;

  const today = new Date();

  const filteredFlights = flights.filter(
    (flight) => new Date(flight.departure_time) >= today
  );

  // Tính toán các chuyến bay hiển thị trên trang hiện tại
  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = filteredFlights.slice(
    indexOfFirstFlight,
    indexOfLastFlight
  );

  // Số trang tổng cộng
  const totalPages = Math.ceil(filteredFlights.length / flightsPerPage);

  // Hàm xử lý khi người dùng chuyển trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.flightListContainer}>
      {filteredFlights.length === 0 ? (
        <p className={styles.noFlights}>Hiện tại không có chuyến bay nào.</p>
      ) : (
        <>
          <h2 className={styles.sectionTitle}>DANH SÁCH CHUYẾN BAY</h2>
          <table className={styles.flightTable}>
            <thead>
              <tr>
                <th title="Mã số định danh của chuyến bay">Số hiệu</th>
                <th title="Sân bay và thời gian khởi hành">Khởi hành</th>
                <th title="Tổng thời gian bay dự kiến">Thời gian bay</th>
                <th title="Sân bay đích của chuyến bay">Điểm đến</th>
                <th title="Giá vé cơ bản của chuyến bay">Giá vé (VND)</th>
              </tr>
            </thead>
            <tbody>
              {currentFlights.map((flight) => (
                <tr
                  key={flight.flight_id}
                  onClick={() => onFlightClick(flight)}
                >
                  <td>{flight.flight_number}</td>
                  <td>
                    {flight.departure_airport.iata_code}
                    <br />
                    <span className={styles.subInfo}>
                      {new Date(flight.departure_time).toLocaleString()}
                    </span>
                  </td>
                  <td>{flight.flight_duration}</td>
                  <td>
                    {flight.arrival_airport.iata_code}
                    <br />
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
