import React, { useEffect, useState } from "react";
import {
  getBookings,
  updateBooking,
  getBookingsByUserId,
} from "../../services/bookingService";
import { updateTicketStatus } from "../../services/ticketService";
import { getFlightById } from "../../services/flightService";
import { getTicketById } from "../../services/ticketService";
import { getUserById, getCurrentUser } from "../../services/userService";
import styles from "./ManageTicket.module.css";

/**
 * ManageTicket component allows users to view and manage their flight bookings.
 * Users can filter bookings by status (all, successful, canceled), view booking details,
 * and cancel bookings if certain conditions are met.
 *
 * @component
 * @example
 * return (
 *   <ManageTicket />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @function
 * @name ManageTicket
 *
 * @description
 * This component fetches the user's bookings on mount and displays them in a list.
 * Users can filter the bookings by status and view detailed information about each booking.
 * If a booking is in a "booked" status, users can cancel it if the flight's departure date
 * is more than 7 days away.
 *
 * @property {Array} bookings - The list of bookings fetched from the backend.
 * @property {Function} setBookings - Function to update the bookings state.
 * @property {string} filter - The current filter applied to the bookings list.
 * @property {Function} setFilter - Function to update the filter state.
 * @property {boolean} isLoading - Indicates whether the bookings data is still being fetched.
 * @property {Function} setIsLoading - Function to update the isLoading state.
 * @property {Object|null} selectedBooking - The currently selected booking for detailed view.
 * @property {Function} setSelectedBooking - Function to update the selectedBooking state.
 * @property {boolean} showModal - Indicates whether the booking details modal is visible.
 * @property {Function} setShowModal - Function to update the showModal state.
 *
 * @function fetchBookings
 * Fetches the bookings data for the current user from the backend.
 *
 * @function handleBookingClick
 * Handles the click event on a booking item. Fetches detailed information about the booking,
 * including ticket and user details, and displays it in a modal.
 *
 * @function handleCancelBooking
 * Handles the cancellation of a booking. Checks if the flight's departure date is more than
 * 7 days away and confirms the cancellation with the user before proceeding.
 *
 * @function handleFilterChange
 * Updates the filter state to show bookings based on the selected filter.
 *
 * @function filteredBookings
 * Filters the bookings list based on the current filter and the departure date of the flights.
 */
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
                    {new Date(booking.booking_time).toLocaleDateString()}
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
            <div
              className={styles.modalOverlay}
              onClick={() => setShowModal(false)}
            >
              <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className={styles.closeButton}
                  onClick={() => setShowModal(false)}
                >
                  ×
                </button>

                <div className={styles.ticketContainer}>
                  <div className={styles.ticketHeader}>
                    <h2>VÉ MÁY BAY ĐIỆN TỬ</h2>
                    <span className={styles.ticketId}>
                      Mã vé: {selectedBooking.booked_ticket_id}
                    </span>
                  </div>

                  <div className={styles.ticketBody}>
                    <div className={styles.flightMainInfo}>
                      <div className={styles.airportInfo}>
                        <div className={styles.departure}>
                          <h3>
                            {selectedBooking.flight.departure_airport?.city}
                          </h3>
                          <p>
                            {selectedBooking.flight.departure_airport?.name}
                          </p>
                          <time>
                            {new Date(
                              selectedBooking.flight.departure_time
                            ).toLocaleDateString()}
                          </time>
                          <p>
                            {new Date(
                              selectedBooking.flight.departure_time
                            ).toLocaleTimeString()}
                          </p>
                        </div>

                        <div className={styles.flightPath}>
                          <span className={styles.flightNumber}>
                            {selectedBooking.flight.flight_number}
                          </span>
                          <div className={styles.pathLine}>
                            <div className={styles.airplane}>✈</div>
                          </div>
                        </div>

                        <div className={styles.arrival}>
                          <h3>
                            {selectedBooking.flight.arrival_airport?.city}
                          </h3>
                          <p>{selectedBooking.flight.arrival_airport?.name}</p>
                          <time>
                            {new Date(
                              selectedBooking.flight.arrival_time
                            ).toLocaleDateString()}
                          </time>
                          <p>
                            {new Date(
                              selectedBooking.flight.arrival_time
                            ).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={styles.ticketDetails}>
                      <div className={styles.detail}>
                        <span>Họ tên</span>
                        <strong>{selectedBooking.user.full_name}</strong>
                      </div>
                      <div className={styles.detail}>
                        <span>Thời gian bay</span>
                        <strong>
                          {selectedBooking.flight.flight_duration}
                        </strong>
                      </div>
                      <div className={styles.detail}>
                        <span>Ghế</span>
                        <strong>{selectedBooking.seat?.seat_number}</strong>
                      </div>
                      <div className={styles.detail}>
                        <span>Giá vé</span>
                        <strong>
                          {selectedBooking.price.toLocaleString()} VND
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>

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
