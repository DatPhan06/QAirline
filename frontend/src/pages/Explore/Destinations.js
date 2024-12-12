import React, { useEffect, useState } from "react";
import { getLocations } from "../../services/locationService";
import styles from "./Destinations.module.css"; 

const Destinations = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getLocations();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
        setError("Không thể tải thông tin điểm đến");
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  if (loading) return <div>Đang tải thông tin điểm đến...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.destinationsContainer}>
      <h1 className={styles.title}>Điểm Đến</h1>
      <div className={styles.locationsGrid}>
        {locations.map(location => (
          <div key={location.location_id} className={styles.locationCard}>
            <h2>{location.city}</h2>
            <p className={styles.country}>{location.country}</p>
            <div className={styles.locationDetails}>
              <p>{location.screen}</p>
              <p><strong>Ẩm thực:</strong> {location.food}</p>
              <p><strong>Hoạt động:</strong> {location.activity}</p>
              <p><strong>Trải nghiệm:</strong> {location.experience}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;