// frontend/src/pages/Account/Logout.js

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Logout component that handles user logout by removing the token from localStorage
 * and redirecting the user to the sign-in page.
 *
 * This component uses the useEffect hook to perform the logout operation
 * when the component is mounted.
 *
 * @component
 * @example
 * return (
 *   <Logout />
 * )
 */
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
