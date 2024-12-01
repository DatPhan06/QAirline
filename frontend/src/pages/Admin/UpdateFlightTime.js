import React, { useState } from "react";
import axios from "axios";
import styles from "./Admin.module.css";

const UpdateFlightTime = () => {
  const [flightId, setFlightId] = useState("");
  const [newDepartureTime, setNewDepartureTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/flights/${flightId}`, {
        departureTime: newDepartureTime,
      });
      alert("Flight departure time updated successfully!");
    } catch (error) {
      console.error("Error updating flight departure time:", error);
    }
  };

  return (
    <div className={styles.adminContainer}>
      <AdminSidebar />
      <div className={styles.container}>
        <h1>Update Flight Time</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Flight ID:
            <input
              type="number"
              value={flightId}
              onChange={(e) => setFlightId(e.target.value)}
              required
            />
          </label>
          <label>
            New Departure Time:
            <input
              type="datetime-local"
              value={newDepartureTime}
              onChange={(e) => setNewDepartureTime(e.target.value)}
              required
            />
          </label>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateFlightTime;
