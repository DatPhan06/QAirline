import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TicketSchedule.module.css";
import FlightList from "../../components/FlightList";
import FlightDetails from "../../components/FlightDetail";
import { getFlights } from "../../services/flightService";
import { getAirports } from "../../services/airportService";

const TicketSchedule = () => {
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

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

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFlight(null);
  };

  return (
    <div className={styles.container}>
      <FlightList flights={flights} onFlightClick={handleSelectFlight} />
      {isModalOpen && selectedFlight && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={handleCloseModal}>
              ×
            </button>
            <div className={styles.modalBody}>
              <FlightDetails flight={selectedFlight} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketSchedule;
