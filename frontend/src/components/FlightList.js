import React, { useEffect, useState } from "react";
import { getFlights } from "../services/api";
import styles from "./FlightList.module.css";

/**
 * Component hiển thị danh sách các chuyến bay.
 * Sử dụng hook useEffect để gọi API lấy dữ liệu chuyến bay khi component được render.
 */
/**
 * FlightList là một component React hiển thị danh sách các chuyến bay.
 *
 * Component này sử dụng hook useState để quản lý state flights, chứa danh sách các chuyến bay.
 *
 * useEffect được sử dụng để gọi hàm fetchFlights khi component được mount. Hàm fetchFlights gọi API để lấy dữ liệu chuyến bay và cập nhật state flights.
 *
 * @component
 * @example
 * return (
 *   <FlightList />
 * )
 */
const FlightList = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const data = await getFlights();
        setFlights(data.slice(0, 3)); // Lấy 3 chuyến bay đầu tiên
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu chuyến bay:", error);
      }
    };

    fetchFlights();
  }, []);

  return (
    <div className={styles.flightListContainer}>
      {flights.length === 0 ? (
        <p className={styles.noFlights}>Hiện tại không có chuyến bay nào.</p>
      ) : (
        <ul className={styles.flightList}>
          {flights.map((flight) => (
            <li key={flight.flight_id} className={styles.flightCard}>
              <span className={styles.flightNumber}>
                {flight.flight_number}
              </span>
              <p className={styles.flightDetails}>
                <span>Departure:</span> {flight.departure_airport}
              </p>
              <p className={styles.flightDetails}>
                <span>Destination:</span> {flight.arrival_airport}
              </p>
              <p className={styles.flightDetails}>
                <span>Duration:</span> {flight.flight_duration} minutes
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FlightList;
