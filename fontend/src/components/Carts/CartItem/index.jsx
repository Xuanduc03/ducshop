import React from "react";
import classNames from "classnames/bind";
import styles from "./CartItem.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { decreaseQuantity, increaseQuantity } from "~/redux/cartSlice";

const cx = classNames.bind(styles);
const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDetailProduct = (product) => {
    navigate(`/product/${product._id}`);
  }
  return (
    <div className={cx("cart-item")}>
      <img src={item.images} alt={item.productName} className={cx("cart-item__image")} />
      <div className={cx("cart-item__info")}>
        <h3 className={cx("cart-item__title")} key={item._id} onClick={() => handleDetailProduct(item)}>{item.productName}</h3>
        <div className={cx("cart-item__type")}>
            <p className={cx("content-type")}>{item.color} / {item.size}</p>
        </div>
        <div className={cx("cart-item__actions")}>
          <button onClick={() => dispatch(decreaseQuantity({_id : item._id, color: item.color, size: item.size}))}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => dispatch(increaseQuantity({_id : item._id, color: item.color, size: item.size}))}>+</button>
        </div>
      </div>
      <div className={cx("cart-item__price")}>{item.price.toLocaleString("vi-VN")}đ</div>
      <button className={cx("cart-item__remove")} onClick={() => onRemoveItem(item.id)}><i class="fa-solid fa-delete-left"></i></button>
    </div>
  );
};

export default CartItem;
