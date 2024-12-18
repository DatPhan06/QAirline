import React, { useEffect, useState } from "react";
import { getBookings, updateBooking } from "../../services/bookingService";
import { updateTicketStatus } from "../../services/ticketService";
import { getFlightById } from "../../services/flightService";
import styles from "./ManageTicket.module.css";

const ManageTicket = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all"); // 'all', 'successful', 'canceled'
  const [isLoading, setIsLoading] = useState(true);

  // Fetch bookings data
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookings();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        alert("Không thể lấy danh sách vé đã đặt.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Cancel booking
  const handleCancelBooking = async (bookingId, flightId) => {
    try {
      const flight = await getFlightById(flightId);
      const departureDate = new Date(flight.departure_time);
      const currentDate = new Date();
      const daysDifference = (departureDate - currentDate) / (1000 * 60 * 60 * 24);

      if (daysDifference < 3) {
        alert("Không thể hủy vé trước khi chuyến bay cất cánh 3 ngày.");
        return;
      }

      if (!window.confirm("Bạn có chắc chắn muốn hủy vé này không?")) {
        return;
      }

      await updateBooking(bookingId, { status: "canceled" });

      const canceledBooking = bookings.find(
        (booking) => booking.booked_ticket_id === bookingId
      );

      await updateTicketStatus(canceledBooking.ticket_id, "available");

      alert("Hủy vé thành công!");
      setBookings(
        bookings.map((booking) =>
          booking.booked_ticket_id === bookingId
            ? { ...booking, status: "canceled" }
            : booking
        )
      );
    } catch (error) {
      console.error("Error canceling booking:", error);
      alert("Hủy vé thất bại, vui lòng thử lại.");
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredBookings = bookings.filter((booking) => {
    const currentDate = new Date();
    const departureDate = new Date(booking.departure_time);

    if (departureDate < currentDate) {
      return false;
    }

    if (filter === "successful") {
      return booking.status === "booked";
    } else if (filter === "canceled") {
      return booking.status === "canceled";
    }
    return true; // 'all'
  });

  return (
    <div className={styles.manageTicketPage}>
      <h1>Quản Lý Vé</h1>
      <div className={styles.filterButtons}>
        <button
          className={`${styles.filterButton} ${
            filter === "successful" ? styles.active : ""
          }`}
          onClick={() => handleFilterChange("successful")}
        >
          Vé thành công
        </button>
        <button
          className={`${styles.filterButton} ${
            filter === "canceled" ? styles.active : ""
          }`}
          onClick={() => handleFilterChange("canceled")}
        >
          Vé đã hủy
        </button>
        <button
          className={`${styles.filterButton} ${
            filter === "all" ? styles.active : ""
          }`}
          onClick={() => handleFilterChange("all")}
        >
          Tất cả
        </button>
      </div>
      {isLoading ? (
        <p>Đang tải vé...</p>
      ) : filteredBookings.length > 0 ? (
        <ul className={styles.bookingList}>
          {filteredBookings.map((booking) => (
            <li key={booking.booked_ticket_id} className={styles.bookingItem}>
              <div className={styles.ticketCode}>
                Mã Vé {booking.booked_ticket_id}
              </div>
              <div className={styles.bookingDetailsContainer}>
                <div className={styles.bookingDetails}>
                  <p>
                    <span>Chuyến bay:</span> {booking.flight_id}
                  </p>
                  <p>
                    <span>Ghế:</span> {booking.seat_id}
                  </p>
                  <p>
                    <span>Giá vé:</span> {booking.price.toLocaleString()} VND
                  </p>
                  <p>
                    <span>Ngày đặt:</span>{" "}
                    {new Date(booking.booking_date).toLocaleDateString()}
                  </p>
                  <p>
                    <span>Trạng thái:</span>{" "}
                    {booking.status === "booked" ? "Thành công" : "Đã hủy"}
                  </p>
                </div>

                {booking.additional_info && (
                  <div className={styles.additionalInfo}>
                    <p>
                      <span>Thông tin thêm:</span> {booking.additional_info}
                    </p>
                  </div>
                )}
                {booking.status === "booked" && (
                  <button
                    className={styles.cancelButton}
                    onClick={() =>
                      handleCancelBooking(booking.booked_ticket_id, booking.flight_id)
                    }
                  >
                    Hủy Vé
                  </button>
                )}
              </div>
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
