import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./AppRoutes";
import Banner from "./components/Banner";
import Layout from "./components/Layout";

import "./styles/global.css";
import "./styles/variables.css";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && (
        <>
          <Banner />
          <Navbar />
        </>
      )}
      <AppRoutes />
      {!isAdminRoute && <Footer />}
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <Layout>
        <App />
      </Layout>
    </Router>
  );
}

export default AppWrapper;
