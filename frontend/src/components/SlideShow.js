import React, { useState, useEffect } from "react";
import styles from "./SlideShow.module.css"; // Tạo file CSS Module riêng cho Slideshow

/**
 * SlideShow component to display a series of images in a slideshow format.
 *
 * @param {Object} props - The properties object.
 * @param {string[]} props.images - An array of image URLs to be displayed in the slideshow.
 * @param {number} [props.interval=4000] - The interval time in milliseconds for changing slides.
 *
 * @returns {JSX.Element} The rendered SlideShow component.
 */
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
            index === currentIndex ? styles.active : ""
          }`}
        />
      ))}
    </div>
  );
};

export default SlideShow;
