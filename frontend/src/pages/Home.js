import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import FlightSearch from "../components/FlightSearch";
import FlightList from "../components/FlightList";
import Slideshow from "../components/SlideShow";
import ChatBot from "../components/ChatBot";
import { getFlights } from "../services/flightService";

const Home = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const flightsData = await getFlights();
        setFlights(flightsData);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, []);

  const slideshowImages = [
    "/images/tlan.png",
    "/images/danang.png",
    "/images/bali.png",
  ];

  const popularDestinations = [
    {
      id: 1,
      name: "Hà Nội",
      image: "/images/hanoi.jpeg",
    },
    {
      id: 2,
      name: "Tokyo",
      image: "/images/tokyo.jpeg",
    },
  ];

  return (
    <div className={styles.containerAll}>
      <div className={styles.homeContainer}>
        <div className={styles.leftSection}>
          <Slideshow images={slideshowImages} />
          <div className={styles.hashtagBar}>
            <span>#QAirline</span>
            <span>#FlyHigh</span>
            <span>#TravelWithUs</span>
            <span>#QualityService</span>
            <span>#SafetyFirst</span>
          </div>
          <FlightList flights={flights} />
        </div>

        <div className={styles.rightSection}>
          <FlightSearch />
          <div className={styles.emailSignup}>
            <h3>Đăng ký nhận thông tin</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Nhập email của bạn" />
              <button type="submit">Đăng ký</button>
            </form>
          </div>

          <div className={styles.popularDestinations}>
            <h3>Điểm đến phổ biến</h3>
            <div className={styles.destinationList}>
              {popularDestinations.map((dest) => (
                <div key={dest.id} className={styles.destinationItem}>
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className={styles.destinationImage}
                  />
                  <div className={styles.destinationInfo}>
                    <h4>{dest.name}</h4>
                  </div>
                </div>
              ))}
            </div>
            <button className={styles.viewAllButton}>
              Xem tất cả điểm đến
            </button>
          </div>
        </div>
      </div>
      <ChatBot />
    </div>
  );
};

export default Home;
