import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ConfirmationPage.module.css";

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
        <h1 className={styles.successMessage}> ✅ Chúc mừng bạn đã đặt vé thành công!</h1>
        <p className={styles.instruction}>Vui lòng mang theo CMND/CCCD và vé điện tử khi đi du lịch</p>
      </div>

      {/* Ticket Information Section */}
      <div className={styles.ticketInfoSection}>
        <h2 className={styles.ticketTitle}>Thông tin vé</h2>
        <div className={styles.ticketDetails}>
          <p><strong>Chuyến bay:</strong> {flight.flight_number}</p>
          <p><strong>Điểm khởi hành:</strong> {flight.departure_airport.name} - {flight.departure_airport.city}</p>
          <p><strong>Điểm đến:</strong> {flight.arrival_airport.name} - {flight.arrival_airport.city}</p>
          <p><strong>Thời gian khởi hành:</strong> {new Date(flight.departure_time).toLocaleString()}</p>
          <p><strong>Thời gian đến:</strong> {new Date(flight.arrival_time).toLocaleString()}</p>
          <p><strong>Ghế:</strong> {ticket.seat.seat_number} ({ticket.seat.seat_class})</p>
          <p><strong>Giá vé:</strong> {ticket.price.toLocaleString()} VND</p>
        </div>
      </div>

      {/* Buttons Section */}
      <div className={styles.actionButtons}>
        <button className={styles.bookButton} onClick={() => navigate("/booking/book-ticket")}>Đặt vé khác</button>
        <button className={styles.manageButton} onClick={() => navigate("/booking/manage-ticket")}>Quản lý vé của tôi</button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
