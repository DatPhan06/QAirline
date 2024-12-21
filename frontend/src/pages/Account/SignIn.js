import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../../services/userService";
import styles from "./SignIn.module.css";

/**
 * SignIn component renders the sign-in form and handles user authentication.
 *
 * @component
 *
 * @example
 * return (
 *   <SignIn />
 * )
 *
 * @returns {JSX.Element} The SignIn component.
 *
 * @description
 * This component provides a user interface for signing in to the application.
 * It includes fields for username and password, and handles form submission
 * to authenticate the user. It also provides options for OAuth login with
 * Google and GitHub, and links for password recovery, account registration,
 * terms and conditions, support, and customer care.
 *
 * @function
 * @name SignIn
 *
 * @property {Object} formData - The state object containing the username and password.
 * @property {Function} setFormData - The state setter function for formData.
 * @property {Function} navigate - The function to navigate to different routes.
 * @property {Object} location - The location object from react-router.
 * @property {string} location.state.message - The message passed from the previous route.
 *
 * @hook useState - Manages the form data state.
 * @hook useNavigate - Provides navigation functionality.
 * @hook useLocation - Provides access to the location object.
 * @hook useEffect - Handles side effects, such as displaying an alert message.
 *
 * @param {Object} e - The event object.
 * @param {Function} handleInputChange - Handles changes to the input fields.
 * @param {Function} handleSubmit - Handles form submission and user authentication.
 * @param {Function} handleOAuthLogin - Handles OAuth login with the specified provider.
 */
function SignIn() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;

  useEffect(() => {
    if (message) {
      alert(message);
    }
  }, [message]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData.username, formData.password);
      localStorage.setItem("token", response.access_token);
      alert("Đăng nhập thành công!");
      navigate("/");
    } catch (error) {
      console.error("Error during sign in:", error);
      alert(
        error.response?.data?.message ||
          "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin."
      );
    }
  };

  const handleOAuthLogin = (provider) => {
    const baseUrl = "http://localhost:8000/auth";
    window.location.href = `${baseUrl}/${provider}/login`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        {/* Left Side: Image */}
        <div className={styles.imageContainer}>
          <img src="/images/login.png" alt="Login" />
        </div>

        {/* Right Side: Login Form */}
        <div className={styles.formContainer}>
          <h2 className={styles.title}>Đăng nhập</h2>
          <form onSubmit={handleSubmit} className={styles.loginForm}>
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
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleInputChange}
              required
              className={styles.inputField}
            />
            <div className={styles.loginBtFp}>
              <button type="submit" className={styles.submitButton}>
                Đăng nhập
              </button>
              <a href="/account/forgot-password" className={styles.quenMatKhau}>
                Quên mật khẩu?
              </a>
            </div>
          </form>

          {/* Additional Login Options */}
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
              Chưa có tài khoản?
              <a href="/account/signup" className={styles.dangKy}>
                Đăng Ký
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

export default SignIn;
