import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
      navigate("/account/profile");
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };

  return (
    <div
    className={styles.login}
    style={{
      background: `url(/images/air2.jpg) center`,
      backgroundSize: "cover",  // Thay 'cover' bằng 'contain' để vừa khung
      backgroundRepeat: "no-repeat",
    backgroundPosition: "center", // Đảm bảo hình ảnh được căn giữa
    }}
  >
    {/* Welcome back message */}
    <div className={styles.welcomeBack}>Welcome Back .!</div>

    {/* Main container */}
    <div className={styles.frame1}>
      <div className={styles.vuiTangChuyenBay}>Vui từng chuyến bay!</div>
    </div>

    {/* Login form container */}
    <div className={styles.frame2}>
      <div className={styles.frame5}>
        <div className={styles.frame4}>
          <div className={styles.upperSection}>
            {/* Login Text */}
            <div className={styles.loginText}>
              <div className={styles.dangNhap}>ĐĂNG NHẬP</div>
              <div className={styles.gladYouBack}>Glad you’re back.!</div>
            </div>

            {/* Credentials Section */}
            <div className={styles.credentials}>
              <div className={styles.username}>
                <input
                  type="text"
                  placeholder="Email hoặc Tên đăng nhập"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className={styles.tenDangNhap}
                />
              </div>

              <div className={styles.passwordRem}>
                <div className={styles.password}>
                  <input
                      type="password"
                      placeholder="Mật khẩu"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className={styles.matKhau}
                    />
                </div>
              </div>

              {/* Submit and Forgot Password */}
              <div className={styles.loginBtFp}>
                <div className={styles.login2}>
                  <div type="submit"
                        className={styles.dangNhap2} 
                        onClick = {handleSubmit}>
                    Đăng nhập</div>
                </div>
                <div className={styles.quenMatKhau}>Quên mật khẩu?</div>
              </div>
            </div>
          </div>

          {/* Other Logins (Google, Facebook, GitHub) */}
          <div className={styles.otherLogins}>
            <div className={styles.or}>
              <div className={styles.line1}></div>
              <div className={styles.or2}>Or</div>
              <div className={styles.line2}></div>
            </div>
            <div className={styles.frame3}>
              <img className={styles.deviconGoogle} src="/images/google.svg" alt="Google" />
              <img className={styles.logosFacebook} src="/images/fb.svg" alt="Facebook" />
              <img className={styles.biGithub} src="/images/github.svg" alt="GitHub" />
            </div>
          </div>
        </div>

        {/* Sign up section */}
        <div className={styles.frame9}>
          <div className={styles.chuaCoTaiKhoan}>Chưa có tài khoản? 
            <a href="/account/signup" className={styles.subMenuLink}>
                  Đăng Ký
                </a>
            </div>
          <div className={styles.customerCare}>
            <div className={styles.frame6}>
              <div className={styles.termsConditions}>Terms &amp; Conditions</div>
            </div>
            <div className={styles.frame7}>
              <div className={styles.support}>Support</div>
            </div>
            <div className={styles.frame8}>
              <div className={styles.customerCare2}>Customer Care</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Line at the bottom */}
    <div className={styles.line3}></div>
  </div>
  );
}

export default SignIn;
