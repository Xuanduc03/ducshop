import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Banner.module.scss';
import banner1 from "~/assets/images/banner1.webp";
import banner2 from '~/assets/images/banner2.webp';
import banner3 from '~/assets/images/banner3.webp';

const cx = classNames.bind(styles);

const banners = [banner1, banner2, banner3];

export const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={cx('slideshow')}>
      {/* Previous Button */}
      <button className={cx('arrow', 'prev')} onClick={prevSlide}>
        &#8249;
      </button>

      {/* Slides */}
      <div className={cx('slides')}>
        {banners.map((banner, index) => (
          <img
            key={index}
            src={banner}
            alt={`Slide ${index + 1}`}
            className={cx('slide', { active: index === currentIndex })}
          />
        ))}
      </div>

      {/* Next Button */}
      <button className={cx('arrow', 'next')} onClick={nextSlide}>
        &#8250;
      </button>

      {/* Indicators */}
      <div className={cx('indicators')}>
        {banners.map((_, index) => (
          <span
            key={index}
            className={cx('indicator', { active: index === currentIndex })}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};
