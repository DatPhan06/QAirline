import React, { useState, useEffect } from "react";
import {
  createFlight,
  getFlights,
  updateFlightAndNotify,
} from "../../services/flightService";
import AdminSidebar from "../../components/AdminSidebar";
import { createTicketsForFlight } from "../../services/ticketService";
import FlightList from "../../components/FlightList";
import styles from "./ManageFlights.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { getAirplanes } from "../../services/airplaneService";
import { getAirports } from "../../services/airportService";
import { createNotification } from "../../services/notificationService";

/**
 * ManageFlights component for managing flight information.
 *
 * This component allows users to create, update, and view a list of flights.
 * It includes a form for adding new flights or editing existing ones, and a guide modal for instructions.
 *
 * @component
 * @example
 * return (
 *   <ManageFlights />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @function
 * @name ManageFlights
 *
 * @property {Object} flightData - The state object containing flight information.
 * @property {string} flightData.flight_number - The flight number.
 * @property {string} flightData.airplane_id - The airplane ID.
 * @property {string} flightData.departure_airport_id - The departure airport ID.
 * @property {string} flightData.arrival_airport_id - The arrival airport ID.
 * @property {string} flightData.departure_time - The departure time.
 * @property {string} flightData.arrival_time - The arrival time.
 * @property {string} flightData.flight_duration - The flight duration.
 * @property {string} flightData.status - The flight status.
 * @property {string} flightData.available_seats - The number of available seats.
 * @property {string} flightData.price - The flight price.
 *
 * @property {Array} flights - The state array containing the list of flights.
 *
 * @property {boolean} isModalOpen - The state boolean indicating if the modal is open.
 * @property {boolean} isGuideOpen - The state boolean indicating if the guide modal is open.
 *
 * @property {Object|null} selectedFlight - The state object containing the selected flight information or null if no flight is selected.
 *
 * @function handleInputChange
 * @description Handles input changes in the form and updates the flightData state.
 * @param {Object} e - The event object.
 *
 * @function handleFormSubmit
 * @description Handles form submission for creating or updating a flight.
 * @param {Object} e - The event object.
 *
 * @function handleFlightClick
 * @description Handles the click event on a flight to edit it.
 * @param {Object} flight - The flight object.
 *
 * @function handleAddNewFlight
 * @description Handles the event to add a new flight.
 *
 * @function handleCloseModal
 * @description Handles the event to close the modal.
 *
 * @function toggleGuide
 * @description Toggles the guide modal.
 *
 * @requires getFlights - Function to fetch the list of flights.
 * @requires createFlight - Function to create a new flight.
 * @requires updateFlightAndNotify - Function to update an existing flight and notify users.
 * @requires AdminSidebar - Component for the admin sidebar.
 * @requires FlightList - Component for displaying the list of flights.
 * @requires FontAwesomeIcon - Component for displaying font awesome icons.
 * @requires faQuestionCircle - Font awesome question circle icon.
 * @requires styles - CSS module for styling the component.
 */
const ManageFlights = () => {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [airplanes, setAirplanes] = useState([]);
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

  const [airports, setAirports] = useState([]);

  // Add useEffect to fetch airports
  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await getAirports();
        setAirports(response);
      } catch (error) {
        console.error("Error fetching airports:", error);
      }
    };
    fetchAirports();
  }, []);

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

  // Function to calculate flight duration
  const calculateFlightDuration = (departureTime, arrivalTime) => {
    if (!departureTime || !arrivalTime) return "";

    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);

    if (arrival < departure) {
      alert("Thời gian đến không thể sớm hơn thời gian khởi hành!");
      return "";
    }

    const diffMs = arrival - departure;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    // Format as string "HH:MM:00"
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:00`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFlightData((prevData) => {
      const newData = { ...prevData, [name]: value };

      // Automatically update flight duration when departure or arrival time changes
      if (name === "departure_time" || name === "arrival_time") {
        if (newData.departure_time && newData.arrival_time) {
          newData.flight_duration = calculateFlightDuration(
            newData.departure_time,
            newData.arrival_time
          );
        }
      }

      return newData;
    });
  };

  useEffect(() => {
    const fetchAirplanes = async () => {
      try {
        const response = await getAirplanes();
        setAirplanes(response);
      } catch (error) {
        console.error("Error fetching airplanes:", error);
      }
    };

    fetchAirplanes();
  }, []);

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
        await updateFlightAndNotify(selectedFlight.flight_id, updatedFields);
        alert("Cập nhật chuyến bay thành công!");
      } else {
        // Create new flight
        const newFlight = await createFlight(flightData);
        await createTicketsForFlight(newFlight.flight_id);
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
                    <label>Thời gian bay:</label>
                    <input
                      type="text"
                      name="flight_duration"
                      value={flightData.flight_duration}
                      readOnly
                      className={`${styles.input} ${styles.readOnly}`}
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
                    <label>Chọn máy bay:</label>
                    <select
                      name="airplane_id"
                      value={flightData.airplane_id}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Airplane</option>
                      {airplanes.map((airplane) => (
                        <option
                          key={airplane.airplane_id}
                          value={airplane.airplane_id}
                        >
                          {airplane.model}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Sân bay khởi hành:</label>
                    <select
                      name="departure_airport_id"
                      value={flightData.departure_airport_id}
                      onChange={handleInputChange}
                      required
                      className={styles.input}
                    >
                      <option value="">Chọn sân bay khởi hành</option>
                      {airports.map((airport) => (
                        <option
                          key={airport.airport_id}
                          value={airport.airport_id}
                        >
                          {airport.name} ({airport.iata_code})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Sân bay đến:</label>
                    <select
                      name="arrival_airport_id"
                      value={flightData.arrival_airport_id}
                      onChange={handleInputChange}
                      required
                      className={styles.input}
                    >
                      <option value="">Chọn sân bay đến</option>
                      {airports.map((airport) => (
                        <option
                          key={airport.airport_id}
                          value={airport.airport_id}
                        >
                          {airport.name} ({airport.iata_code})
                        </option>
                      ))}
                    </select>
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
                    <label>Thời gian bay:</label>
                    <input
                      type="text"
                      name="flight_duration"
                      value={flightData.flight_duration}
                      readOnly
                      className={`${styles.input} ${styles.readOnly}`}
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
