// components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/booking">Booking</Link>
          <ul>
            <li>
              <Link to="/booking/book-ticket">Book Ticket</Link>
            </li>
            <li>
              <Link to="/booking/manage-ticket">Manage Ticket</Link>
            </li>
            <li>
              <Link to="/booking/payment-guide">Payment Guide</Link>
            </li>
            <li>
              <Link to="/booking/add-on-services">Add-on Services</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/info">Info</Link>
          <ul>
            <li>
              <Link to="/info/ticket-schedule">Ticket & Schedule</Link>
            </li>
            <li>
              <Link to="/info/special-services">Special Services</Link>
            </li>
            <li>
              <Link to="/info/baggage">Baggage</Link>
            </li>
            <li>
              <Link to="/info/check-in">Check-In</Link>
            </li>
            <li>
              <Link to="/info/document-requirements">
                Document Requirements
              </Link>
            </li>
            <li>
              <Link to="/info/airport">Airport</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/explore">Explore</Link>
          <ul>
            <li>
              <Link to="/explore/destinations">Destinations</Link>
            </li>
            <li>
              <Link to="/explore/offers">Offers</Link>
            </li>
            <li>
              <Link to="/explore/flight-experience">Flight Experience</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/qairline">QAirline</Link>
          <ul>
            <li>
              <Link to="/qairline/about">About</Link>
            </li>
            <li>
              <Link to="/qairline/news">News</Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
