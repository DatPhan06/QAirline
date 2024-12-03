import React, { useEffect, useState } from "react";
import { getPromotions } from "../../services/promotionService";
import styles from "./Offers.module.css";

const Offers = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const data = await getPromotions();
        setPromotions(data);
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };

    fetchPromotions();
  }, []);

  return (
    <div className={styles.offersContainer}>
      <h1>Trang Ưu Đãi</h1>
      <ul className={styles.promotionsList}>
        {promotions.map((promotion) => (
          <li key={promotion.promotion_id} className={styles.promotionItem}>
            <h3>{promotion.title}</h3>
            <p>{promotion.description}</p>
            <p>Discount: {promotion.discount_percentage}%</p>
            <p>
              Start Date: {new Date(promotion.start_date).toLocaleDateString()}
            </p>
            <p>End Date: {new Date(promotion.end_date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Offers;
