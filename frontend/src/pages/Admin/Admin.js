import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../services/adminService";
import styles from "./AdminLogin.module.css";

/**
 * AdminLogin component renders a login form for admin users.
 * It handles form submission, performs admin login, and navigates to the admin dashboard upon successful login.
 *
 * @component
 * @example
 * return (
 *   <AdminLogin />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @function
 * @name AdminLogin
 *
 * @description
 * - Initializes form data state with username and password fields.
 * - Uses `useNavigate` hook for navigation.
 * - Handles form submission with `handleSubmit` function.
 * - On successful login, stores the admin token in localStorage and navigates to the admin dashboard.
 * - On login failure, displays an error message.
 *
 * @requires useState from 'react'
 * @requires useNavigate from 'react-router-dom'
 * @requires loginAdmin from 'path/to/loginAdmin'
 * @requires styles from 'path/to/styles'
 */
const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  // useEffect(() => {
  //   // Kiểm tra token khi component được mount
  //   const token = localStorage.getItem("adminToken");
  //   if (token) {
  //     navigate("/admin/post-info");
  //   }
  // }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginAdmin(formData.username, formData.password);
      localStorage.setItem("adminToken", response.access_token);
      alert("Đăng nhập thành công!");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error during admin login:", error);
      alert("Đăng nhập thất bại, vui lòng thử lại.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h1 className={styles.title}>Admin Đăng Nhập</h1>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          className={styles.inputField}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className={styles.inputField}
          required
        />
        <button type="submit" className={styles.submitButton}>
          Đăng Nhập
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
