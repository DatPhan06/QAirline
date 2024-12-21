// PaymentPage.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateTicketStatus } from "../../services/ticketService"; // Import the updateTicketStatus function
import { createBooking } from "../../services/bookingService"; // Import the createBooking function
import styles from "./PaymentPage.module.css";

/**
 * PaymentPage component handles the payment process for booking a flight ticket.
 * It displays flight and ticket information, and provides a form for the user to enter payment details.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * // Usage example:
 * // <PaymentPage />
 *
 * @function
 * @name PaymentPage
 *
 * @description
 * This component uses the following hooks:
 * - `useLocation` to access the current location object.
 * - `useNavigate` to navigate to different routes.
 * - `useState` to manage form input states and payment processing states.
 *
 * The component performs the following tasks:
 * - Displays flight and ticket information.
 * - Provides a form for the user to enter their name, email, and payment details.
 * - Validates the form input before processing the payment.
 * - Simulates the payment process and updates the ticket status.
 * - Creates a new booking and navigates to the confirmation page upon successful payment.
 *
 * @throws Will display an error message if the payment process fails.
 *
 * @requires useLocation
 * @requires useNavigate
 * @requires useState
 *
 * @param {Object} location.state - The state object passed from the previous route.
 * @param {Object} location.state.flight - The flight information.
 * @param {Object} location.state.ticket - The ticket information.
 *
 * @returns {JSX.Element} The rendered PaymentPage component.
 */
const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight, ticket } = location.state;

  if (!ticket) {
    return <p>Thông tin vé không hợp lệ. Vui lòng thử lại.</p>;
  }

  // State cho form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // State cho xử lý thanh toán
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const handlePayment = async (e) => {
    e.preventDefault();

    // Kiểm tra thông tin nhập
    if (!name || !email) {
      setPaymentError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);
    try {
      // Giả lập quá trình thanh toán
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Cập nhật trạng thái vé
      await updateTicketStatus(ticket.ticket_id, "sold");

      // Tạo booking mới
      const bookingData = {
        flight_id: flight.flight_id,
        seat_id: ticket.seat.seat_id,
        ticket_id: ticket.ticket_id,
        price: ticket.price,
      };
      await createBooking(bookingData);

      // Chuyển đến trang xác nhận
      navigate("/booking/confirmation", { state: { flight, ticket } });
    } catch (error) {
      console.error("Error processing payment:", error);
      setPaymentError("Đã xảy ra lỗi trong quá trình thanh toán.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.flightInfo}>
        <h2>Thông tin vé </h2>
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

      <div className={styles.paymentFormContainer}>
        <h1 className={styles.title}>THANH TOÁN VÉ </h1>
        <form className={styles.paymentForm} onSubmit={handlePayment}>
          <h2>Thông tin thanh toán</h2>

          {paymentError && <p className={styles.error}>{paymentError}</p>}

          <div className={styles.formGroup}>
            <label htmlFor="name">Họ và tên:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập họ và tên"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="cardNumber">Số thẻ tín dụng:</label>
            <input
              type="text"
              id="cardNumber"
              placeholder="XXXX-XXXX-XXXX-XXXX"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="expiryDate">Ngày hết hạn:</label>
            <input type="text" id="expiryDate" placeholder="MM/YY" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="cvv">CVV:</label>
            <input type="text" id="cvv" placeholder="XXX" />
          </div>

          <button
            type="submit"
            className={styles.payButton}
            disabled={isProcessing}
          >
            {isProcessing ? "Đang xử lý..." : "Thanh toán"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
