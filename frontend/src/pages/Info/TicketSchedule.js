import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styles from './TicketSchedule.module.css';
import FlightList from '../../components/FlightList';
import FlightDetails from '../../components/FlightDetail';
import { getFlights } from "../../services/flightService";
import { getAirports } from "../../services/airportService";

const TicketSchedule = () => {
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);

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
  };

  return (
    <div className={styles.container}>
      <FlightList flights={flights} onFlightClick={handleSelectFlight} />
      {selectedFlight && <FlightDetails flight={selectedFlight}  className = {styles.detail}/>}
    </div>
  );
};

export default TicketSchedule;