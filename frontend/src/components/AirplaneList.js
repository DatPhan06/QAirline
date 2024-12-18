import React from "react";
import styles from "./AirplaneList.module.css";

const AirplaneList = ({ airplanes, onAirplaneClick }) => {
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
              </tr>
            </thead>
            <tbody>
              {airplanes.map((airplane) => (
                <tr
                  key={airplane.airplane_id}
                  onClick={() => onAirplaneClick(airplane)}
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
        </>
      )}
    </div>
  );
};

export default AirplaneList;
