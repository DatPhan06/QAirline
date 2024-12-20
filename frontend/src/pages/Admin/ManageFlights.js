import React, { useState, useEffect } from "react";
import {
  createFlight,
  getFlights,
  updateFlight,
} from "../../services/flightService";
import AdminSidebar from "../../components/AdminSidebar";
import { createTicketsForFlight } from "../../services/ticketService";
import FlightList from "../../components/FlightList";
import styles from "./ManageFlights.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { createNotification } from "../../services/notificationService";

const ManageFlights = () => {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
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
        // Update existing flight
        const updatedFields = {};
        for (const key in flightData) {
          if (flightData[key] !== selectedFlight[key]) {
            updatedFields[key] = flightData[key];
          } else {
            updatedFields[key] = selectedFlight[key];
          }
        }
        await updateFlight(selectedFlight.flight_id, updatedFields);
        alert("Cập nhật chuyến bay thành công!");
      } else {
        // Create new flight
        await createFlight(flightData);
        alert("Tạo chuyến bay mới thành công!");
      }
      setIsModalOpen(false);
      // Refresh flight list
      const response = await getFlights();
      setFlights(response);
    } catch (error) {
      console.error("Error saving flight:", error);
      alert("Đã xảy ra lỗi khi lưu chuyến bay.");
    }
  };

  const handleFlightClick = (flight) => {
    setSelectedFlight(flight);
    setFlightData({
      flight_number: flight.flight_number,
      airplane_id: flight.airplane_id,
      departure_airport_id: flight.departure_airport_id,
      arrival_airport_id: flight.arrival_airport_id,
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

  // Add toggle function for guide
  const toggleGuide = () => {
    setIsGuideOpen(!isGuideOpen);
  };

  return (
    <div className={styles.adminContainer}>
      <div className={styles.sidebar}>
        <AdminSidebar />
      </div>
      <div className={styles.mainContent}>
        <h1>
          Quản lý chuyến bay
          <button className={styles.guideButton} onClick={toggleGuide}>
            <FontAwesomeIcon icon={faQuestionCircle} />
          </button>
        </h1>

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

      {/* Guide Modal */}
      {isGuideOpen && (
        <div className={styles.modalOverlay} onClick={toggleGuide}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={toggleGuide}>
              ×
            </button>
            <div className={styles.guide}>
              <h2>Hướng dẫn sử dụng trang</h2>
              <p>
                Quản lý chuyến bay cho phép bạn thêm, sửa và xem danh sách các
                chuyến bay. Dưới đây là các chức năng chính:
              </p>
              <ul>
                <li>
                  <strong>Tạo chuyến bay mới:</strong>
                  <ul>
                    <li>Nhấn vào nút "Tạo chuyến bay mới"</li>
                    <li>Điền đầy đủ thông tin chuyến bay</li>
                    <li>Số hiệu chuyến bay phải là duy nhất</li>
                    <li>ID máy bay phải tồn tại trong hệ thống</li>
                    <li>ID sân bay đi/đến phải hợp lệ</li>
                    <li>Thời gian khởi hành phải sau thời điểm hiện tại</li>
                  </ul>
                </li>
                <li>
                  <strong>Chỉnh sửa chuyến bay:</strong>
                  <ul>
                    <li>Nhấn vào chuyến bay trong danh sách để chỉnh sửa</li>
                    <li>Có thể cập nhật thời gian, trạng thái, giá vé</li>
                    <li>Số ghế trống sẽ tự động cập nhật theo đặt vé</li>
                  </ul>
                </li>
                <li>
                  <strong>Quản lý trạng thái:</strong>
                  <ul>
                    <li>Scheduled: Chuyến bay đã lên lịch</li>
                    <li>Delayed: Chuyến bay bị trễ</li>
                    <li>Cancelled: Chuyến bay bị hủy</li>
                    <li>Completed: Chuyến bay đã hoàn thành</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFlights;
