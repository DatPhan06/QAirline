import React, { useState, useEffect } from "react";
import { createFlight, getFlights } from "../../services/flightService";
import AdminSidebar from "../../components/AdminSidebar";
import FlightList from "../../components/FlightList";
import styles from "./Admin.module.css";

const ManageFlights = () => {
  const [flightData, setFlightData] = useState({
    flight_number: "",
    airplane_id: "",
    departure_airport_id: "",
    arrival_airport_id: "",
    departure_time: "",
    arrival_time: "",
    flight_duration: "",
    status: "",
    available_seats: "",
    price: "",
  });

  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await getFlights();
        setFlights(response);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, []);

  const handleChange = (e) => {
    setFlightData({ ...flightData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createFlight(flightData);
      alert("Flight data submitted successfully!");
      // Fetch the updated list of flights
      const response = await getFlights();
      setFlights(response);
    } catch (error) {
      console.error("Error submitting flight data:", error);
    }
  };

  return (
    <div className={styles.adminContainer}>
      <div className={styles.sidebar}>
        <AdminSidebar />
      </div>
      <div className={styles.mainContent}>
        <div className={styles.formContainer}>
          <h1>Manage Flights</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Flight Number:</label>
              <input
                type="text"
                name="flight_number"
                value={flightData.flight_number}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Airplane ID:</label>
              <input
                type="number"
                name="airplane_id"
                value={flightData.airplane_id}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Departure Airport ID:</label>
              <input
                type="number"
                name="departure_airport_id"
                value={flightData.departure_airport_id}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Arrival Airport ID:</label>
              <input
                type="number"
                name="arrival_airport_id"
                value={flightData.arrival_airport_id}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Departure Time:</label>
              <input
                type="datetime-local"
                name="departure_time"
                value={flightData.departure_time}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Arrival Time:</label>
              <input
                type="datetime-local"
                name="arrival_time"
                value={flightData.arrival_time}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Flight Duration (HH:MM:SS):</label>
              <input
                type="text"
                name="flight_duration"
                value={flightData.flight_duration}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Status:</label>
              <input
                type="text"
                name="status"
                value={flightData.status}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Available Seats:</label>
              <input
                type="number"
                name="available_seats"
                value={flightData.available_seats}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Price:</label>
              <input
                type="number"
                name="price"
                value={flightData.price}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </form>
        </div>
        <div className={styles.listContainer}>
          <FlightList flights={flights} onFlightClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default ManageFlights;
