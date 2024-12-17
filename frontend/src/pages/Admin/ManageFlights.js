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
      if (selectedFlight) {
        await updateFlight(selectedFlight.flight_id, flightData);
        alert("Chuyến bay đã được cập nhật thành công!");
      } else {
        await createFlight(flightData);
        alert("Chuyến bay mới đã được thêm thành công!");
      }
      setIsModalOpen(false);
      // Cập nhật lại danh sách chuyến bay
      const updatedFlights = await getFlights();
      setFlights(updatedFlights);
    } catch (error) {
      console.error("Error submitting flight data:", error);
      alert("Cập nhật chuyến bay thất bại. Vui lòng thử lại.");
    }
  };

  const handleFlightClick = (flight) => {
    setSelectedFlight(flight);
    setFlightData({
      departure_time: flight.departure_time,
      arrival_time: flight.arrival_time,
      flight_duration: flight.flight_duration,
      status: flight.status,
      available_seats: flight.available_seats,
      price: flight.price,
    });
    setIsModalOpen(true);
  };

  const handleAddNewFlight = () => {
    setSelectedFlight(null);
    setFlightData({
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
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (window.confirm("Bạn có muốn thoát chỉnh sửa?")) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className={styles.adminContainer}>
      <div className={styles.sidebar}>
        <AdminSidebar />
      </div>
      <div className={styles.mainContent}>
        <h1>Quản lý chuyến bay</h1>
        <button className={styles.addButton} onClick={handleAddNewFlight}>
          Tạo chuyến bay mới
        </button>
        <div className={styles.listContainer}>
          <FlightList flights={flights} onFlightClick={handleFlightClick} />
        </div>
      </div>
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={handleCloseModal}>
              ×
            </button>
            <h2>
              {selectedFlight ? "Chỉnh sửa chuyến bay" : "Tạo chuyến bay mới"}
            </h2>
            <form onSubmit={handleFormSubmit} className={styles.form}>
              {selectedFlight ? (
                <>
                  <div className={styles.formGroup}>
                    <label>Thời gian khởi hành:</label>
                    <input
                      type="datetime-local"
                      name="departure_time"
                      value={flightData.departure_time}
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
                      required
                      className={styles.input}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.formGroup}>
                    <label>Số hiệu chuyến bay:</label>
                    <input
                      type="text"
                      name="flight_number"
                      value={flightData.flight_number}
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
                      required
                      className={styles.input}
                    />
                  </div>
                </>
              )}
              <button type="submit" className={styles.submitButton}>
                {selectedFlight ? "Lưu thay đổi" : "Tạo chuyến bay"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFlights;
