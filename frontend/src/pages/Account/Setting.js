import React, { useState, useEffect } from "react";
import { changePassword } from "../../services/userService";
import styles from "./Setting.module.css";

const Setting = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [language, setLanguage] = useState("vi");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
    document.body.classList.toggle("dark-mode", savedDarkMode);
  }, []);

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
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

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    // Add logic to change the language of the application
  };

  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.body.classList.toggle("dark-mode", newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trang Cài Đặt</h1>
      <div className={styles.settingSection}>
        <div className={styles.darkModeSetting}>
          <label>Chế độ tối:</label>
          <div
            className={`${styles.darkModeToggle} ${darkMode ? "active" : ""}`}
            onClick={handleDarkModeToggle}
          ></div>
        </div>
        <div className={styles.languageSetting}>
          <label>Ngôn ngữ:</label>
          <select value={language} onChange={handleLanguageChange}>
            <option value="vi">Tiếng Việt</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
      <form onSubmit={handleChangePassword} className={styles.settingSection}>
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
    </div>
  );
};

export default Setting;
