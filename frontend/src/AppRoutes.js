import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PrivateAdminRoute from "./components/PrivateAdminRoute";

import Home from "./pages/Home";

// Booking pages
import Booking from "./pages/Booking/Booking";
import BookTicket from "./pages/Booking/BookTicket";
import ManageTicket from "./pages/Booking/ManageTicket";
import PaymentGuide from "./pages/Booking/PaymentGuide";
import CancelTicket from "./pages/Booking/CancelTicket";
import PaymentPage from "./pages/Booking/PaymentPage";
import ConfirmationPage from "./pages/Booking/ConfirmationPage";

// Info pages
import Info from "./pages/Info/Info";
import TicketSchedule from "./pages/Info/TicketSchedule";
import SpecialServices from "./pages/Info/SpecialServices";
import Baggage from "./pages/Info/Baggage";
import CheckIn from "./pages/Info/CheckIn";
import DocumentRequirements from "./pages/Info/DocumentRequirements";
import Airport from "./pages/Info/Airport";

// Explore pages
import Explore from "./pages/Explore/Explore";
import Destinations from "./pages/Explore/Destinations";
import Offers from "./pages/Explore/Offers";
import FlightExperience from "./pages/Explore/FlightExperience";
import PromotionDetail from "./pages/Explore/PromotionDetail";

// QAirline pages
import QAirline from "./pages/QAirline/QAirline";
import About from "./pages/QAirline/About";
import News from "./pages/QAirline/News";
import GeneralInfo from "./pages/QAirline/GeneralInfo";

// Account pages
import Account from "./pages/Account/Account";
import Profile from "./pages/Account/Profile";
import Setting from "./pages/Account/Setting";
import Logout from "./pages/Account/Logout";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";

// Admin pages
import AdminLogin from "./pages/Admin/Admin";
import PostInfo from "./pages/Admin/PostInfo";
import ManageAirplanes from "./pages/Admin/ManageAirplanes";
import ManageFlights from "./pages/Admin/ManageFlights";
import ViewBookings from "./pages/Admin/ViewBookings";
import UpdateFlightTime from "./pages/Admin/UpdateFlightTime";

function AppRoutes() {
  return (
    <Routes>
      {/* Home */}

      <Route path="/" element={<Home />} />

      {/* Booking */}
      <Route path="/booking" element={<Booking />} />
      <Route
        path="/booking/book-ticket"
        element={
          <PrivateRoute>
            <BookTicket />
          </PrivateRoute>
        }
      />
      <Route
        path="/booking/manage-ticket"
        element={
          <PrivateRoute>
            <ManageTicket />
          </PrivateRoute>
        }
      />
      <Route path="/booking/payment-guide" element={<PaymentGuide />} />
      <Route path="/booking/cancel-ticket" element={<CancelTicket />} />
      <Route path="/booking/payment" element={<PaymentPage />} />
      <Route path="/booking/confirmation" element={<ConfirmationPage />} />

      {/* Info */}
      <Route path="/info" element={<Info />} />
      <Route
        path="/info/ticket-schedule"
        element={
          <PrivateRoute>
            <TicketSchedule />
          </PrivateRoute>
        }
      />
      <Route
        path="/info/special-services"
        element={
          <PrivateRoute>
            <SpecialServices />
          </PrivateRoute>
        }
      />
      <Route
        path="/info/baggage"
        element={
          <PrivateRoute>
            <Baggage />
          </PrivateRoute>
        }
      />
      <Route
        path="/info/check-in"
        element={
          <PrivateRoute>
            <CheckIn />
          </PrivateRoute>
        }
      />
      <Route
        path="/info/document-requirements"
        element={
          <PrivateRoute>
            <DocumentRequirements />
          </PrivateRoute>
        }
      />
      <Route
        path="/info/airport"
        element={
          <PrivateRoute>
            <Airport />
          </PrivateRoute>
        }
      />

      {/* Explore */}
      <Route path="/explore" element={<Explore />} />
      <Route path="/explore/destinations" element={<Destinations />} />
      <Route path="/explore/offers" element={<Offers />} />
      <Route path="/explore/flight-experience" element={<FlightExperience />} />
      <Route path="/explore/offers/:id" element={<PromotionDetail />} />

      {/* QAirline */}
      <Route path="/qairline" element={<QAirline />} />
      <Route path="/info/general" element={<GeneralInfo />} />
      <Route path="/qairline/about" element={<About />} />
      <Route path="/qairline/news" element={<News />} />

      {/* Account */}
      <Route path="/account" element={<Account />} />
      <Route
        path="/account/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route path="/account/settings" element={<Setting />} />
      <Route path="/account/logout" element={<Logout />} />
      <Route path="/account/signin" element={<SignIn />} />
      <Route path="/account/signup" element={<SignUp />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route
        path="/admin/post-info"
        element={
          <PrivateAdminRoute>
            <PostInfo />
          </PrivateAdminRoute>
        }
      />
      <Route
        path="/admin/manage-airplanes"
        element={
          <PrivateAdminRoute>
            <ManageAirplanes />
          </PrivateAdminRoute>
        }
      />
      <Route
        path="/admin/manage-flights"
        element={
          <PrivateAdminRoute>
            <ManageFlights />
          </PrivateAdminRoute>
        }
      />
      <Route
        path="/admin/view-bookings"
        element={
          <PrivateAdminRoute>
            <ViewBookings />
          </PrivateAdminRoute>
        }
      />
      <Route
        path="/admin/update-flight-time"
        element={
          <PrivateAdminRoute>
            <UpdateFlightTime />
          </PrivateAdminRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
