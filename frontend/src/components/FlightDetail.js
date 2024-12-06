// FlightDetail.js
import React, { useEffect, useState } from "react";
import { getSeatsByAirplaneId } from "../services/seatService";
import { createBooking } from "../services/bookingService";
import { getTicketByFlightAndSeat } from "../services/ticketService";
import styles from "./FlightDetail.module.css";

const FlightDetail = ({ flight }) => {
  const [seats, setSeats] = useState([]);
  const [seatClasses, setSeatClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [filteredSeats, setFilteredSeats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        if (flight?.airplane?.airplane_id) {
          const seatsData = await getSeatsByAirplaneId(
            flight.airplane.airplane_id
          );
          setSeats(seatsData);

          // Get unique seat classes
          const classes = [
            ...new Set(seatsData.map((seat) => seat.seat_class)),
          ];
          setSeatClasses(classes);
        }
      } catch (error) {
        console.error("Error fetching seats:", error);
        setBookingError("Không thể tải thông tin ghế ngồi");
      }
    };

    fetchSeats();
  }, [flight]);

  useEffect(() => {
    // Filter seats based on selected class
    if (selectedClass) {
      const filtered = seats.filter(
        (seat) => seat.seat_class === selectedClass
      );
      setFilteredSeats(filtered);
    } else {
      setFilteredSeats(seats);
    }
  }, [selectedClass, seats]);

  const handleSeatSelection = async (seat) => {
    const confirmBooking = window.confirm(
      `Bạn có muốn đặt ghế số ${seat.seat_number} không?`
    );

    if (confirmBooking) {
      try {
        setIsLoading(true);
        setBookingError(null);

        // Get ticket info first
        const ticket = await getTicketByFlightAndSeat(
          flight.flight_id,
          seat.seat_id
        );

        if (!ticket) {
          throw new Error("Không tìm thấy thông tin vé");
        }

        await createBooking({
          flight_id: flight.flight_id,
          seat_id: seat.seat_id,
          ticket_id: ticket.ticket_id,
          price: ticket.price,
        });

        window.location.reload();
      } catch (error) {
        setBookingError("Không thể đặt chỗ. Vui lòng thử lại sau.");
        console.error("Booking error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!flight?.airplane) {
    return <p>Đang tải thông tin chuyến bay...</p>;
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

      <h2>Thông tin máy bay</h2>
      <p>Mô hình: {flight.airplane.model}</p>
      <p>Nhà sản xuất: {flight.airplane.manufacturer}</p>
      <p>Sức chứa: {flight.airplane.seat_capacity}</p>

      <h2>Chọn hạng ghế</h2>
      <select
        className={styles.selectClass}
        value={selectedClass}
        onChange={(e) => setSelectedClass(e.target.value)}
      >
        <option value="">Tất cả các hạng ghế</option>
        {seatClasses.map((seatClass) => (
          <option key={seatClass} value={seatClass}>
            {seatClass}
          </option>
        ))}
      </select>

      {filteredSeats.length > 0 && (
        <>
          <h2>
            Danh sách chỗ ngồi{" "}
            {selectedClass ? `(${selectedClass})` : "(Tất cả hạng ghế)"}
          </h2>
          {isLoading && <p>Đang xử lý đặt chỗ...</p>}
          {bookingError && <p className={styles.error}>{bookingError}</p>}
          <ul className={styles.seatList}>
            {filteredSeats.map((seat) => (
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
                Ghế số: {seat.seat_number}, Hạng ghế: {seat.seat_class}, Trạng
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
