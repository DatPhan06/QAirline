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
          <h2 className={styles.sectionTitle}>
            DANH SÁCH MÁY BAY
            <input
              type="text"
              placeholder="Tìm kiếm máy bay..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
          </h2>

          <table className={styles.airplaneTable}>
            <thead>
              <tr>
                <th title="Model máy bay">Model</th>
                <th title="Hãng sản xuất">Nhà sản xuất</th>
                <th title="Số ghế tối đa">Sức chứa ghế</th>
                <th title="Phạm vi bay">Tầm bay (km)</th>
                <th title="Năm sản xuất máy bay">Năm sản xuất</th>
                <th title="Tình trạng bảo trì">Tình trạng bảo trì</th>
                <th title="Trạng thái hoạt động">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {currentAirplanes.map((airplane) => (
                <tr
                  key={airplane.airplane_id}
                  onClick={() => handleEditClick(airplane)}
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
            <button
              className={styles.pageButton}
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Trang trước
            </button>

            <span>
              Trang {currentPage} /{" "}
              {Math.ceil(filteredAirplanes.length / airplanesPerPage)}
            </span>

            <button
              className={styles.pageButton}
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
