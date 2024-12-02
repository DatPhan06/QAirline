import React, { useState, useEffect } from "react";
import { getFlights, updateFlight } from "../../services/flightService";
import AdminSidebar from "../../components/AdminSidebar";
import styles from "./UpdateFlightTime.module.css";

const UpdateFlightTime = () => {
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [flightData, setFlightData] = useState({
    flight_number: "",
    departure_time: "",
    arrival_time: "",
    flight_duration: "",
    status: "",
    airplane_id: "",
    departure_airport_id: "",
    arrival_airport_id: "",
    available_seats: "",
    price: "",
  });

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const data = await getFlights();
        setFlights(data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, []);

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
    setFlightData({
      flight_number: flight.flight_number,
      departure_time: flight.departure_time,
      arrival_time: flight.arrival_time,
      flight_duration: flight.flight_duration,
      status: flight.status,
      airplane_id: flight.airplane_id,
      departure_airport_id: flight.departure_airport_id,
      arrival_airport_id: flight.arrival_airport_id,
      available_seats: flight.available_seats,
      price: flight.price,
    });
  };

  const handleChange = (e) => {
    setFlightData({ ...flightData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateFlight(selectedFlight.flight_id, flightData);
      alert("Flight updated successfully!");
      setSelectedFlight(null);
      setFlightData({
        flight_number: "",
        departure_time: "",
        arrival_time: "",
        flight_duration: "",
        status: "",
        airplane_id: "",
        departure_airport_id: "",
        arrival_airport_id: "",
        available_seats: "",
        price: "",
      });
      const data = await getFlights();
      setFlights(data);
    } catch (error) {
      console.error("Error updating flight:", error);
      alert("Failed to update flight. Please try again.");
    }
  };

  return (
    <div className={styles.adminContainer}>
      <AdminSidebar />
      <div className={styles.container}>
        <h1>Update Flight Time</h1>
        <div className={styles.flightList}>
          <h2>Flight List</h2>
          <ul>
            {flights.map((flight) => (
              <li
                key={flight.flight_id}
                onClick={() => handleSelectFlight(flight)}
              >
                {flight.flight_number} -{" "}
                {new Date(flight.departure_time).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
        {selectedFlight && (
          <div className={styles.formContainer}>
            <h2>Update Flight Information</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Flight Number:
                <input
                  type="text"
                  name="flight_number"
                  value={flightData.flight_number}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Departure Time:
                <input
                  type="datetime-local"
                  name="departure_time"
                  value={flightData.departure_time}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Arrival Time:
                <input
                  type="datetime-local"
                  name="arrival_time"
                  value={flightData.arrival_time}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Flight Duration:
                <input
                  type="text"
                  name="flight_duration"
                  value={flightData.flight_duration}
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
                  required
                />
              </label>
              <label>
                Airplane ID:
                <input
                  type="number"
                  name="airplane_id"
                  value={flightData.airplane_id}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Departure Airport ID:
                <input
                  type="number"
                  name="departure_airport_id"
                  value={flightData.departure_airport_id}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Arrival Airport ID:
                <input
                  type="number"
                  name="arrival_airport_id"
                  value={flightData.arrival_airport_id}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Available Seats:
                <input
                  type="number"
                  name="available_seats"
                  value={flightData.available_seats}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Price:
                <input
                  type="number"
                  name="price"
                  value={flightData.price}
                  onChange={handleChange}
                  required
                />
              </label>
              <button type="submit" className={styles.submitButton}>
                Update Flight
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateFlightTime;
