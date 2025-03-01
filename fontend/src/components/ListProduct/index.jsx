import { React, useRef, useState, useEffect } from 'react';
import style from "./ListProduct.module.scss";
import classNames from 'classnames/bind';
import { ProductItem } from '../ProductItem';
import axios from 'axios';

const cx = classNames.bind(style);
export const ListProduct = () => {

  const containerRef = useRef(null);

  const handleScroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = 500; // Khoảng cách trượt
      containerRef.current.scrollLeft += direction === "next" ? scrollAmount : -scrollAmount;
    }
  };

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const responseProduct = await axios.get(`http://localhost:8080/api/products`);
        setProducts(responseProduct.data.data);
      } catch (error) {
        console.error("Lấy danh mục ko thành công", error);
      }
    };

    fetchProduct();
  }, []);

  const newProduct = products.filter(product => product.brandNew === true);
  return (
    <div className={cx("product-slide")}>
      <button className={cx("previous-btn")} onClick={() => handleScroll("prev")}>
        <i className="fa-solid fa-circle-chevron-left"></i>
      </button>

      <div className={cx("product-container")} ref={containerRef}>
        {newProduct.map((product, index) => (
          <ProductItem key={index} product={product}/>
        ))}
      </div>

      <button className={cx("next-btn")} onClick={() => handleScroll("next")}>
        <i className="fa-solid fa-circle-chevron-right"></i>
      </button>
    </div>
  );
}
