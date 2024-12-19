import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, updateUser, changePassword } from "../../services/userService";
import styles from "./Profile.module.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    full_name: "",
    email: "",
    phone: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
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

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
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

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }
    try {
      await changePassword(
        user.user_id, 
        {
          "current_password": passwordData.currentPassword,
          "new_password": passwordData.newPassword,
        }
      );
      alert("Đổi mật khẩu thành công!");
      setShowPasswordForm(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Đổi mật khẩu thất bại, vui lòng thử lại.");
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
        <button type="submit" className={styles.updateButton}>
          Cập nhật
        </button>
      </form>
      <button
        className={styles.updateButton}
        onClick={() => setShowPasswordForm(!showPasswordForm)}
      >
        Đổi Mật Khẩu
      </button>
      {showPasswordForm && (
        <form onSubmit={handleChangePassword} className={styles.passwordForm}>
          <div className={styles.formGroup}>
            <label>Mật khẩu hiện tại:</label>
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Mật khẩu mới:</label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Xác nhận mật khẩu mới:</label>
            <input
              type="password"
              name="confirmNewPassword"
              value={passwordData.confirmNewPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit" className={styles.updateButton}>
            Đổi Mật Khẩu
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;