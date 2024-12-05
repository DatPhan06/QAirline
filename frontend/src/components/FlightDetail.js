// FlightDetail.js
import React, { useEffect, useState } from "react";
import styles from "./FlightDetail.module.css";
import { getAirplaneById } from "../services/airplaneService";
import { getSeatsByAirplaneId } from "../services/seatService";
import { createBooking } from "../services/bookingService";

const FlightDetail = ({ flight }) => {
  const [airplane, setAirplane] = useState(null);
  const [seats, setSeats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  useEffect(() => {
    const fetchAirplaneDetails = async () => {
      try {
        const data = await getAirplaneById(flight.airplane_id);
        setAirplane(data);
      } catch (error) {
        console.error("Error fetching airplane details:", error);
      }
    };

    const fetchSeats = async () => {
      try {
        const data = await getSeatsByAirplaneId(flight.airplane_id);
        setSeats(data);
      } catch (error) {
        console.error("Error fetching seats:", error);
      }
    };

    fetchAirplaneDetails();
    fetchSeats();
  }, [flight.airplane_id]);

  const handleSeatSelection = async (seat) => {
    try {
      setIsLoading(true);
      setBookingError(null);

      await createBooking({
        flight_id: flight.id,
        seat_id: seat.seat_id,
        ticket_id: 1,
        price: 1000000,
      });

      // Refresh seat data after booking
      window.location.reload();
    } catch (error) {
      setBookingError("Không thể đặt chỗ. Vui lòng thử lại sau.");
      console.error("Booking error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!airplane) {
    return <p>Đang tải thông tin máy bay...</p>;
  }

  return (
    <div className={styles.flightDetailContainer}>
      <h1>Chi tiết chuyến bay</h1>
      <p>Số hiệu: {flight.flight_number}</p>
      <p>Điểm khởi hành: {flight.departure_airport.name}</p>
      <p>Điểm đến: {flight.arrival_airport.name}</p>
      <p>
        Thời gian khởi hành: {new Date(flight.departure_time).toLocaleString()}
      </p>
      <p>Thời gian đến: {new Date(flight.arrival_time).toLocaleString()}</p>

      {/* Hiển thị thông tin máy bay nếu có */}
      {airplane && (
        <>
          <h2>Thông tin máy bay</h2>
          <p>Mô hình: {airplane.model}</p>
          <p>Nhà sản xuất: {airplane.manufacturer}</p>
          <p>Sức chứa: {airplane.seat_capacity}</p>

          {/* Hiển thị danh sách ghế */}
          <h2>Danh sách chỗ ngồi</h2>
          {isLoading && <p>Đang xử lý đặt chỗ...</p>}
          {bookingError && <p className={styles.error}>{bookingError}</p>}
          <ul className={styles.seatList}>
            {seats.map((seat) => (
              <li
                key={seat.seat_id}
                className={`${styles.seatItem} ${
                  seat.status === "Available"
                    ? styles.available
                    : styles.occupied
                }`}
                onClick={() =>
                  seat.status === "Available" && handleSeatSelection(seat)
                }
              >
                Ghế số: {seat.seat_number}, Loại ghế: {seat.seat_class}, Trạng
                thái: {seat.status}
              </li>
            ))}
          </ul>
        </>
      )}

      <button onClick={() => window.location.reload()}>
        Quay lại danh sách
      </button>
    </div>
  );
};

export default FlightDetail;