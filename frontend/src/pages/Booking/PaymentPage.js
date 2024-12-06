import React from "react";
import { useLocation } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const { flight, seat } = location.state;

  // Thực hiện logic đặt vé và thanh toán ở đây

  return (
    <div>
      <h1>Thanh toán vé</h1>
      <p>Chuyến bay: {flight.flight_number}</p>
      <p>
        Điểm khởi hành: {flight.departure_airport.name} -{" "}
        {flight.departure_airport.city}
      </p>
      <p>
        Điểm đến: {flight.arrival_airport.name} - {flight.arrival_airport.city}
      </p>
      <p>
        Thời gian khởi hành: {new Date(flight.departure_time).toLocaleString()}
      </p>
      <p>Thời gian đến: {new Date(flight.arrival_time).toLocaleString()}</p>
      <p>Ghế số: {seat.seat_number}</p>
      {/* Thêm form thanh toán tại đây */}
    </div>
  );
};

export default PaymentPage;
