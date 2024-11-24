import React, { useEffect, useState } from "react";
import { getFlights } from "../services/api";

/**
 * Component hiển thị danh sách các chuyến bay.
 * Sử dụng hook useEffect để gọi API lấy dữ liệu chuyến bay khi component được render.
 */
/**
 * FlightList là một component React hiển thị danh sách các chuyến bay.
 *
 * Component này sử dụng hook useState để quản lý state flights, chứa danh sách các chuyến bay.
 *
 * useEffect được sử dụng để gọi hàm fetchFlights khi component được mount. Hàm fetchFlights gọi API để lấy dữ liệu chuyến bay và cập nhật state flights.
 *
 * @component
 * @example
 * return (
 *   <FlightList />
 * )
 */
const FlightList = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    /**
     * Hàm fetchFlights gọi API để lấy dữ liệu chuyến bay và cập nhật state flights.
     * Sử dụng try-catch để xử lý lỗi nếu có.
     */
    const fetchFlights = async () => {
      try {
        const data = await getFlights();
        setFlights(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu chuyến bay:", error);
      }
    };

    fetchFlights();
  }, []);

  return (
    <div>
      <h2>Danh sách chuyến bay</h2>
      <ul>
        {flights.map((flight) => (
          <li key={flight.flight_id}>
            <h3>{flight.flight_number}</h3>
            <p>Departure: {flight.departure_airport}</p>
            <p>Destination: {flight.arrival_airport}</p>
            <p>Duration: {flight.flight_duration} minutes</p>
            <p>Price: ${flight.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightList;
