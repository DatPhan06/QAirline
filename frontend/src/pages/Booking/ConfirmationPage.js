import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ConfirmationPage.module.css";

/**
 * ConfirmationPage component renders the confirmation details of a flight booking.
 * It displays the flight and ticket information if available, otherwise shows an error message.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * // Example usage:
 * // Assuming the component is used within a Router and the location state contains flight and ticket details.
 * <Route path="/booking/confirmation" element={<ConfirmationPage />} />
 *
 * @requires useLocation - React Router hook to access the current location object.
 * @requires useNavigate - React Router hook to navigate programmatically.
 * @requires styles - CSS module for styling the component.
 *
 * @typedef {Object} Flight
 * @property {string} flight_number - The flight number.
 * @property {Object} departure_airport - The departure airport details.
 * @property {string} departure_airport.name - The name of the departure airport.
 * @property {string} departure_airport.city - The city of the departure airport.
 * @property {Object} arrival_airport - The arrival airport details.
 * @property {string} arrival_airport.name - The name of the arrival airport.
 * @property {string} arrival_airport.city - The city of the arrival airport.
 * @property {string} departure_time - The departure time of the flight.
 * @property {string} arrival_time - The arrival time of the flight.
 *
 * @typedef {Object} Ticket
 * @property {Object} seat - The seat details.
 * @property {string} seat.seat_number - The seat number.
 * @property {string} seat.seat_class - The class of the seat.
 * @property {number} price - The price of the ticket.
 *
 * @typedef {Object} LocationState
 * @property {Flight} flight - The flight details.
 * @property {Ticket} ticket - The ticket details.
 */
const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight, ticket } = location.state || {};

  if (!flight || !ticket) {
    return (
      <div className={styles.confirmationContainer}>
        <p>Không có thông tin đặt vé. Vui lòng thử lại.</p>
      </div>
    );
  }

  return (
    <div className={styles.confirmationContainer}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <h1 className={styles.successMessage}>
          {" "}
          ✅ Chúc mừng bạn đã đặt vé thành công!
        </h1>
        <p className={styles.instruction}>
          Vui lòng mang theo CMND/CCCD và vé điện tử khi đi du lịch
        </p>
      </div>

      {/* Ticket Information Section */}
      <div className={styles.ticketInfoSection}>
        <h2 className={styles.ticketTitle}>Thông tin vé</h2>
        <div className={styles.ticketDetails}>
          <p>
            <strong>Chuyến bay:</strong> {flight.flight_number}
          </p>
          <p>
            <strong>Điểm khởi hành:</strong> {flight.departure_airport.name} -{" "}
            {flight.departure_airport.city}
          </p>
          <p>
            <strong>Điểm đến:</strong> {flight.arrival_airport.name} -{" "}
            {flight.arrival_airport.city}
          </p>
          <p>
            <strong>Thời gian khởi hành:</strong>{" "}
            {new Date(flight.departure_time).toLocaleString()}
          </p>
          <p>
            <strong>Thời gian đến:</strong>{" "}
            {new Date(flight.arrival_time).toLocaleString()}
          </p>
          <p>
            <strong>Ghế:</strong> {ticket.seat.seat_number} (
            {ticket.seat.seat_class})
          </p>
          <p>
            <strong>Giá vé:</strong> {ticket.price.toLocaleString()} VND
          </p>
        </div>
      </div>

      {/* Buttons Section */}
      <div className={styles.actionButtons}>
        <button
          className={styles.bookButton}
          onClick={() => navigate("/booking/book-ticket")}
        >
          Đặt vé khác
        </button>
        <button
          className={styles.manageButton}
          onClick={() => navigate("/booking/manage-ticket")}
        >
          Quản lý vé của tôi
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
