import React from "react";
import { Navigate } from "react-router-dom";

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
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <Navigate
        to="/account/signin"
        replace
        state={{ message: "Bạn cần đăng nhập trước khi sử dụng trang web này" }}
      />
    );
  }

  // Nếu đã đăng nhập, hiển thị component được bảo vệ
  return children;
};

export default PrivateRoute;
