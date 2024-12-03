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
      <h1>{promotion.title}</h1>
      <p>{promotion.description}</p>
      <p>Discount: {promotion.discount_percentage}%</p>
      <p>Start Date: {new Date(promotion.start_date).toLocaleDateString()}</p>
      <p>End Date: {new Date(promotion.end_date).toLocaleDateString()}</p>
    </div>
  );
};

export default PromotionDetail;
