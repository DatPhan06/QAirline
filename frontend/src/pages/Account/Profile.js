import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, updateUser } from "../../services/userService";
import styles from "./Profile.module.css";

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
          date_of_birth: userData.date_of_birth ? userData.date_of_birth.split("T")[0] : "",
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
      <h1 className={styles.title}>Trang Hồ Sơ</h1>
      <form onSubmit={handleSubmit} className={styles.profileForm}>
        <div className={styles.formGroup}>
          <label>Tên đăng nhập:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            readOnly
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
          />
        </div>
        <div className={styles.formGroup}>
          <label>Số điện thoại:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Địa chỉ:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Ngày sinh:</label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className={styles.updateButton}>
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default Profile;