// frontend/src/PrivateRoute.js

import React from "react";
import { Navigate } from "react-router-dom";

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
