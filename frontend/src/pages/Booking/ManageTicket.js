// frontend/src/pages/Booking/ManageTicket.js

import React, { useEffect, useState } from "react";
import { getBookings, deleteBooking } from "../../services/bookingService";
import styles from "./ManageTicket.module.css";

const ManageTicket = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookings();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        alert("Không thể lấy danh sách vé đã đặt.");
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Bạn có chắc chắn muốn hủy vé này không?")) {
      return;
    }

    try {
      await deleteBooking(bookingId);
      alert("Hủy vé thành công!");
      setBookings(
        bookings.filter((booking) => booking.booked_ticket_id !== bookingId)
      );
    } catch (error) {
      console.error("Error canceling booking:", error);
      alert("Hủy vé thất bại, vui lòng thử lại.");
    }
  };

  return (
    <div className={styles.manageTicketPage}>
      <h1>Quản Lý Vé</h1>
      {bookings.length > 0 ? (
        <ul className={styles.bookingList}>
          {bookings.map((booking) => (
            <li key={booking.booked_ticket_id} className={styles.bookingItem}>
              <p>
                <strong>Vé số:</strong> {booking.booked_ticket_id}
              </p>
              <p>
                <strong>Chuyến bay:</strong> {booking.flight_id}
              </p>
              <p>
                <strong>Ghế:</strong> {booking.seat_id}
              </p>
              <p>
                <strong>Giá vé:</strong> {booking.price.toLocaleString()} VND
              </p>
              <p>
                <strong>Trạng thái:</strong> {booking.status}
              </p>
              <button
                className={styles.cancelButton}
                onClick={() => handleCancelBooking(booking.booked_ticket_id)}
              >
                Hủy Vé
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Bạn chưa có vé nào được đặt.</p>
      )}
    </div>
  );
};

export default ManageTicket;
