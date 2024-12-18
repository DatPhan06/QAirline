import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FlightSearch.module.css";
import { getAirports } from "../services/airportService";
import { getFlights } from "../services/flightService";
import FlightList from "./FlightList";

const FlightSearch = () => {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState("");
  const [returnDate, setReturnDate] = useState(""); // Ngày về (nếu cần)
  const [airports, setAirports] = useState([]);
  const [flights, setFlights] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [airportsData, flightsData] = await Promise.all([
          getAirports(),
          getFlights(),
        ]);
        setAirports(airportsData);
        setFlights(flightsData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!departure || !arrival || !date) {
      alert("Vui lòng điền đầy đủ thông tin tìm kiếm");
      return;
    }

    const filteredFlights = flights.filter(
      (flight) =>
        flight.departure_airport.city === departure &&
        flight.arrival_airport.city === arrival &&
        flight.departure_time.split("T")[0] === date
    );

    if (filteredFlights.length === 0) {
      alert("Không tìm thấy chuyến bay phù hợp.");
    } else {
      setFlights(filteredFlights);
    }
  };

  const handleFlightSelect = (selectedFlight) => {
    navigate("/booking/book-ticket", {
      state: {
        flight: selectedFlight,
      },
    });
  };

  return (
    <div className={styles.flightSearchContainer}>
      <h2 className={styles.title}>Tìm kiếm Chuyến Bay</h2>
      <form onSubmit={handleSearch} className={styles.searchForm}>
          {/* Container cho phần "Từ" và "Đến" */}
          <div className={styles.fromToContainer}>
            <div className={styles.formGroup}>
              <label htmlFor="departure" className={styles.label}>Từ</label>
              <select
                  id="departure"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                  className={styles.select}
              >
                  <option value="">Chọn điểm đi</option>
                    {airports.map((airport) => (
                      <option key={airport.airport_id} value={airport.city}>
                        {airport.city}
                      </option>
                    ))}
                  </select>
            </div>


              <div className={styles.formGroup}>
                <label htmlFor="arrival" className={styles.label}>Đến</label>
                <select
                    id="arrival"
                    value={arrival}
                    onChange={(e) => setArrival(e.target.value)}
                    className={styles.select}
                >
                      <option value="">Chọn điểm đến</option>
                      {airports.map((airport) => (
                        <option key={airport.airport_id} value={airport.city}>
                          {airport.city}
                        </option>
                      ))}
                </select>
              </div>
          </div>

          {/* Container cho phần Ngày đi và Ngày về */}
          <div className={styles.dateContainer}>
            <div className={styles.formGroup}>
              <label htmlFor="date" className={styles.label}>Ngày đi</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="returnDate" className={styles.label}>Ngày về</label>
              <input
                type="date"
                id="returnDate"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          <button type="submit" className={styles.searchButton}>
            Tìm chuyến bay
          </button>

      </form>
    </div>
  );
};

export default FlightSearch;
