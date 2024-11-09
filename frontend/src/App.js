import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./AppRoutes"; // Import the new Routes component

import "./styles/global.css";
import "./styles/variables.css";

function App() {
  return (
    <Router>
      <Navbar />
      <AppRoutes />
    </Router>
  );
}

export default App;
