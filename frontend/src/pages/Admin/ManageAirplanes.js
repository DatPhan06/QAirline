import React, { useState } from "react";
import axios from "axios";
import styles from "./Admin.module.css";

const ManageAirplanes = () => {
  const [airplaneData, setAirplaneData] = useState({
    model: "",
    manufacturer: "",
    seatCapacity: "",
    rangeKm: "",
    yearOfManufacture: "",
    maintenanceStatus: "",
    status: "",
  });

  const handleChange = (e) => {
    setAirplaneData({ ...airplaneData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/airplanes", airplaneData);
      alert("Airplane data submitted successfully!");
    } catch (error) {
      console.error("Error submitting airplane data:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Manage Airplanes</h1>
      <form onSubmit={handleSubmit}>
        {/* Add input fields for each airplane data attribute */}
        <label>
          Model:
          <input
            type="text"
            name="model"
            value={airplaneData.model}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Manufacturer:
          <input
            type="text"
            name="manufacturer"
            value={airplaneData.manufacturer}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Seat Capacity:
          <input
            type="number"
            name="seatCapacity"
            value={airplaneData.seatCapacity}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Range (km):
          <input
            type="number"
            name="rangeKm"
            value={airplaneData.rangeKm}
            onChange={handleChange}
          />
        </label>
        <label>
          Year of Manufacture:
          <input
            type="number"
            name="yearOfManufacture"
            value={airplaneData.yearOfManufacture}
            onChange={handleChange}
          />
        </label>
        <label>
          Maintenance Status:
          <input
            type="text"
            name="maintenanceStatus"
            value={airplaneData.maintenanceStatus}
            onChange={handleChange}
          />
        </label>
        <label>
          Status:
          <input
            type="text"
            name="status"
            value={airplaneData.status}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ManageAirplanes;
