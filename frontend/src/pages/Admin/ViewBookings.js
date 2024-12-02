import React, { useEffect, useState } from "react";
import { getBookings } from "../../services/bookingService";
import AdminSidebar from "../../components/AdminSidebar";
import styles from "./Admin.module.css";

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    totalSeatsBooked: 0,
  });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookings();
        setBookings(data);
        calculateStats(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const calculateStats = (bookings) => {
    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce(
      (sum, booking) => sum + booking.price,
      0
    );
    const totalSeatsBooked = bookings.reduce((sum, booking) => sum + 1, 0);

    setStats({
      totalBookings,
      totalRevenue,
      totalSeatsBooked,
    });
  };

  return (
    <div className={styles.adminContainer}>
      <div className={styles.sidebar}>
        <AdminSidebar />
      </div>
      <div className={styles.mainContent}>
        <h1>View Bookings</h1>
        <div className={styles.statsContainer}>
          <div className={styles.statCard}>
            <h2>Total Bookings</h2>
            <p>{stats.totalBookings}</p>
          </div>
          <div className={styles.statCard}>
            <h2>Total Revenue</h2>
            <p>{stats.totalRevenue.toLocaleString()} VND</p>
          </div>
          <div className={styles.statCard}>
            <h2>Total Seats Booked</h2>
            <p>{stats.totalSeatsBooked}</p>
          </div>
        </div>
        <div className={styles.listContainer}>
          <h2>Booking Details</h2>
          <ul className={styles.bookingList}>
            {bookings.map((booking) => (
              <li key={booking.booked_ticket_id} className={styles.bookingItem}>
                <p>
                  <strong>Booking ID:</strong> {booking.booked_ticket_id}
                </p>
                <p>
                  <strong>User ID:</strong> {booking.user_id}
                </p>
                <p>
                  <strong>Flight ID:</strong> {booking.flight_id}
                </p>
                <p>
                  <strong>Seat ID:</strong> {booking.seat_id}
                </p>
                <p>
                  <strong>Price:</strong> {booking.price.toLocaleString()} VND
                </p>
                <p>
                  <strong>Booking Time:</strong>{" "}
                  {new Date(booking.booking_time).toLocaleString()}
                </p>
                <p>
                  <strong>Status:</strong> {booking.status}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViewBookings;
