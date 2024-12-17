// FlightDetail.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../services/bookingService";
import { getBookingByTicketId } from "../services/bookingService";
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
        if (flight) {
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
        setTickets([]); // Xóa danh sách vé hiện tại
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
    if (ticket.status === "available") {
      try {
        setIsLoading(true);
        setBookingError(null);

        const confirmBooking = window.confirm(
          `Bạn có muốn đặt vé cho ghế số ${ticket.seat.seat_number} không?`
        );
        if (confirmBooking) {
          navigate("/booking/payment", { state: { flight, ticket } });
        }
      } catch (error) {
        console.error("Error checking ticket or booking:", error);
        setBookingError("Đã xảy ra lỗi khi kiểm tra vé.");
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
      <h2 className={styles.sectionTitle}>Chi tiết chuyến bay</h2>

      <div className={styles.infoContainer}>
        {/* Thông tin chuyến bay */}
        <div className={styles.flightInfo}>
          <h3 className={styles.sectionTitle}>Thông tin chuyến bay</h3>
          <div className={styles.infoGrid}>
            <p>
              <strong>Số hiệu:</strong> {flight.flight_number}
            </p>
            <p>
              <strong>Khởi hành:</strong> {flight.departure_airport.name}
            </p>
            <p>
              <strong>Điểm đến:</strong> {flight.arrival_airport.name}
            </p>
            <p>
              <strong>Thời gian bay:</strong> {flight.departure_time}
            </p>
            <p>
              <strong>Thời gian đến:</strong> {flight.arrival_time}
            </p>
          </div>
        </div>

        {/* Thông tin máy bay */}
        <div className={styles.airplaneInfo}>
          <h3 className={styles.sectionTitle}>Thông tin máy bay</h3>
          <div className={styles.infoGrid}>
            <p>
              <strong>Model:</strong> {flight.airplane.model}
            </p>
            <p>
              <strong>Nhà sản xuất:</strong> {flight.airplane.manufacturer}
            </p>
            <p>
              <strong>Sức chứa:</strong> {flight.airplane.seat_capacity}
            </p>
          </div>
        </div>
      </div>

      {/* Phần chọn hạng vé */}
      <div className={styles.ticketClassSelection}>
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

      {/* Danh sách vé - Hiển thị bên dưới 2 cột*/}
      {filteredTickets.length > 0 && (
        <div className={styles.ticketListContainer}>
          <h2 className={styles.sectionTitle}>
            Danh sách vé{" "}
            {selectedClass ? `(${selectedClass})` : "(Tất cả hạng vé)"}
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
                <span className={styles.seatNumber}>
                  Ghế số: {ticket.seat.seat_number}
                </span>
                <span className={styles.classType}>
                  Hạng vé: {ticket.class_type}
                </span>
                <span className={styles.status}>
                  Trạng thái: {ticket.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FlightDetail;
