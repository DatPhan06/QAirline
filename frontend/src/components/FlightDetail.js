// FlightDetail.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSeatsByAirplaneId } from "../services/seatService";
import { createBooking } from "../services/bookingService";
import {
  getTicketByFlightAndSeat,
  getTicketsByFlightId,
} from "../services/ticketService";

import styles from "./FlightDetail.module.css";

const FlightDetail = ({ flight }) => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [ticketClasses, setTicketClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        if (flight?.flight_id) {
          const ticketsData = await getTicketsByFlightId(flight.flight_id);
          setTickets(ticketsData);

          // Get unique ticket classes
          const classes = [
            ...new Set(ticketsData.map((ticket) => ticket.class_type)),
          ];
          setTicketClasses(classes);
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setBookingError("Không thể tải thông tin vé");
      }
    };

    fetchTickets();
  }, [flight]);

  useEffect(() => {
    // Filter tickets based on selected class
    if (selectedClass) {
      const filtered = tickets.filter(
        (ticket) => ticket.class_type === selectedClass
      );
      setFilteredTickets(filtered);
    } else {
      setFilteredTickets(tickets);
    }
  }, [selectedClass, tickets]);

  const handleTicketSelection = async (ticket) => {
    const confirmBooking = window.confirm(
      `Bạn có muốn đặt vé cho ghế số ${ticket.seat.seat_number} không?`
    );
    if (confirmBooking) {
      try {
        setIsLoading(true);
        setBookingError(null);

        navigate("/booking/payment", { state: { flight, ticket } });
      } catch (error) {
        console.error("Error creating booking:", error);
        setBookingError("Đã xảy ra lỗi khi đặt chỗ");
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
      <h1 className={styles.title}>Chi tiết chuyến bay</h1>
      
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Thông tin chuyến bay</h2>
        <div className={styles.infoGrid}>
          <div>
            <p><strong>Số hiệu:</strong> {flight.flight_number}</p>
            <p><strong>Điểm khởi hành:</strong> {flight.departure_airport.name}</p>
            <p><strong>Điểm đến:</strong> {flight.arrival_airport.name}</p>
          </div>
          <div>
            <p>
              <strong>Thời gian khởi hành:</strong> {new Date(flight.departure_time).toLocaleString()}
            </p>
            <p>
              <strong>Thời gian đến:</strong> {new Date(flight.arrival_time).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Thông tin máy bay</h2>
        <div className={styles.infoGrid}>
          <div>
            <p><strong>Mô hình:</strong> {flight.airplane.model}</p>
            <p><strong>Nhà sản xuất:</strong> {flight.airplane.manufacturer}</p>
          </div>
          <div>
            <p><strong>Sức chứa:</strong> {flight.airplane.seat_capacity}</p>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Chọn hạng vé</h2>
        <select
          className={styles.selectClass}
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">Tất cả các hạng vé</option>
          {ticketClasses.map((ticketClass) => (
            <option key={ticketClass} value={ticketClass}>
              {ticketClass}
            </option>
          ))}
        </select>
      </div>

      {filteredTickets.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Danh sách vé {selectedClass ? `(${selectedClass})` : "(Tất cả hạng vé)"}
          </h2>
          {isLoading && <p className={styles.loading}>Đang xử lý đặt chỗ...</p>}
          {bookingError && <p className={styles.error}>{bookingError}</p>}
          <ul className={styles.ticketList}>
            {filteredTickets.map((ticket) => (
              <li
                key={ticket.ticket_id}
                className={`${styles.ticketItem} ${
                  ticket.status === "available"
                    ? styles.available
                    : styles.occupied
                }`}
                onClick={() => handleTicketSelection(ticket)}
              >
                <span className={styles.seatNumber}>Ghế số: {ticket.seat.seat_number}</span>
                <span className={styles.classType}>Hạng vé: {ticket.class_type}</span>
                <span className={styles.status}>Trạng thái: {ticket.status}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button className={styles.backButton} onClick={() => window.location.reload()}>
        Quay lại danh sách
      </button>
    </div>
  );
};

export default FlightDetail;
