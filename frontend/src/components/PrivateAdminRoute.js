import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

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
