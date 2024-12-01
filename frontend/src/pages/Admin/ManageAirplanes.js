import React, { useState } from "react";
import { createAirplane } from "../../services/airplaneService";
import AdminSidebar from "../../components/AdminSidebar";
import AirplaneList from "../../components/AirplaneList";
import styles from "./Admin.module.css";

const ManageAirplanes = () => {
  const [airplaneData, setAirplaneData] = useState({
    model: "",
    manufacturer: "",
    seat_capacity: "",
    range_km: "",
    year_of_manufacture: "",
    maintenance_status: "",
    status: "",
  });

  const handleChange = (e) => {
    setAirplaneData({ ...airplaneData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAirplane(airplaneData);
      alert("Airplane data submitted successfully!");
    } catch (error) {
      console.error("Error submitting airplane data:", error);
    }
  };

  return (
    <div className={styles.adminContainer}>
      <div className={styles.sidebar}>
        <AdminSidebar />
      </div>
      <div className={styles.mainContent}>
        <div className={styles.formContainer}>
          <h1>Manage Airplanes</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Model:</label>
              <input
                type="text"
                name="model"
                value={airplaneData.model}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Manufacturer:</label>
              <input
                type="text"
                name="manufacturer"
                value={airplaneData.manufacturer}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Seat Capacity:</label>
              <input
                type="number"
                name="seat_capacity"
                value={airplaneData.seat_capacity}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Range (km):</label>
              <input
                type="number"
                name="range_km"
                value={airplaneData.range_km}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Year of Manufacture:</label>
              <input
                type="number"
                name="year_of_manufacture"
                value={airplaneData.year_of_manufacture}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Maintenance Status:</label>
              <input
                type="text"
                name="maintenance_status"
                value={airplaneData.maintenance_status}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Status:</label>
              <input
                type="text"
                name="status"
                value={airplaneData.status}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </form>
        </div>
        <div className={styles.listContainer}>
          <AirplaneList />
        </div>
      </div>
    </div>
  );
};

export default ManageAirplanes;
