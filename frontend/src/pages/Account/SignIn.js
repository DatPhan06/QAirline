import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bcryptjs from "bcryptjs"; // Ensure bcryptjs is installed
import axios from "axios";
import styles from "./SignIn.module.css";

function SignIn() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const message = state?.message;

  useEffect(() => {
    if (message) {
      alert(message);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hashedPassword = await bcryptjs.hash(formData.password, 10);

    const params = new URLSearchParams();
    params.append("username", formData.username);
    params.append("password", hashedPassword);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      localStorage.setItem("token", response.data.access_token);
      alert("Đăng nhập thành công!");
      navigate("/account/profile");
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };

  return (
    <div className={styles.signInContainer}>
      {/* Form */}
      <form onSubmit={handleSubmit} className={styles.signInForm}>
        {/* Logo */}
        <img src="/images/logo.png" alt="Logo" className={styles.logo} />

        {/* Tiêu đề */}
        <h1 className={styles.title}>Đăng Nhập</h1>
        <input
          type="text"
          placeholder="Email hoặc Tên đăng nhập"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          className={styles.inputField}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className={styles.inputField}
        />
        <button type="submit" className={styles.submitButton}>
          Đăng Nhập
        </button>
        <a href="#" className={styles.link}>
          Quên mật khẩu?
        </a>
      </form>
    </div>
  );
}

export default SignIn;
