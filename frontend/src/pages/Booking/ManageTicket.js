import React, { useEffect, useState } from "react";
import { getBookings, updateBooking, getBookingsByUserId } from "../../services/bookingService";
import { updateTicketStatus } from "../../services/ticketService";
import { getFlightById } from "../../services/flightService";
import { getTicketById } from "../../services/ticketService";
import { getUserById, getCurrentUser } from "../../services/userService";
import styles from "./ManageTicket.module.css";

const ManageTicket = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all"); // 'all', 'successful', 'canceled'
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch bookings data
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const currentUser = await getCurrentUser();
        const data = await getBookingsByUserId(currentUser.user_id);
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

  const handleBookingClick = async (booking) => {
    if (booking.status !== "booked") {
      // Không làm gì nếu vé không ở trạng thái thành công
      return;
    }
    try {
      // Lấy thông tin vé từ backend
      const ticketDetails = await getTicketById(booking.ticket_id);
      // Lấy thông tin người dùng từ backend
      const userDetails = await getUserById(booking.user_id);
      // Kết hợp thông tin booking, ticket và user
      const detailedBooking = {
        ...booking,
        ticket: ticketDetails,
        user: userDetails,
      };
      setSelectedBooking(detailedBooking);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching booking details:", error);
      alert("Không thể lấy thông tin chi tiết của vé.");
    }
  };

  // Cancel booking
  const handleCancelBooking = async (bookingId, flightId) => {
    try {
      const flight = await getFlightById(flightId);
      const departureDate = new Date(flight.departure_time);
      const currentDate = new Date();
      const daysDifference =
        (departureDate - currentDate) / (1000 * 60 * 60 * 24);

      if (daysDifference < 7) {
        alert("Không thể hủy vé trước khi chuyến bay cất cánh 7 ngày.");
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
      <div className={styles.filterButtons}>
        <button
          className={`${styles.filterButton} ${
            filter === "successful" ? styles.active : ""
          }`}
          onClick={() => handleFilterChange("successful")}
        >
          VÉ THÀNH CÔNG
        </button>
        <button
          className={`${styles.filterButton} ${
            filter === "canceled" ? styles.active : ""
          }`}
          onClick={() => handleFilterChange("canceled")}
        >
          VÉ ĐÃ HỦY
        </button>
        <button
          className={`${styles.filterButton} ${
            filter === "all" ? styles.active : ""
          }`}
          onClick={() => handleFilterChange("all")}
        >
          TẤT CẢ VÉ
        </button>
      </div>
      <div className={styles.separator}></div>
      {isLoading ? (
        <p>Đang tải vé...</p>
      ) : filteredBookings.length > 0 ? (
        <ul className={styles.bookingList}>
          {filteredBookings.map((booking) => (
            <li
              key={booking.booked_ticket_id}
              className={styles.bookingItem}
              onClick={() => handleBookingClick(booking)}
            >
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

              </div>
            </li>
          ))}
          {showModal && selectedBooking && (
  <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
      <button className={styles.closeButton} onClick={() => setShowModal(false)}>
        ×
      </button>
      <h2>THÔNG TIN CHI TIẾT </h2>
      <p>
        <strong>Mã vé:</strong> {selectedBooking.booked_ticket_id}
      </p>
      <p>
        <strong>Họ tên người đặt:</strong> {selectedBooking.user.full_name} 
      </p>
      <p>
        <strong>Email:</strong> {selectedBooking.user.email}
      </p>
      <p>
        <strong>Mã vé:</strong> {selectedBooking.ticket.ticket_id}
      </p>
      <p>
        <strong>Chuyến bay:</strong> {selectedBooking.flight_id}
      </p>
      <p>
        <strong>Số ghế:</strong> {selectedBooking.ticket.seat.seat_number}
      </p>
      <p>
        <strong>Giá vé:</strong> {selectedBooking.price.toLocaleString()} VND
      </p>
      <p>
        <strong>Ngày đặt:</strong> {new Date(selectedBooking.booking_time).toLocaleString()}
      </p>

          {/* Thêm nút hủy vé vào modal */}
          {selectedBooking.status === "booked" && (
                  <button
                    className={styles.cancelButton}
                    onClick={() =>
                      handleCancelBooking(
                        selectedBooking.booked_ticket_id,
                        selectedBooking.flight_id
                      )
                    }
                  >
                    Hủy Vé
                  </button>
                )}
    </div>
  </div>
)}
        </ul>
      ) : (
        <p>Bạn chưa có vé nào được đặt.</p>
      )}
    </div>
  );
};

export default ManageTicket;
