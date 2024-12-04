import React, { useState } from "react";
import axios from "axios";
import styles from './SignUp.module.css';
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    full_name: "",
    password: "",
  });

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/users/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Đăng ký thành công!");
      navigate("/account/signin");
    } catch (error) {
      console.error("Error during sign up:", error);
      alert("Đăng ký thất bại, vui lòng thử lại.");
    }
  };

  return (
    <div
      className={styles.signup}
      style={{
        background: `url(/images/air2.jpg) center`,
      backgroundSize: "cover",  // Thay 'cover' bằng 'contain' để vừa khung
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center", // Đảm bảo hình ảnh được căn giữa
      }}
    >
      <div className={styles["frame-2"]}>
        <div className={styles["frame-5"]}>
          <div className={styles["frame-4"]}>
            <div className={styles["upper-section"]}>
              <div className={styles["login-text"]}>
                <div className={styles["ng-k-ngay"]}>ĐĂNG KÝ NGAY !</div>
                <div className={styles["just-some-details-to-get-you-in"]}>
                  Just some details to get you in!
                </div>
                <br></br>
              </div>
              <div className={styles.credentials}>
                <div className={styles.username}>
                  <input
                    className={styles["t-n-ng-nh-p"]}
                    type="text"
                    placeholder="Tên đăng nhập"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                  />
                </div>
                <div className={styles.username}>
                  <input
                    className={styles.email}
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className={styles["password-rem"]}>
                  <div className={styles.password}>
                    <input
                      className={styles["h-v-t-n"]}
                      type="text"
                      placeholder="Họ và tên"
                      value={formData.full_name}
                      onChange={(e) =>
                        setFormData({ ...formData, full_name: e.target.value })
                      }
                    />
                  </div>
                  <div className={styles.password}>
                    <input
                      className={styles["m-t-kh-u"]}
                      type="password"
                      placeholder="Mật khẩu"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className={styles["login-bt-fp"]}>
                  <div className={styles.login}>
                    <div type="submit" className={styles["signup2"]} onClick={handleSubmit}>
                      Đăng Ký
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["other-logins"]}>
              <div className={styles.or}>
                <div className={styles["line-1"]}></div>
                <div className={styles.or2}>Or</div>
                <div className={styles["line-2"]}></div>
              </div>
              <div className={styles["frame-3"]}>
                <img className={styles["devicon-google"]} src="/images/google.svg" />
                <img className={styles["logos-facebook"]} src="/images/fb.svg" />
                <img className={styles["bi-github"]} src="/images/github.svg" />
              </div>
            </div>
          </div>
          <div className={styles["frame-9"]}>
            <div className={styles["b-n-c-t-i-kho-n-ng-nh-p"]}>
              Bạn đã có tài khoản? 
              <a href="/account/signin" className={styles.subMenuLink}>
                Đăng Nhập
              </a>
            </div>
            <div className={styles["customer-care"]}>
              <div className={styles["frame-6"]}>
                <div className={styles["terms-conditions"]}>Terms &amp; Conditions</div>
              </div>
              <div className={styles["frame-7"]}>
                <div className={styles.support}>Support</div>
              </div>
              <div className={styles["frame-8"]}>
                <div className={styles["customer-care2"]}>Customer Care</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["line-3"]}></div>
    </div>
  );
}

export default SignUp;