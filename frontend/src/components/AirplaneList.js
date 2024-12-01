import React, { useEffect, useState } from "react";
import { getAirplanes } from "../services/airplaneService";
import styles from "./AirplaneList.module.css";

/**
 * Component hiển thị danh sách các máy bay.
 * Sử dụng hook useEffect để gọi API lấy dữ liệu máy bay khi component được render.
 */
const AirplaneList = () => {
  const [airplanes, setAirplanes] = useState([]);

  useEffect(() => {
    const fetchAirplanes = async () => {
      try {
        const data = await getAirplanes();
        setAirplanes(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu máy bay:", error);
      }
    };

    fetchAirplanes();
  }, []);

  return (
    <div className={styles.airplaneListContainer}>
      {airplanes.length === 0 ? (
        <p className={styles.noAirplanes}>Hiện tại không có máy bay nào.</p>
      ) : (
        <>
          <h2 className={styles.sectionTitle}>Danh Sách Máy Bay</h2>
          <ul className={styles.airplaneList}>
            {airplanes.map((airplane) => (
              <li key={airplane.airplane_id} className={styles.airplaneCard}>
                <span className={styles.airplaneModel}>{airplane.model}</span>
                <p className={styles.airplaneDetails}>
                  <span>Nhà sản xuất:</span> {airplane.manufacturer}
                </p>
                <p className={styles.airplaneDetails}>
                  <span>Sức chứa:</span> {airplane.seat_capacity} ghế
                </p>
                <p className={styles.airplaneDetails}>
                  <span>Tầm bay:</span> {airplane.range_km} km
                </p>
                <p className={styles.airplaneDetails}>
                  <span>Năm sản xuất:</span> {airplane.year_of_manufacture}
                </p>
                <p className={styles.airplaneDetails}>
                  <span>Trạng thái bảo trì:</span> {airplane.maintenance_status}
                </p>
                <p className={styles.airplaneDetails}>
                  <span>Trạng thái:</span> {airplane.status}
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default AirplaneList;
