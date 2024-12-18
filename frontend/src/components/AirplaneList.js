import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AirplaneList.module.css";

const AirplaneList = ({ airplanes, onAirplaneClick }) => {
  const navigate = useNavigate();

  const handleEditClick = (airplane) => {
    navigate(`/admin/edit-airplane/${airplane.airplane_id}`);
  };

  return (
    <div className={styles.airplaneListContainer}>
      {airplanes.length === 0 ? (
        <p className={styles.noAirplanes}>Hiện tại không có máy bay nào.</p>
      ) : (
        <>
          <h2 className={styles.sectionTitle}>Danh Sách Máy Bay</h2>
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
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {airplanes.map((airplane) => (
                <tr key={airplane.airplane_id}>
                  <td>{airplane.model}</td>
                  <td>{airplane.manufacturer}</td>
                  <td>{airplane.seat_capacity}</td>
                  <td>{airplane.range_km}</td>
                  <td>{airplane.year_of_manufacture}</td>
                  <td>{airplane.maintenance_status}</td>
                  <td>{airplane.status}</td>
                  <td>
                    <button
                      className={styles.editButton}
                      onClick={() => handleEditClick(airplane)}
                    >
                      Chỉnh sửa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default AirplaneList;
