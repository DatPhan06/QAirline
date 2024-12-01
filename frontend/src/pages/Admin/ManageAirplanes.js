import React, { useState } from "react";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";
import styles from "./Admin.module.css";

const ManageFlights = () => {
  const [flightData, setFlightData] = useState({
    flightNumber: "",
    airplaneId: "",
    departureAirportId: "",
    arrivalAirportId: "",
    departureTime: "",
    arrivalTime: "",
    status: "",
  });

  const handleChange = (e) => {
    setFlightData({ ...flightData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/flights", flightData);
      alert("Flight data submitted successfully!");
    } catch (error) {
      console.error("Error submitting flight data:", error);
    }
  };

  return (
    <div className={styles.adminContainer}>
      <AdminSidebar />
      <div className={styles.content}>
        <h1>Manage Flights</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Flight Number:
            <input
              type="text"
              name="flightNumber"
              value={flightData.flightNumber}
              onChange={handleChange}
              required
            />
          </label>
          {/* Add other input fields here */}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ManageFlights;
