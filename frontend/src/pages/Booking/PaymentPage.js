// PaymentPage.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./PaymentPage.module.css";

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
      await new Promise((resolve) => setTimeout(resolve, 2000));

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
    <div className={styles.paymentContainer}>
      <h1 className={styles.title}>Thanh toán vé</h1>

      <div className={styles.flightInfo}>
        <h2>Thông tin chuyến bay</h2>
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

        {/* Thông tin thanh toán - giả lập */}
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
  );
};

export default PaymentPage;
