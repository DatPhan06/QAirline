import React, { useEffect, useState } from "react";
import { getBookings, deleteBooking } from "../../services/bookingService";
import styles from "./ManageTicket.module.css";

const ManageTicket = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all"); // 'all', 'successful', 'canceled'
  const [isLoading, setIsLoading] = useState(true); // Thêm trạng thái tải dữ liệu

  // Lấy dữ liệu vé 
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookings();
        console.log("Fetched Bookings:", data); // Kiểm tra dữ liệu
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        alert("Không thể lấy danh sách vé đã đặt.");
      } finally {
        setIsLoading(false); // Kết thúc tải dữ liệu
      }
    };

    fetchBookings();
  }, []);

  // Hủy vé
  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Bạn có chắc chắn muốn hủy vé này không?")) {
      return;
    }

    try {
      await deleteBooking(bookingId);
      alert("Hủy vé thành công!");
      setBookings(
        bookings.map((booking) =>
          booking.booked_ticket_id === bookingId
            ? { ...booking, status: "canceled" } // Cập nhật trạng thái thành "canceled"
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
    if (filter === "successful") {
      return booking.status === "booked"; // Kiểm tra trạng thái "booked"
    } else if (filter === "canceled") {
      return booking.status === "canceled"; // Kiểm tra trạng thái "canceled"
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
        <p>Đang tải vé...</p> // Hiển thị trạng thái tải dữ liệu
      ) : filteredBookings.length > 0 ? (
        <ul className={styles.bookingList}>
          {filteredBookings.map((booking) => (
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
                <strong>Trạng thái:</strong> {booking.status === "booked" ? "Thành công" : "Đã hủy"}
              </p>
              {booking.status === "booked" && ( // Chỉ hiển thị nút "Hủy Vé" cho vé chưa bị hủy
                <button
                  className={styles.cancelButton}
                  onClick={() => handleCancelBooking(booking.booked_ticket_id)}
                >
                  Hủy Vé
                </button>
              )}
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
