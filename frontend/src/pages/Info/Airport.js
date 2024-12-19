import React, { useState, useEffect } from "react";
import { getAirports } from "../../services/airportService";
import styles from "./Airport.module.css";

const Airport = () => {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const data = await getAirports();
        setAirports(data);
        setLoading(false);
      } catch (err) {
        setError("Không thể tải thông tin sân bay");
        setLoading(false);
      }
    };

    fetchAirports();
  }, []);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.airportContainer}>
      <h1 className={styles.title}>Danh Sách Sân Bay</h1>
      <div className={styles.airportGrid}>
        {airports.map((airport) => (
          <div key={airport.airport_id} className={styles.airportCard}>
            <h2>{airport.name}</h2>
            <div className={styles.airportInfo}>
              <p><strong>Thành phố:</strong> {airport.city}</p>
              <p><strong>Quốc gia:</strong> {airport.country}</p>
              <p><strong>Mã IATA:</strong> {airport.iata_code}</p>
              <p><strong>Mã ICAO:</strong> {airport.icao_code}</p>
                <p><strong>Thông tin chung:</strong> {airport.general_info}</p>
              {airport.check_in_counters && (
                <p><strong>Quầy check-in:</strong> {airport.check_in_counters}</p>
              )}
              {airport.shopping_services && (
                <p><strong>Dịch vụ mua sắm:</strong> {airport.shopping_services}</p>
              )}
              {airport.lounge_services && (
                <p><strong>Phòng chờ:</strong> {airport.lounge_services}</p>
              )}
              {airport.food_services && (
                <p><strong>Dịch vụ ăn uống:</strong> {airport.food_services}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Airport;