import React, { useState, useEffect } from "react";
import {
  createFlight,
  getFlights,
  updateFlight,
} from "../../services/flightService";
import AdminSidebar from "../../components/AdminSidebar";
import FlightList from "../../components/FlightList";
import styles from "./ManageFlights.module.css";

const ManageFlights = () => {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleInputChange = (e) => {
    setFlightData({ ...flightData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateFlight(selectedFlight.flight_id, flightData);
      alert("Chuyến bay đã được cập nhật thành công!");
      setIsModalOpen(false);
      // Cập nhật lại danh sách chuyến bay
      const updatedFlights = await getFlights();
      setFlights(updatedFlights);
    } catch (error) {
      console.error("Error updating flight:", error);
      alert("Cập nhật chuyến bay thất bại. Vui lòng thử lại.");
    }
  };

  const handleFlightClick = (flight) => {
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
    setIsModalOpen(true);
  };

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
          <h1>Quản lý chuyến bay</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Số hiệu chuyến bay:</label>
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
              <label>ID máy bay:</label>
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
              <label>ID sân bay đi:</label>
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
              <label>ID sân bay đến:</label>
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
              <label>Thời gian khởi hành:</label>
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
              <label>Thời gian đến:</label>
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
              <label>Thời gian bay (HH:MM:SS):</label>
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
              <label>Trạng thái:</label>
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
              <label>Số ghế trống:</label>
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
              <label>Giá vé:</label>
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
              Gửi
            </button>
          </form>
        </div>
        <div className={styles.listContainer}>
          <FlightList flights={flights} onFlightClick={handleFlightClick} />
        </div>
      </div>
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button
              className={styles.closeButton}
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            <h2>Chỉnh sửa chuyến bay</h2>
            <form onSubmit={handleFormSubmit}>
              <label>
                Departure Time:
                <input
                  type="datetime-local"
                  name="departure_time"
                  value={flightData.departure_time}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Arrival Time:
                <input
                  type="datetime-local"
                  name="arrival_time"
                  value={flightData.arrival_time}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Flight Duration:
                <input
                  type="text"
                  name="flight_duration"
                  value={flightData.flight_duration}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Status:
                <input
                  type="text"
                  name="status"
                  value={flightData.status}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Available Seats:
                <input
                  type="number"
                  name="available_seats"
                  value={flightData.available_seats}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Price:
                <input
                  type="number"
                  name="price"
                  value={flightData.price}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <button type="submit" className={styles.submitButton}>
                Lưu thay đổi
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFlights;
