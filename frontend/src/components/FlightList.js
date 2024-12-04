import React from "react";
import styles from "./FlightList.module.css";

const FlightList = ({ flights }) => {
  return (
    <div className={styles.flightListContainer}>
      {flights.length === 0 ? (
        <p className={styles.noFlights}>Hiện tại không có chuyến bay nào.</p>
      ) : (
        <>
          <h2 className={styles.sectionTitle}>VUI TỪNG CHUYẾN BAY</h2>
          <ul className={styles.flightList}>
            {flights.map((flight) => (
              <li key={flight.flight_id} className={styles.flightCard}>
                <div className={styles.flightHeader}>
                  <span className={styles.flightNumber}>
                    {flight.flight_number}
                  </span>
                  <span className={styles.flightStatus}>{flight.status}</span>
                </div>
                <div className={styles.flightRow}>
                  <p className={styles.flightDetails}>
                    <span>Khởi hành:</span> {flight.departure_airport.iata_code}{" "}
                    - {new Date(flight.departure_time).toLocaleString()}
                  </p>
                  <p className={styles.flightDetails}>
                    <span>Điểm đến:</span> {flight.arrival_airport.iata_code} -{" "}
                    {new Date(flight.arrival_time).toLocaleString()}
                  </p>
                </div>
                <div className={styles.flightRow}>
                  <p className={styles.flightDetails}>
                    <span>Thời gian bay:</span> {flight.flight_duration} phút
                  </p>
                  <p className={styles.flightDetails}>
                    <span>Giá vé:</span> {flight.price.toLocaleString()} VND
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default FlightList;
