import React from "react";
import { Link } from "react-router-dom";
import styles from "./AdminSidebar.module.css";

const AdminSidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h2>Admin Menu</h2>
      <ul>
        <li>
          <Link to="/admin/post-info">Post Information</Link>
        </li>
        <li>
          <Link to="/admin/manage-airplanes">Manage Airplanes</Link>
        </li>
        <li>
          <Link to="/admin/manage-flights">Manage Flights</Link>
        </li>
        <li>
          <Link to="/admin/view-bookings">View Bookings</Link>
        </li>
        <li>
          <Link to="/admin/update-flight-time">Update Flight Time</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
