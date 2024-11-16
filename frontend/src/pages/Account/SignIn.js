import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function SignIn() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

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

    // Tạo dữ liệu dạng form-encoded
    const params = new URLSearchParams();
    params.append("username", formData.username);
    params.append("password", formData.password);

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
      // Chuyển hướng đến trang hồ sơ cá nhân hoặc trang mong muốn
      navigate("/account/profile");
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };

  return (
    <div>
      <h1>Đăng Nhập</h1>
      {/* {message && <p>{message}</p>} */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email hoặc Tên đăng nhập"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button type="submit">Đăng Nhập</button>
      </form>
    </div>
  );
}

export default SignIn;
