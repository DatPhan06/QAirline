import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const TicketSchedule = () => {
  return (
    <div className={styles["landing-page"]}>
      <img className={styles["rectangle-31"]} src="/images/cloud.png" alt="Background" />
      <div className={styles["frame-38"]}>
        <div className={styles["line-4"]}></div>
        <div className={styles["frame-2608739"]}>
          <div className={styles["frame-2608738"]}>
            <div className={styles["frame-2608721"]}>
              <img className={styles["airplane"]} src="/images/airicon.png" alt="Airplane" />
              <div className={styles["chuy-n-bay"]}>Chuyến bay</div>
            </div>
            <div className={styles["line-1"]}></div>
            <br></br>
            <br></br>
            <br></br>
          </div>
          <div className={styles["frame-40"]}>
            <div className={styles["text-field"]}>
              <div className={styles["text-field2"]}>
                <div className={styles["state-layer"]}>
                  <div className={styles["content"]}>
                    <div className={styles["input-text"]}>
                      <div className={styles["input-text2"]}>Lahore - Karachi</div>
                    </div>
                    <div className={styles["label-text"]}>
                      <div className={styles["label-text2"]}>Điểm đi</div>
                    </div>
                  </div>
                  <div className={styles["trailing-icon"]}></div>
                </div>
              </div>
            </div>
            <div className={styles["text-field3"]}>
              <div className={styles["text-field2"]}>
                <div className={styles["state-layer"]}>
                  <div className={styles["content"]}>
                    <div className={styles["input-text"]}>
                      <div className={styles["input-text2"]}>Lahore - Karachi</div>
                    </div>
                    <div className={styles["label-text"]}>
                      <div className={styles["label-text2"]}>Điểm đến</div>
                    </div>
                  </div>
                  <div className={styles["trailing-icon"]}></div>
                </div>
              </div>
            </div>
            <div className={styles["text-field4"]}>
              <div className={styles["text-field2"]}>
                <div className={styles["state-layer2"]}>
                  <div className={styles["content"]}>
                    <div className={styles["input-text"]}>
                      <div className={styles["input-text2"]}>17/12/2024</div>
                    </div>
                    <div className={styles["label-text"]}>
                      <div className={styles["label-text3"]}>Ngày bay</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["text-field5"]}></div>
          </div>
        </div>
        <div className={styles["frame-46"]}>
          <div className={styles["button"]}>
            <div className={styles["style-layer"]}>
              <img className={styles["paper-plane"]} src="/images/cursor.png" alt="Paper Plane" />
              <div className={styles["button2"]}>Show Flights</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["frame-2608753"]}>
        <div className={styles["frame-2608752"]}>
          <div className={styles["helping-others"]}></div>
          <div className={styles["live-travel"]}>Live &amp; Travel</div>
        </div>
        <div className={styles["special-offers-to-suit-your-plan"]}>
          Hãy cùng QAirline, vui từng chuyến bay!
        </div>
        <div className={styles["button-container"]}>
          <Link to="/booking/book-ticket">
                <button className={styles.bookBtn}>ĐẶT VÉ NGAY</button>
            </Link>
        </div>
      </div>
      <div className={styles["frame-79"]}>
        <div className={styles["frame-47"]}>
          <div className={styles["frame-19"]}>
            <div className={styles["i-m-n-y-u-th-ch"]}>ĐIỂM ĐẾN YÊU THÍCH</div>
            <div className={styles["search-flights-places-hire-to-our-most-popular-destinations"]}>
              Search Flights &amp; Places Hire to our most popular destinations
            </div>
          </div>
          <div className={styles["button"]}>
            <div className={styles["frame-2"]}>
              <div className={styles["button2"]}>See more places</div>
            </div>
          </div>
        </div>

        <div className={styles["frame-2608773"]}>
        <div className={styles["frame-194"]}>
          <div className={styles["frame-192"]}>
            <div className={styles["frame-74"]}>
              <img className={styles["rectangle-3"]} src="/images/hanoi.jpeg" />
            </div>
            <div className={styles["frame-196"]}>
              <div className={styles["istanbul-turkey"]}>Hà Nội, Việt Nam</div>
              <div className={styles["frame-2608766"]}>
                <div className={styles["flights"]}>Flights</div>
                <div className={styles["div"]}>•</div>
                <div className={styles["hotels"]}>Hotels</div>
                <div className={styles["div"]}>•</div>
                <div className={styles["resorts"]}>Resorts</div>
              </div>
            </div>
          </div>
          <div className={styles["frame-195"]}>
            <div  className={styles["frame-197"]}>
              <img  className={styles["rectangle-3"]} src="rectangle-31.png" />
            </div>
            <div className={styles["frame-196"]}>
              <div className={styles["sydney-australia"]}>Sydney, Australia</div>
              <div className={styles["frame-2608766"]}>
                <div className={styles["flights"]}>Flights</div>
                <div className={styles["div"]}>•</div>
                <div className={styles["hotels"]}>Hotels</div>
                <div className={styles["div"]}>•</div>
                <div className={styles["resorts"]}>Resorts</div>
              </div>
            </div>
          </div>
          <div className={styles["frame-1962"]}>
            <div className={styles["frame-197"]}>
              <img className={styles["rectangle-4"]} src="rectangle-40.png" />
            </div>
            <div className={styles["frame-196"]}>
              <div className={styles["baku-azerbaijan"]}>Baku, Azerbaijan</div>
              <div className={styles["frame-2608766"]}>
                <div className={styles["flights"]}>Flights</div>
                <div className={styles["div"]}>•</div>
                <div className={styles["hotels"]}>Hotels</div>
                <div className={styles["div"]}>•</div>
                <div className={styles["resorts"]}>Resorts</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["frame-1963"]}>
          <div className={styles["frame-192"]}>
            <div className={styles["frame-74"]}>
              <img className={styles["rectangle-4"]} src="rectangle-41.png" />
            </div>
            <div className={styles["frame-196"]}>
              <div className={styles["mal-maldives"]}>Malé, Maldives</div>
              <div className={styles["frame-2608766"]}>
                <div className={styles["flights"]}>Flights</div>
                <div className={styles["div"]}>•</div>
                <div className={styles["hotels"]}>Hotels</div>
                <div className={styles["div"]}>•</div>
                <div className={styles["resorts"]}>Resorts</div>
              </div>
            </div>
          </div>
          <div className={styles["frame-195"]}>
            <div className={styles["frame-197"]}>
              <img className={styles["rectangle-3"]} src="rectangle-32.png" />
            </div>
            <div className={styles["frame-196"]}>
              <div className={styles["paris-france"]}>Paris, France</div>
              <div className={styles["frame-2608766"]}>
                <div className={styles["flights"]}>Flights</div>
                <div className={styles["div"]}>•</div>
                <div className={styles["hotels"]}>Hotels</div>
                <div className={styles["div"]}>•</div>
                <div className={styles["resorts"]}>Resorts</div>
              </div>
            </div>
          </div>
          <div className={styles["frame-1962"]}>
            <div className={styles["frame-197"]}>
              <img className={styles["rectangle-4"]} src="rectangle-42.png" />
            </div>
            <div className={styles["frame-196"]}>
              <div className={styles["new-york-us"]}>New York, US</div>
              <div className={styles["frame-2608766"]}>
                <div className={styles["flights"]}>Flights</div>
                <div className={styles["div"]}>•</div>
                <div className={styles["hotels"]}>Hotels</div>
                <div className={styles["div"]}>•</div>
                <div className={styles["resorts"]}>Resorts</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["frame-1972"]}>
          <div className={styles["frame-192"]}>
            <div className={styles["frame-197"]}>
              <img className={styles["rectangle-3"]} src="rectangle-33.png" />
            </div>
            <div className={styles["frame-196"]}>
              <div className={styles["london-uk"]}>London, UK</div>
              <div className={styles["frame-2608766"]}>
                <div className={styles["flights"]}>Flights</div>
                <div className={styles["div"]}>•</div>
                <div className={styles["hotels"]}>Hotels</div>
                <div className={styles["div"]}>•</div>
                <div className={styles["resorts"]}>Resorts</div>
              </div>
            </div>
          </div>
          <div className={styles["frame-195"]}>
            <div className={styles["frame-198"]}>
              <img className={styles["rectangle-3"]} src="rectangle-34.png" />
            </div>
            <div className={styles["frame-196"]}>
              <div className={styles["tokyo-japan"]}>Tokyo, Japan</div>
              <div className={styles["frame-2608766"]}>
                <div className={styles["flights"]}>Flights</div>
                <div className={styles["div"]}>•</div>
                <div className={styles["hotels"]}>Hotels</div>
                <div className={styles["div"]}>•</div>
                <div className={styles["resorts"]}>Resorts</div>
              </div>
            </div>
          </div>
          <div className={styles["frame-1962"]}>
            <div className={styles["frame-197"]}>
              <img className={styles["rectangle-4"]} src="rectangle-43.png" />
            </div>
            <div className={styles["frame-196"]}>
              <div className={styles["dubai-uae"]}>Dubai, UAE</div>
              <div className={styles["frame-2608766"]}>
                <div className={styles["flights"]}>Flights</div>
                <div className={styles["div"]}>•</div>
                <div className={styles["hotels"]}>Hotels</div>
                <div className={styles["div"]}>•</div>
                <div className={styles["resorts"]}>Resorts</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      </div>
      <div className={styles["frame-2608775"]}>
        <div className={styles["frame-2608770"]}>
          <div className={styles["frame-19"]}>
            <div className={styles["reviews"]}>Reviews</div>
            <div className={styles["what-people-says-about-golobe-facilities"]}>
              What people says about Golobe facilities
            </div>
          </div>
          <div className={styles["button"]}>
            <div className={styles["frame-2"]}>
              <div className={styles["button2"]}>See All</div>
            </div>
          </div>
        </div>
        <div className={styles["frame-2608774"]}>
          {/* Repeat similar structure for all reviews */}
          {/* Example for one review: */}
          <div className={styles["frame-2608767"]}>
            <div className={styles["rectangle-37"]}></div>
            <div className={styles["frame-2608764"]}>
              <div className={styles["frame-2608763"]}>
                <div className={styles["frame-2608756"]}>
                  <div className={styles["a-real-sense-of-community-nurtured"]}>
                    “A real sense of community, nurtured”
                  </div>
                  <div className={styles["frame-2608757"]}>
                    <div className={styles["really-appreciate-the-help-and-support-from-the-staff-during-these-tough-times-shoutout-to-katie-for-helping-me-always-even-when-i-was-out-of-the-country-and-always-available-when-needed"]}>
                      Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.
                    </div>
                    <div className={styles["view-more"]}>View more</div>
                  </div>
                </div>
                <div className={styles["frame-2608762"]}>
                  <div className={styles["frame-2608758"]}>
                    <img className={styles["ion-star"]} src="ion-star0.svg" alt="Star" />
                    <img className={styles["ion-star2"]} src="ion-star1.svg" alt="Star" />
                    <img className={styles["ion-star3"]} src="ion-star2.svg" alt="Star" />
                    <img className={styles["ion-star4"]} src="ion-star3.svg" alt="Star" />
                    <img className={styles["ion-star5"]} src="ion-star4.svg" alt="Star" />
                  </div>
                  <div className={styles["frame-2608759"]}>
                    <div className={styles["frame-2608761"]}>
                      <div className={styles["olga"]}>Olga</div>
                      <div className={styles["weave-studios-kai-tak"]}>Weave Studios – Kai Tak</div>
                    </div>
                    <div className={styles["frame-2608760"]}>
                      <img className={styles["flat-color-icons-google"]} src="flat-color-icons-google0.svg" alt="Google" />
                      <div className={styles["google"]}>Google</div>
                    </div>
                  </div>
                </div>
              </div>
              <img className={styles["rectangle-36"]} src="rectangle-360.png" alt="Reviewer" />
            </div>
          </div>
          {/* Add other reviews here */}
          {/* ... */}
        </div>
      </div>
      <div className={styles["frame-2608781"]}>
        <div className={styles["frame-2608787"]}>
          <img className={styles["rectangle-40"]} src="/images/airways.png" alt="Flights" />
          <div className={styles["frame-2608785"]}>
            <div className={styles["rectangle-32"]}></div>
            <div className={styles["frame-2608784"]}>
              <div className={styles["frame-2608786"]}>
                <div className={styles["flights2"]}>Flights</div>
                <div className={styles["search-flights-places-hire-to-our-most-popular-destinations2"]}>
                  Search Flights &amp; Places Hire to our most popular destinations
                </div>
              </div>
              <div className={styles["button"]}>
                <div className={styles["style-layer"]}>
                  <img className={styles["paper-plane2"]} src="/images/cursor.png" alt="Paper Plane" />
                  <div className={styles["button2"]}>Show Flights</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["frame-2608788"]}>
          <img className={styles["rectangle-41"]} src="/images/hotel.png" alt="Hotels" />
          <div className={styles["frame-26087862"]}>
            <div className={styles["rectangle-322"]}></div>
            <div className={styles["frame-2608784"]}>
              <div className={styles["frame-2608786"]}>
                <div className={styles["hotels2"]}>Hotels</div>
                <div className={styles["search-hotels-places-hire-to-our-most-popular-destinations"]}>
                  Search hotels &amp; Places Hire to our most popular destinations
                </div>
              </div>
              <div className={styles["button"]}>
                <div className={styles["style-layer"]}>
                  <img className={styles["paper-plane3"]} src="/images/cursor.png" alt="Paper Plane" />
                  <div className={styles["button2"]}>Show Hotels</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </div>
  );
};

export default TicketSchedule;
