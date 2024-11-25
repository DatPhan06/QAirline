import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

/**
 * PrivateRoute là một component bảo vệ các route yêu cầu người dùng phải đăng nhập.
 * Nếu người dùng chưa đăng nhập, họ sẽ được chuyển hướng đến trang đăng nhập.
 *
 * @component
 * @param {Object} props - Các thuộc tính được truyền vào component.
 * @param {React.ReactNode} props.children - Các component con sẽ được hiển thị nếu người dùng đã đăng nhập.
 * @returns {React.ReactNode} - Trả về các component con nếu người dùng đã đăng nhập, nếu không sẽ chuyển hướng đến trang đăng nhập.
 */
const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/account/signin"
        replace
        state={{ message: "Bạn cần đăng nhập trước khi sử dụng trang web này" }}
      />
    );
  }

  return children;
};

export default PrivateRoute;
