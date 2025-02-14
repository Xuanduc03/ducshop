import React from "react";
import classNames from "classnames/bind";
import styles from "./CartItem.module.scss";

const cx = classNames.bind(styles);

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  return (
    <div className={cx("cart-item")}>
      <img src={item.image} alt={item.name} className={cx("cart-item__image")} />
      <div className={cx("cart-item__info")}>
        <h3 className={cx("cart-item__category")}>{item.category}</h3>
        <p className={cx("cart-item__name")}>{item.name}</p>
        <div className={cx("cart-item__actions")}>
          <button onClick={() => onUpdateQuantity(item.id, "decrease")}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => onUpdateQuantity(item.id, "increase")}>+</button>
        </div>
      </div>
      <div className={cx("cart-item__price")}>€ {item.price.toFixed(2)}</div>
      <button className={cx("cart-item__remove")} onClick={() => onRemoveItem(item.id)}>×</button>
    </div>
  );
};

export default CartItem;
