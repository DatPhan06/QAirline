import React, { useEffect, useState } from "react";
import { getLocations } from "../../services/locationService";
import styles from "./Destinations.module.css"; 

const Destinations = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getLocations();
        setLocations(data);
        if (data.length > 0) {
          setSelectedLocation(data[0]); // Select first location by default
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
        setError("Không thể tải thông tin điểm đến");
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  if (loading) return <div className={styles.loading}>Đang tải thông tin điểm đến...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.destinationsContainer}>
      <h1 className={styles.title}>Khám phá các điểm đến hấp dẫn</h1>
      
      {/* Navigation bar */}
      <div className={styles.navigationBar}>
        {locations.map((location) => (
          <button
            key={location.location_id}
            className={`${styles.navButton} ${selectedLocation?.location_id === location.location_id ? styles.active : ''}`}
            onClick={() => setSelectedLocation(location)}
          >
            {location.city}
          </button>
        ))}
      </div>

      {/* Location details */}
      {selectedLocation && (
        <div className={styles.locationDetails}>
          <h2 className={styles.locationTitle}>
            {selectedLocation.city}, {selectedLocation.country}
          </h2>
          
          <table className={styles.detailsTable}>
            <tbody>
              <tr>
                <th>Ẩm thực đặc trưng</th>
                <td>{selectedLocation.food}</td>
              </tr>
              <tr>
                <th>Hoạt động du lịch</th>
                <td>{selectedLocation.activity}</td>
              </tr>
              <tr>
                <th>Trải nghiệm văn hóa</th>
                <td>{selectedLocation.experience}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Destinations;