import React from "react";

const FlightList = ({ flights }) => {
  return (
    <div>
      <h1>Flight List</h1>
      <ul>
        {flights.map((flight) => (
          <li key={flight.id}>
            {flight.name} - {flight.destination}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightList;
