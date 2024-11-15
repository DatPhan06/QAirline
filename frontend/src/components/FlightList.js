// src/components/FlightList.js

import React, { useEffect, useState } from "react";
import { getFlights } from "../services/api";

const FlightList = () => {
  const [flights, setFlights] = useState([]);

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

  return (
    <div>
      <h2>Danh sách chuyến bay</h2>
      <ul>
        {flights.map((flight) => (
          <li key={flight.id}>
            <h3>{flight.name}</h3>
            <p>Departure: {flight.departure}</p>
            <p>Destination: {flight.destination}</p>
            <p>Duration: {flight.duration} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightList;
