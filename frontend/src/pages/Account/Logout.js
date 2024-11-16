// frontend/src/pages/Account/Logout.js

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Xóa token khỏi localStorage
    localStorage.removeItem("token");
    // Chuyển hướng về trang đăng nhập
    navigate("/account/signin");
  }, [navigate]);

  return null;
}

export default Logout;
