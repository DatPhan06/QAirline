// FlightDetail.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createBooking,
  getBookingByTicketId,
} from "../services/bookingService";
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
        setTickets([]); // Clear current ticket list
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

  // Helper function to group tickets by row
  const groupTicketsByRow = (tickets) => {
    const rows = {};
    tickets.forEach((ticket) => {
      const seatNumber = ticket.seat.seat_number;
      const rowMatch = seatNumber.match(/\d+/);
      if (rowMatch) {
        const rowNumber = parseInt(rowMatch[0], 10);
        if (!rows[rowNumber]) {
          rows[rowNumber] = [];
        }
        rows[rowNumber].push(ticket);
      }
    });
    // Sort rows by row number
    return Object.entries(rows)
      .sort((a, b) => a[0] - b[0])
      .map((entry) => entry[1]);
  };

  // Helper function to group tickets by row and section (left/right)
  const groupTicketsByRowAndSection = (tickets) => {
    const rows = {};
    tickets.forEach((ticket) => {
      const seatNumber = ticket.seat.seat_number;
      const rowMatch = seatNumber.match(/\d+/);
      const seatMatch = seatNumber.match(/[A-Z]/);
      if (rowMatch && seatMatch) {
        const rowNumber = parseInt(rowMatch[0], 10);
        const seatLetter = seatMatch[0].toUpperCase();
        // Define left and right sections based on seat letters
        // Adjust the seat letters according to your airplane's seating plan
        const leftSeats = ["A", "B", "C", "D", "E", "F"];
        const rightSeats = ["G", "H", "J", "K", "L", "M"];

        let section = "left";
        if (rightSeats.includes(seatLetter)) {
          section = "right";
        }

        if (!rows[rowNumber]) {
          rows[rowNumber] = { left: [], right: [] };
        }
        rows[rowNumber][section].push(ticket);
      }
    });
    // Sort rows by row number
    return Object.entries(rows)
      .sort((a, b) => a[0] - b[0])
      .map((entry) => entry[1]);
  };

  // Separate tickets into Business and Economy
  const businessTickets = filteredTickets.filter(
    (ticket) => ticket.class_type.toLowerCase() === "business"
  );
  const economyTickets = filteredTickets.filter(
    (ticket) => ticket.class_type.toLowerCase() === "economy"
  );

  // Group tickets by rows
  const businessRows = groupTicketsByRowAndSection(businessTickets);
  const economyRows = groupTicketsByRowAndSection(economyTickets);

  return (
    <div className={styles.flightDetailContainer}>
      <h2 className={styles.sectionTitle}>Chi tiết chuyến bay</h2>

      <div className={styles.infoContainer}>
        {/* Flight Information */}
        <div className={styles.flightInfo}>
          <h3 className={styles.subSectionTitle}>Thông tin chuyến bay</h3>
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

        {/* Airplane Information */}
        <div className={styles.airplaneInfo}>
          <h3 className={styles.subSectionTitle}>Thông tin máy bay</h3>
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

      {/* Ticket Class Selection */}
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

      {/* Seat Map */}
      {filteredTickets.length > 0 && (
        <div className={styles.ticketListContainer}>
          <h2 className={styles.sectionTitle}>
            Danh sách vé {selectedClass ? `(${selectedClass})` : "(Tất cả hạng vé)"}
          </h2>
          {isLoading && (
            <p className={styles.loading}>Đang xử lý đặt chỗ...</p>
          )}
          {bookingError && (
            <p className={styles.error}>{bookingError}</p>
          )}
          <div className={styles.seatMap}>
            {/* Cockpit */}
            <div className={styles.cockpit}>Khoang Phi Công</div>

            {/* Business Class Rows */}
            {businessRows.length > 0 && (
              <div className={styles.classSection}>
                <h3 className={styles.classTitle}>Hạng Thương Gia</h3>
                {businessRows.map((row, rowIndex) => (
                  <div key={`business-row-${rowIndex}`} className={styles.seatRow}>
                    {/* Left Section */}
                    <div className={styles.seatSection}>
                      {row.left.map((ticket) => (
                        <div
                          key={ticket.ticket_id}
                          className={`${styles.ticketItem} ${
                            ticket.status === "available"
                              ? styles.available
                              : styles.occupied
                          }`}
                          onClick={() => handleTicketSelection(ticket)}
                          title={`Ghế số: ${ticket.seat.seat_number}`}
                        >
                          {ticket.seat.seat_number}
                        </div>
                      ))}
                    </div>

                    {/* Aisle */}
                    <div className={styles.aisle}></div>

                    {/* Right Section */}
                    <div className={styles.seatSection}>
                      {row.right.map((ticket) => (
                        <div
                          key={ticket.ticket_id}
                          className={`${styles.ticketItem} ${
                            ticket.status === "available"
                              ? styles.available
                              : styles.occupied
                          }`}
                          onClick={() => handleTicketSelection(ticket)}
                          title={`Ghế số: ${ticket.seat.seat_number}`}
                        >
                          {ticket.seat.seat_number}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Economy Class Rows */}
            {economyRows.length > 0 && (
              <div className={styles.classSection}>
                <h3 className={styles.classTitle}>Hạng Phổ Thông</h3>
                {economyRows.map((row, rowIndex) => (
                  <div key={`economy-row-${rowIndex}`} className={styles.seatRow}>
                    {/* Left Section */}
                    <div className={styles.seatSection}>
                      {row.left.map((ticket) => (
                        <div
                          key={ticket.ticket_id}
                          className={`${styles.ticketItem} ${
                            ticket.status === "available"
                              ? styles.available
                              : styles.occupied
                          }`}
                          onClick={() => handleTicketSelection(ticket)}
                          title={`Ghế số: ${ticket.seat.seat_number}`}
                        >
                          {ticket.seat.seat_number}
                        </div>
                      ))}
                    </div>

                    {/* Aisle */}
                    <div className={styles.aisle}></div>

                    {/* Right Section */}
                    <div className={styles.seatSection}>
                      {row.right.map((ticket) => (
                        <div
                          key={ticket.ticket_id}
                          className={`${styles.ticketItem} ${
                            ticket.status === "available"
                              ? styles.available
                              : styles.occupied
                          }`}
                          onClick={() => handleTicketSelection(ticket)}
                          title={`Ghế số: ${ticket.seat.seat_number}`}
                        >
                          {ticket.seat.seat_number}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Bathrooms and Doors */}
            <div className={styles.bathroom}>WC</div>
            <div className={styles.door}>Cửa Ra Vào</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightDetail;
