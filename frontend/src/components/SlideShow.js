import React, { useState, useEffect } from 'react';
import styles from './SlideShow.module.css'; // Tạo file CSS Module riêng cho Slideshow

const SlideShow = ({ images, interval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(slideInterval);
  }, [images.length, interval]);

  return (
    <div className={styles.slideshowContainer}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slideshow ${index + 1}`}
          className={`${styles.slide} ${
            index === currentIndex ? styles.active : ''
          }`}
        />
      ))}
    </div>
  );
};

export default SlideShow;
