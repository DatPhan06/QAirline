import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPromotionById } from "../../services/promotionService";
import styles from "./PromotionDetail.module.css";

const PromotionDetail = () => {
  const { id } = useParams();
  const [promotion, setPromotion] = useState(null);

  useEffect(() => {
    const fetchPromotion = async () => {
      try {
        const data = await getPromotionById(id);
        setPromotion(data);
      } catch (error) {
        console.error("Error fetching promotion:", error);
      }
    };

    fetchPromotion();
  }, [id]);

  if (!promotion) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.promotionDetailContainer}>
      <div className={styles.promotionHeader}>
        <h1>{promotion.title}</h1>
        <p className={styles.discount}>
          Giảm giá: {promotion.discount_percentage}%
        </p>
      </div>
      <div className={styles.promotionContent}>
        <p className={styles.description}>{promotion.description}</p>
        <div className={styles.dates}>
          <p>
            <strong>Ngày bắt đầu:</strong>{" "}
            {new Date(promotion.start_date).toLocaleDateString()}
          </p>
          <p>
            <strong>Ngày kết thúc:</strong>{" "}
            {new Date(promotion.end_date).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PromotionDetail;
