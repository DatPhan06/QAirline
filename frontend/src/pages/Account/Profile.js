import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, updateUser } from "../../services/userService";
import styles from "./Profile.module.css";

/**
 * Profile component that displays and allows updating user profile information.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * return <Profile />
 *
 * @description
 * This component fetches the current user's data on mount and populates a form with the user's profile information.
 * The user can update their full name, email, phone number, address, and date of birth. The username field is read-only.
 * On form submission, the updated data is sent to the server.
 *
 * @function
 * @name Profile
 *
 * @requires useState
 * @requires useEffect
 * @requires useNavigate
 * @requires getCurrentUser
 * @requires updateUser
 *
 * @typedef {Object} FormData
 * @property {string} username - The username of the user.
 * @property {string} full_name - The full name of the user.
 * @property {string} email - The email address of the user.
 * @property {string} phone - The phone number of the user.
 * @property {string} address - The address of the user.
 * @property {string} date_of_birth - The date of birth of the user.
 */
const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    full_name: "",
    email: "",
    phone: "",
    address: "",
    date_of_birth: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
        setFormData({
          username: userData.username,
          full_name: userData.full_name,
          email: userData.email,
          phone: userData.phone || "",
          address: userData.address || "",
          date_of_birth: userData.date_of_birth
            ? userData.date_of_birth.split("T")[0]
            : "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(user.user_id, formData);
      alert("Cập nhật thông tin thành công!");
      navigate("/account/profile");
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("Cập nhật thông tin thất bại, vui lòng thử lại.");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        {/* Left Side: Image */}
        <div className={styles.imageContainer}>
          <img src="/images/login.png" alt="Login" />
        </div>

        {/* Right Side: Profile Form */}
        <div className={styles.formContainer}>
          <h2 className={styles.title}>THÔNG TIN HỒ SƠ</h2>
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.formGroup}>
              <label>Tên đăng nhập:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                readOnly
                className={styles.inputField}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Họ và tên:</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                className={styles.inputField}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.inputField}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Số điện thoại:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Địa chỉ:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Ngày sinh:</label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              Cập nhật
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
