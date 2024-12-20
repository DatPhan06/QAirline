import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/userService";
import styles from "./SignUp.module.css";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    full_name: "", // Thêm trường full_name
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert("Đăng ký thành công!");
      navigate("/account/signin");
    } catch (error) {
      console.error("Error during sign up:", error);
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Đăng ký thất bại. Vui lòng thử lại.";
      alert(errorMessage);
    }
  };

  const handleOAuthLogin = (provider) => {
    const baseUrl = "http://localhost:8000/auth";
    window.location.href = `${baseUrl}/${provider}/login`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.signupBox}>
        {/* Left Side: Image */}
        <div className={styles.imageContainer}>
          <img src="/images/login.png" alt="Sign Up" />
        </div>

        {/* Right Side: Sign Up Form */}
        <div className={styles.formContainer}>
          <h2 className={styles.title}>Đăng ký</h2>
          <form onSubmit={handleSubmit} className={styles.signupForm}>
            <input
              type="text"
              name="full_name"
              placeholder="Họ và tên"
              value={formData.full_name}
              onChange={handleInputChange}
              required
              className={styles.inputField}
            />
            <input
              type="text"
              name="username"
              placeholder="Tên đăng nhập"
              value={formData.username}
              onChange={handleInputChange}
              required
              className={styles.inputField}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={styles.inputField}
            />
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleInputChange}
              required
              className={styles.inputField}
            />
            <button type="submit" className={styles.submitButton}>
              Đăng ký
            </button>
          </form>
          <div className={styles.otherLogins}>
            <div className={styles.or}>
              <div className={styles.line1}></div>
              <div className={styles.or2}>Hoặc</div>
              <div className={styles.line2}></div>
            </div>
            <div className={styles.frame3}>
              <img
                className={styles.icon}
                src="/images/google.svg"
                alt="Google"
                onClick={() => handleOAuthLogin("google")}
              />
              <img
                className={styles.icon}
                src="/images/fb.svg"
                alt="Facebook"
              />
              <img
                className={styles.icon}
                src="/images/github.svg"
                alt="GitHub"
                onClick={() => handleOAuthLogin("github")}
              />
            </div>
          </div>

          {/* Footer Links */}
          <div className={styles.frame9}>
            <div className={styles.chuaCoTaiKhoan}>
              Đã có tài khoản?
              <a href="/account/signin" className={styles.dangKy}>
                Đăng nhập
              </a>
            </div>
            <div className={styles.customerCare}>
              <a href="/terms" className={styles.termsConditions}>
                Điều khoản & Điều kiện
              </a>
              <a href="/support" className={styles.support}>
                Hỗ trợ
              </a>
              <a href="/customer-care" className={styles.customerCare2}>
                Chăm sóc khách hàng
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className={styles.line3}></div>
    </div>
  );
}

export default SignUp;
