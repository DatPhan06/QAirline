// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import BookTicket from "./pages/Booking/BookTicket";
import ManageTicket from "./pages/Booking/ManageTicket";
import PaymentGuide from "./pages/Booking/PaymentGuide";
import AddOnServices from "./pages/Booking/AddOnServices";
import TicketSchedule from "./pages/Info/TicketSchedule";
import SpecialServices from "./pages/Info/SpecialServices";
import Baggage from "./pages/Info/Baggage";
import CheckIn from "./pages/Info/CheckIn";
import DocumentRequirements from "./pages/Info/DocumentRequirements";
import Airport from "./pages/Info/Airport";
import Destinations from "./pages/Explore/Destinations";
import Offers from "./pages/Explore/Offers";
import FlightExperience from "./pages/Explore/FlightExperience";
import About from "./pages/QAirline/About";
import News from "./pages/QAirline/News";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Booking */}
        <Route path="/booking/book-ticket" element={<BookTicket />} />
        <Route path="/booking/manage-ticket" element={<ManageTicket />} />
        <Route path="/booking/payment-guide" element={<PaymentGuide />} />
        <Route path="/booking/add-on-services" element={<AddOnServices />} />

        {/* Info */}
        <Route path="/info/ticket-schedule" element={<TicketSchedule />} />
        <Route path="/info/special-services" element={<SpecialServices />} />
        <Route path="/info/baggage" element={<Baggage />} />
        <Route path="/info/check-in" element={<CheckIn />} />
        <Route
          path="/info/document-requirements"
          element={<DocumentRequirements />}
        />
        <Route path="/info/airport" element={<Airport />} />

        {/* Explore */}
        <Route path="/explore/destinations" element={<Destinations />} />
        <Route path="/explore/offers" element={<Offers />} />
        <Route
          path="/explore/flight-experience"
          element={<FlightExperience />}
        />

        {/* QAirline */}
        <Route path="/qairline/about" element={<About />} />
        <Route path="/qairline/news" element={<News />} />
      </Routes>
    </Router>
  );
}

export default App;
