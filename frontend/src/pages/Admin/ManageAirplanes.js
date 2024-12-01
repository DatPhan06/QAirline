import React, { useState } from "react";
import { createAdmin } from "../../services/adminService";
import AdminSidebar from "../../components/AdminSidebar";
import styles from "./Admin.module.css";

const ManageAirplanes = () => {
  const [airplaneData, setAirplaneData] = useState({
    airplaneId: "",
    model: "",
    capacity: "",
  });

  const handleChange = (e) => {
    setAirplaneData({ ...airplaneData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAdmin(airplaneData);
      alert("Airplane data submitted successfully!");
    } catch (error) {
      console.error("Error submitting airplane data:", error);
    }
  };

  return (
    <div className={styles.adminContainer}>
      <AdminSidebar />
      <div className={styles.container}>
        <h1>Manage Airplanes</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Airplane ID:
            <input
              type="text"
              name="airplaneId"
              value={airplaneData.airplaneId}
              onChange={handleChange}
              required
            />
          </label>
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
            Capacity:
            <input
              type="number"
              name="capacity"
              value={airplaneData.capacity}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ManageAirplanes;
