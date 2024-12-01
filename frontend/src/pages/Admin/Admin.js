import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./AdminLogin.module.css";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.append("username", formData.username);
    params.append("password", formData.password);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/login`,
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      localStorage.setItem("adminToken", response.data.access_token);
      alert("Đăng nhập thành công!");
      navigate("/admin/manage-flights");
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
