import { React, useRef } from 'react';
import style from "./ListProduct.module.scss";
import classNames from 'classnames/bind';
import { ProductItem } from '../ProductItem';

const cx = classNames.bind(style);
export const ListProduct = ({ items = [] }) => {

  const containerRef = useRef(null);

  const handleScroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = 500; // Khoảng cách trượt
      containerRef.current.scrollLeft += direction === "next" ? scrollAmount : -scrollAmount;
    }
  };

  return (
    <div className={cx("product-slide")}>
      <button className={cx("previous-btn")} onClick={() => handleScroll("prev")}>
        <i className="fa-solid fa-circle-chevron-left"></i>
      </button>

      <div className={cx("product-container")} ref={containerRef}>
        {items.map((product, index) => (
          <ProductItem key={index} product={product}/>
        ))}
      </div>

      <button className={cx("next-btn")} onClick={() => handleScroll("next")}>
        <i className="fa-solid fa-circle-chevron-right"></i>
      </button>
    </div>
  );
}
