import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AirplaneList.module.css";

const AirplaneList = ({ airplanes, onAirplaneClick }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const airplanesPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");

  const handleEditClick = (airplane) => {
    navigate(`/admin/edit-airplane/${airplane.airplane_id}`);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when search term changes
  };

  // Filter airplanes based on search term
  const filteredAirplanes = airplanes.filter(
    (airplane) =>
      airplane.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      airplane.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      airplane.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the airplanes to display on the current page
  const indexOfLastAirplane = currentPage * airplanesPerPage;
  const indexOfFirstAirplane = indexOfLastAirplane - airplanesPerPage;
  const currentAirplanes = filteredAirplanes.slice(
    indexOfFirstAirplane,
    indexOfLastAirplane
  );

  // Handle page change
  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredAirplanes.length / airplanesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.airplaneListContainer}>
      {airplanes.length === 0 ? (
        <p className={styles.noAirplanes}>Hiện tại không có máy bay nào.</p>
      ) : (
        <>
          <h2 className={styles.sectionTitle}>Danh Sách Máy Bay</h2>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Tìm kiếm máy bay..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
          </div>
          <table className={styles.airplaneTable}>
            <thead>
              <tr>
                <th>Model</th>
                <th>Nhà sản xuất</th>
                <th>Sức chứa ghế</th>
                <th>Tầm bay (km)</th>
                <th>Năm sản xuất</th>
                <th>Tình trạng bảo trì</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {currentAirplanes.map((airplane) => (
                <tr
                  key={airplane.airplane_id}
                  onClick={() => handleEditClick(airplane)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{airplane.model}</td>
                  <td>{airplane.manufacturer}</td>
                  <td>{airplane.seat_capacity}</td>
                  <td>{airplane.range_km}</td>
                  <td>{airplane.year_of_manufacture}</td>
                  <td>{airplane.maintenance_status}</td>
                  <td>{airplane.status}</td>
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
              {Math.ceil(filteredAirplanes.length / airplanesPerPage)}
            </span>
            <button
              onClick={handleNextPage}
              disabled={
                currentPage ===
                Math.ceil(filteredAirplanes.length / airplanesPerPage)
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

export default AirplaneList;
