import React, { useEffect, useState } from "react";
import styles from "./GeneralInfo.module.css";
import axios from "axios";

const GeneralInfo = () => {
  const [info, setInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/general-info`
        );
        setInfo(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching general info:", error);
        setInfo(staticInfo); // Use static info as fallback
        setError("Đang hiển thị thông tin cơ bản. Một số thông tin có thể chưa được cập nhật.");
        setIsLoading(false);
      }
    };

    fetchInfo();
  }, []);

  if (isLoading) {
    return <div className={styles.loading}>Đang tải thông tin...</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Thông Tin Chung</h1>
        {error && <p className={styles.errorMessage}>{error}</p>}
      </header>
      <div className={styles.infoGrid}>
        {info.map((item) => (
          <div key={item.info_id} className={styles.infoCard}>
            <h2 className={styles.infoTitle}>{item.title}</h2>
            <div className={styles.infoContent}>
              <p>{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneralInfo;