import { React } from 'react';
import style from "./ListProduct.module.scss";
import classNames from 'classnames/bind';
import { ProductItem } from '../ProductItem';

const cx = classNames.bind(style);
export const ListProduct = ({ items = [] }) => {

  return (
    <div className={cx("product-slide")}>
      <button className={cx("previous-btn")}><i class="fa-solid fa-circle-chevron-left"></i></button>
      <div className={cx("product-container")}>
        {items.map((product, index) => (
          <ProductItem key={index} product={product}/>
        ))}
      </div>
      <button className={cx("next-btn")}><i class="fa-solid fa-circle-chevron-right"></i></button>
    </div>
  );
}
