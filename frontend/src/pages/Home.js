import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import FlightSearch from "../components/FlightSearch"; // Import component mới
import Slideshow from "../components/SlideShow"; 

const Home = () => {
  const slideshowImages = [
    "/images/hanoi.jpeg",
    "/images/bangkok.jpg",
    "/images/airwayover.jpg",
  ];

  return (
    <div className={styles["landing-page"]}>
      <div className={styles.contentContainer}>

          {/*Section 1 : Background and Search bar*/}
          <div className = {styles.section1}> 
              {/*Chiếu hình ảnh background liên tục*/}
              <Slideshow images={slideshowImages} interval={5000} />
              {/*Tìm kiếm chuyến bay*/}
              <div className={styles.searchSection}>
                <FlightSearch />
              </div>
              <div className={styles["bookBtncontainer"]}>
                  <Link to="/booking/book-ticket">
                    <button className={styles.bookBtn}>ĐẶT VÉ NGAY</button>
                  </Link>
              </div>
          </div>


          {/*Section 2 : Các điểm đến */}
          <div className={styles["section2"]}>
            <div className={styles["locationHeader"]}>
              <div className={styles["textHeader"]}>
                <div className={styles["headerMain"]}> ĐIỂM ĐẾN YÊU THÍCH </div>
                <div className={styles["headerDes"]}> Tìm kiếm chuyến bay &amp; thuê khách sạn tại những điểm đến phổ biến nhất của chúng tôi. </div>
              </div>
              <div className={styles["buttonHeader2"]}>
                  <Link to="/explore/destinations">
                    <button className={styles["button2"]}> Khám phá các địa điểm khác </button>
                  </Link>
              </div>
            </div>

            <div className={styles["locationInfo"]}>
            </div>
          </div>


        {/*Section 3 : Ảnh đại diện Flight & Hotel */}
        <div className={styles["section3"]}>
          <div className={styles["flightImg"]}>
            <img
              className={styles["rectangle-40"]}
              src="/images/airways.png"
              alt="Flights"
            />
            <div className={styles["frame-2608785"]}>
              <div className={styles["rectangle-32"]}></div>
              <div className={styles["frame-2608784"]}>
                <div className={styles["frame-2608786"]}>
                  <div className={styles["flights2"]}>Flights</div>
                  <div className={styles["search-flights"]}>
                    Search Flights &amp; Places Hire to our most popular
                    destinations
                  </div>
                </div>
                <div className={styles["button"]}>
                  <div className={styles["style-layer"]}>
                    <img
                      className={styles["paper-plane2"]}
                      src="/images/cursor.png"
                      alt="Paper Plane"
                    />
                    <div className={styles["button2"]}>Show Flights</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles["hotelImg"]}>
            <img
              className={styles["rectangle-41"]}
              src="/images/hotel.png"
              alt="Hotels"
            />
            <div className={styles["frame-26087862"]}>
              <div className={styles["rectangle-322"]}></div>
              <div className={styles["frame-2608784"]}>
                <div className={styles["frame-2608786"]}>
                  <div className={styles["hotels2"]}>Hotels</div>
                  <div className={styles["search-hotels"]}>
                    Search hotels &amp; Places Hire to our most popular
                    destinations
                  </div>
                </div>
                <div className={styles["button"]}>
                  <div className={styles["style-layer"]}>
                    <img
                      className={styles["paper-plane3"]}
                      src="/images/cursor.png"
                      alt="Paper Plane"
                    />
                    <div className={styles["button2"]}>Show Hotels</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;