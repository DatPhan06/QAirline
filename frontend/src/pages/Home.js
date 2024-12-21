import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import FlightSearch from "../components/FlightSearch";
import FlightList from "../components/FlightList";
import Slideshow from "../components/SlideShow";
import { getFlights } from "../services/flightService";

/**
 * Home component renders the main page of the QAirline application.
 * It includes a slideshow, a list of flights, a modal for flight details,
 * a flight search component, an email signup form, and a list of popular destinations.
 *
 * @component
 * @returns {JSX.Element} The rendered Home component.
 *
 * @example
 * return (
 *   <Home />
 * )
 *
 * @function
 * @name Home
 *
 * @description
 * - Fetches flight data on component mount using useEffect.
 * - Manages state for flights, selected flight, and modal visibility using useState.
 * - Handles flight selection and modal close actions.
 *
 * @property {Array} slideshowImages - Array of image paths for the slideshow.
 * @property {Array} popularDestinations - Array of popular destination objects with id, name, and image.
 *
 * @property {function} handleFlightClick - Handles the selection of a flight and opens the modal.
 * @property {function} handleCloseModal - Closes the modal and resets the selected flight.
 */
const Home = () => {
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const flightsData = await getFlights();
        setFlights(flightsData);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, []);

  const slideshowImages = [
    "/images/tlan.png",
    "/images/danang.png",
    "/images/bali.png",
  ];

  const popularDestinations = [
    {
      id: 1,
      name: "Hà Nội",
      image: "/images/hanoi.jpeg",
    },
    {
      id: 2,
      name: "Tokyo",
      image: "/images/tokyo.jpeg",
    },
  ];

  // Handle flight selection
  const handleFlightClick = (flight) => {
    setSelectedFlight(flight);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setSelectedFlight(null);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.containerAll}>
      <div className={styles.homeContainer}>
        <div className={styles.leftSection}>
          <Slideshow images={slideshowImages} />
          <div className={styles.hashtagBar}>
            <span>#QAirline</span>
            <span>#FlyHigh</span>
            <span>#TravelWithUs</span>
            <span>#QualityService</span>
            <span>#SafetyFirst</span>
          </div>
          <FlightList flights={flights} onFlightClick={handleFlightClick} />{" "}
          {/* Modal for flight details */}
          {isModalOpen && selectedFlight && (
            <div className={styles.modalOverlay} onClick={handleCloseModal}>
              <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className={styles.closeButton}
                  onClick={handleCloseModal}
                >
                  ×
                </button>
                <div className={styles.flightDetails}>
                  <h3>Chi tiết chuyến bay</h3>

                  <div className={styles.flightInfo}>
                    <p>
                      <strong>Số hiệu:</strong> {selectedFlight.flight_number}
                    </p>
                    <p>
                      <strong>Điểm khởi hành:</strong>{" "}
                      {selectedFlight.departure_airport.name}
                    </p>
                    <p>
                      <strong>Thời gian khởi hành:</strong>{" "}
                      {new Date(selectedFlight.departure_time).toLocaleString()}
                    </p>
                  </div>

                  <div className={styles.flightInfo}>
                    <p>
                      <strong>Máy bay:</strong> {selectedFlight.airplane.model}
                    </p>
                    <p>
                      <strong>Điểm đến:</strong>{" "}
                      {selectedFlight.arrival_airport.name}
                    </p>
                    <p>
                      <strong>Thời gian đến:</strong>{" "}
                      {new Date(selectedFlight.arrival_time).toLocaleString()}
                    </p>
                  </div>

                  <div className={styles.flightStatus}>
                    <p>Trạng thái: {selectedFlight.status}</p>
                    <p>Số ghế trống: {selectedFlight.available_seats}</p>
                  </div>

                  <div className={styles.flightPrice}>
                    Giá vé: {selectedFlight.price.toLocaleString()} VND
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.rightSection}>
          <FlightSearch />
          <div className={styles.emailSignup}>
            <h3>Đăng ký nhận thông tin</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Nhập email của bạn" />
              <button type="submit">Đăng ký</button>
            </form>
          </div>

          <div className={styles.popularDestinations}>
            <h3>Điểm đến phổ biến</h3>
            <div className={styles.destinationList}>
              {popularDestinations.map((dest) => (
                <div key={dest.id} className={styles.destinationItem}>
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className={styles.destinationImage}
                  />
                  <div className={styles.destinationInfo}>
                    <h4>{dest.name}</h4>
                  </div>
                </div>
              ))}
            </div>
            <button className={styles.viewAllButton}>
              Xem tất cả điểm đến
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
