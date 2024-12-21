import React, { useState, useEffect } from "react";
import styles from "./FlightList.module.css";

// FlightList.js
const FlightList = ({ flights, onFlightClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const flightsPerPage = 10;

  const today = new Date();

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredFlights = flights.filter(
    (flight) => new Date(flight.departure_time) >= today
  );

  // Hàm xử lý thay đổi trong input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Lọc danh sách flights theo searchTerm
  const filteredFlightsSearch = flights.filter((filteredFlights) =>
    filteredFlights.flight_number
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Tính toán các chuyến bay hiển thị trên trang hiện tại
  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = filteredFlightsSearch.slice(
    indexOfFirstFlight,
    indexOfLastFlight
  );

  // Số trang tổng cộng
  const totalPages = Math.ceil(filteredFlightsSearch.length / flightsPerPage);

  // Xác định số lượng link hiển thị tối đa
  const maxPageLinks = 8;

  const generatePageNumbers = (current, total, maxLinks) => {
    if (total <= maxLinks) {
      // Nếu tổng số trang nhỏ hơn hoặc bằng maxLinks, hiển thị tất cả các trang
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    // Luôn hiển thị trang đầu, trang cuối và các trang xung quanh trang hiện tại
    let pages = [1];

    let start = Math.max(2, current - Math.floor((maxLinks - 4) / 2));
    let end = Math.min(total - 1, start + maxLinks - 4);

    // Điều chỉnh start nếu end đã ở gần cuối
    if (end === total - 1) {
      start = Math.max(2, end - (maxLinks - 4));
    }

    // Thêm dấu ... nếu cần
    if (start > 2) {
      pages.push("...");
    }

    // Thêm các trang ở giữa
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Thêm dấu ... cuối nếu cần
    if (end < total - 1) {
      pages.push("...");
    }

    // Thêm trang cuối
    if (total > 1) {
      pages.push(total);
    }

    return pages;
  };

  const handlePageChange = (pageNumber) => {
    // Kiểm tra số trang hợp lệ trước khi cập nhật
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

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
          <h2 className={styles.sectionTitle}>
            DANH SÁCH CHUYẾN BAY
            <input
              type="text"
              placeholder="Tìm kiếm chuyến bay..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </h2>

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
              className={styles.pageButton}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Trang trước{" "}
            </button>

            {pageNumbers.map((pageNum, index) => (
              <button
                key={`${pageNum}-${index}`}
                className={`${styles.pageButton} ${
                  pageNum === currentPage ? styles.active : ""
                }`}
                onClick={() =>
                  pageNum !== "..." ? handlePageChange(pageNum) : null
                }
                disabled={pageNum === "..."}
              >
                {pageNum}
              </button>
            ))}

            <button
              className={styles.pageButton}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Trang sau{" "}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FlightList;
