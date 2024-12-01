import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Admin.module.css";

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("/api/bookings");
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className={styles.container}>
      <h1>View Bookings</h1>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            <p>Booking ID: {booking.id}</p>
            <p>User ID: {booking.userId}</p>
            <p>Flight ID: {booking.flightId}</p>
            <p>Seat ID: {booking.seatId}</p>
            <p>Price: {booking.price}</p>
            <p>Status: {booking.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewBookings;
