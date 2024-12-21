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

/**
 * FlightDetail component displays detailed information about a flight, including
 * flight details, airplane information, and a seat map with ticket selection functionality.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.flight - Flight object containing flight details
 * @param {string} props.flight.flight_id - Unique identifier for the flight
 * @param {string} props.flight.flight_number - Flight number
 * @param {Object} props.flight.departure_airport - Departure airport details
 * @param {string} props.flight.departure_airport.name - Departure airport name
 * @param {string} props.flight.departure_airport.iata_code - Departure airport IATA code
 * @param {Date} props.flight.departure_time - Departure time
 * @param {Object} props.flight.arrival_airport - Arrival airport details
 * @param {string} props.flight.arrival_airport.name - Arrival airport name
 * @param {string} props.flight.arrival_airport.iata_code - Arrival airport IATA code
 * @param {Date} props.flight.arrival_time - Arrival time
 * @param {string} props.flight.flight_duration - Flight duration
 * @param {string} props.flight.status - Flight status
 * @param {number} props.flight.available_seats - Number of available seats
 * @param {Object} props.flight.airplane - Airplane details
 * @param {string} props.flight.airplane.model - Airplane model
 * @param {string} props.flight.airplane.manufacturer - Airplane manufacturer
 * @param {number} props.flight.airplane.seat_capacity - Airplane seat capacity
 * @param {number} props.flight.airplane.year_of_manufacture - Year of manufacture
 * @param {string} props.flight.airplane.status - Airplane status
 *
 * @returns {JSX.Element} JSX element representing the flight detail component
 */
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
        <div className={styles.flightCard}>
          <div className={styles.flightHeader}>
            <h3>Thông tin chuyến bay</h3>
            <span className={styles.flightNumber}>{flight.flight_number}</span>
          </div>

          <div className={styles.flightRoute}>
            <div className={styles.routePoint}>
              <div className={styles.airportInfo}>
                <span className={styles.airportName}>
                  {flight.departure_airport.name}
                </span>
                <span className={styles.iataCode}>
                  ({flight.departure_airport.iata_code})
                </span>
              </div>
              <div className={styles.timeInfo}>
                <span className={styles.time}>
                  {new Date(flight.departure_time).toLocaleTimeString()}
                </span>
                <span className={styles.date}>
                  {new Date(flight.departure_time).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Ticket Class Selection */}
            {/* <div className={styles.ticketClassSelection}>
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
      </div> */}

            <div className={styles.routeConnection}>
              <div className={styles.flightDuration}>
                <span>{flight.flight_duration}</span>
              </div>
              <div className={styles.flightLine}></div>
            </div>

            <div className={styles.routePoint}>
              <div className={styles.airportInfo}>
                <span className={styles.airportName}>
                  {flight.arrival_airport.name}
                </span>
                <span className={styles.iataCode}>
                  ({flight.arrival_airport.iata_code})
                </span>
              </div>
              <div className={styles.timeInfo}>
                <span className={styles.time}>
                  {new Date(flight.arrival_time).toLocaleTimeString()}
                </span>
                <span className={styles.date}>
                  {new Date(flight.arrival_time).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.flightStatus}>
            <div className={styles.statusItem}>
              <span className={styles.label}>Trạng thái</span>
              <span className={`${styles.status} ${styles[flight.status]}`}>
                {flight.status}
              </span>
            </div>
            <div className={styles.statusItem}>
              <span className={styles.label}>Số ghế trống</span>
              <span className={styles.seats}>{flight.available_seats}</span>
            </div>
          </div>
        </div>
        {/* Airplane Information */}
        <div className={styles.airplaneCard}>
          <div className={styles.airplaneHeader}>
            <h3>Thông tin máy bay</h3>
            <span className={styles.modelNumber}>{flight.airplane.model}</span>
          </div>

          <div className={styles.airplaneDetails}>
            <div className={styles.detailItem}>
              <span className={styles.label}>Hãng sản xuất</span>
              <span className={styles.value}>
                {flight.airplane.manufacturer}
              </span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>Sức chứa</span>
              <span className={styles.value}>
                {flight.airplane.seat_capacity} ghế
              </span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>Năm sản xuất</span>
              <span className={styles.value}>
                {flight.airplane.year_of_manufacture}
              </span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>Tình trạng</span>
              <span
                className={`${styles.status} ${styles[flight.airplane.status]}`}
              >
                {flight.airplane.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Seat Map */}
      {filteredTickets.length > 0 && (
        <div className={styles.ticketListContainer}>
          <h2 className={styles.sectionTitle}>Danh sách vé</h2>
          {isLoading && <p className={styles.loading}>Đang xử lý đặt chỗ...</p>}
          {bookingError && <p className={styles.error}>{bookingError}</p>}
          <div className={styles.seatMap}>
            {/* Cockpit */}
            <div className={styles.cockpit}>Khoang Phi Công</div>

            {/* Business Class Rows */}
            {businessRows.length > 0 && (
              <div className={styles.classSection}>
                <h3 className={styles.classTitle}>Hạng Thương Gia</h3>
                {businessRows.map((row, rowIndex) => (
                  <div
                    key={`business-row-${rowIndex}`}
                    className={styles.seatRow}
                  >
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
                {/* Bathroom in Business Class */}
                <div className={styles.Busbathroom}> 🚻 </div>

                {/* Exit Door in Business Class */}
                <div className={styles.Busdoor}>⬅️ ➡️</div>
              </div>
            )}

            {/* Economy Class Rows */}
            {economyRows.length > 0 && (
              <div className={styles.classSection}>
                <h3 className={styles.classTitle}>Hạng Phổ Thông</h3>
                {economyRows.map((row, rowIndex) => (
                  <div
                    key={`economy-row-${rowIndex}`}
                    className={styles.seatRow}
                  >
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
                {/* Bathroom in Economy Class */}
                <div className={styles.Ecombathroom}>🚻</div>
              </div>
            )}

            {/* Bathrooms and Doors */}
            <div className={styles.door}>Cửa Ra Vào</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightDetail;
