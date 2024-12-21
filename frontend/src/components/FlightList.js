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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Xác định số lượng link hiển thị tối đa
  const maxPageLinks = 5;

  // Hàm sinh mảng trang hiển thị
  function generatePageNumbers(currentPage, totalPages, maxLinks) {
    const pageNumbers = [];

    let startPage = Math.max(currentPage - Math.floor(maxLinks / 2), 1);
    let endPage = startPage + maxLinks - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxLinks + 1, 1);
    }

    // Thêm trang 1
    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push("...");
      }
    }

    // Thêm các trang trong khoảng
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Thêm trang cuối
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  }

  // Sử dụng generatePageNumbers để hiển thị số trang
  const pageNumbers = generatePageNumbers(
    currentPage,
    totalPages,
    maxPageLinks
  );

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
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Trước
            </button>
            {pageNumbers.map((num, index) =>
              num === "..." ? (
                <span key={index} style={{ margin: "0 6px" }}>
                  ...
                </span>
              ) : (
                <button
                  key={num}
                  onClick={() => paginate(num)}
                  className={currentPage === num ? styles.activePage : ""}
                >
                  {num}
                </button>
              )
            )}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Sau
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FlightList;
