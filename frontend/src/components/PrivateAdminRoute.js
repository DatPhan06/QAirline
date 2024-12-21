import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

/**
 * PrivateAdminRoute component to protect admin routes.
 *
 * This component checks if the user is authenticated as an admin by verifying
 * the presence of a valid admin token in local storage and making an API call
 * to validate the token. If the user is authenticated, it renders the child
 * components; otherwise, it redirects to the admin login page.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render if authenticated.
 * @returns {React.ReactNode} The rendered component.
 *
 * @example
 * <PrivateAdminRoute>
 *   <AdminDashboard />
 * </PrivateAdminRoute>
 */
const PrivateAdminRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          setIsAuthenticated(false);
          return;
        }

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/admin/me`,
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
        console.error("Error checking admin authentication:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/admin" />;
};

export default PrivateAdminRoute;
