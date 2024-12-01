import React, { useState } from "react";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";
import FlightList from "../../components/FlightList";
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
      <div className={styles.container}>
        <h1>Manage Flights</h1>
        <form onSubmit={handleSubmit}>
          {/* Add input fields for each flight data attribute */}
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
          <label>
            Airplane ID:
            <input
              type="number"
              name="airplaneId"
              value={flightData.airplaneId}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Departure Airport ID:
            <input
              type="number"
              name="departureAirportId"
              value={flightData.departureAirportId}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Arrival Airport ID:
            <input
              type="number"
              name="arrivalAirportId"
              value={flightData.arrivalAirportId}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Departure Time:
            <input
              type="datetime-local"
              name="departureTime"
              value={flightData.departureTime}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Arrival Time:
            <input
              type="datetime-local"
              name="arrivalTime"
              value={flightData.arrivalTime}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Status:
            <input
              type="text"
              name="status"
              value={flightData.status}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        <FlightList />
      </div>
    </div>
  );
};

export default ManageFlights;
