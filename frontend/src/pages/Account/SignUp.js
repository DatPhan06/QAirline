import React, { useState } from "react";
import bcryptjs from "bcryptjs"; // Ensure bcryptjs is installed
import axios from "axios";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    full_name: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Hash the password on the frontend
    const hashedPassword = await bcryptjs.hash(formData.password, 10);

    // Create a new form data object with the hashed password
    const dataToSend = {
      ...formData,
      password: hashedPassword,
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/users/register`,
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Đăng ký thành công!");
    } catch (error) {
      console.error("Error during sign up:", error);
      alert("Đăng ký thất bại, vui lòng thử lại.");
    }
  };

  return (
    <div>
      <h1>Đăng Ký</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Họ và tên"
          value={formData.full_name}
          onChange={(e) =>
            setFormData({ ...formData, full_name: e.target.value })
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
        <button type="submit">Đăng Ký</button>
      </form>
    </div>
  );
}

export default SignUp;
