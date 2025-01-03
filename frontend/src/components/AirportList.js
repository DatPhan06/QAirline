import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AirportList.module.css";

/**
 * AirportList component renders a list of airports with pagination and search functionality.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.airports - The list of airports to display.
 * @param {Function} props.onAirportClick - Callback function to handle airport click events.
 *
 * @returns {JSX.Element} The rendered AirportList component.
 */
const AirportList = ({ airports, onAirportClick }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAirport, setSelectedAirport] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const airportsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");

  const handleEditClick = (airport) => {
    setSelectedAirport(airport);
    setShowModal(true);
    if (onAirportClick) {
      onAirportClick(airport);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAirport(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredAirports = airports.filter(
    (airport) =>
      airport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      airport.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      airport.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastAirport = currentPage * airportsPerPage;
  const indexOfFirstAirport = indexOfLastAirport - airportsPerPage;
  const currentAirports = filteredAirports.slice(
    indexOfFirstAirport,
    indexOfLastAirport
  );

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredAirports.length / airportsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.airportListContainer}>
      {airports.length === 0 ? (
        <p className={styles.noAirports}>Hiện tại không có sân bay nào.</p>
      ) : (
        <>
          <h2 className={styles.sectionTitle}>Danh Sách Sân Bay</h2>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Tìm kiếm sân bay..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
          </div>
          <table className={styles.airportTable}>
            <thead>
              <tr>
                <th>Tên</th>
                <th>Thành phố</th>
                <th>Quốc gia</th>
                <th>Mã IATA</th>
                <th>Mã ICAO</th>
              </tr>
            </thead>
            <tbody>
              {currentAirports.map((airport) => (
                <tr
                  key={airport.airport_id}
                  onClick={() => handleEditClick(airport)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{airport.name}</td>
                  <td>{airport.city}</td>
                  <td>{airport.country}</td>
                  <td>{airport.iata_code}</td>
                  <td>{airport.icao_code}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.pagination}>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Trang trước
            </button>
            <span>
              Trang {currentPage} /{" "}
              {Math.ceil(filteredAirports.length / airportsPerPage)}
            </span>
            <button
              onClick={handleNextPage}
              disabled={
                currentPage ===
                Math.ceil(filteredAirports.length / airportsPerPage)
              }
            >
              Trang sau
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AirportList;
