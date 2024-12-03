import React from "react";
import styles from "./FlightSearch.module.css";

const FlightSearch = () => {
  return (
    <div className={styles["frame-38"]}>
      <div className={styles["line-4"]}></div>
      <div className={styles["frame-2608739"]}>
        <div className={styles["frame-2608738"]}>
          <div className={styles["frame-2608721"]}>
            <img
              className={styles["airplane"]}
              src="/images/airicon.png"
              alt="Airplane"
            />
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
                    <div className={styles["input-text2"]}>
                      Lahore - Karachi
                    </div>
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
                    <div className={styles["input-text2"]}>
                      Lahore - Karachi
                    </div>
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
      </div>{" "}
      <div className={styles["frame-46"]}>
        <div className={styles["button"]}>
          <div className={styles["style-layer"]}>
            <img
              className={styles["paper-plane"]}
              src="/images/cursor.png"
              alt="Paper Plane"
            />
            <div className={styles["button2"]}>Show Flights</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;
