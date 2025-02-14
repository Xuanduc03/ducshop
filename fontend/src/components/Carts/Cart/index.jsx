import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import CartItem from "../CartItem";

const cx = classNames.bind(styles);

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Cotton T-shirt", category: "Shirt", price: 44.0, quantity: 1, image: "/img/shirt1.jpg" },
    { id: 2, name: "Cotton T-shirt", category: "Shirt", price: 44.0, quantity: 1, image: "/img/shirt2.jpg" },
    { id: 3, name: "Cotton T-shirt", category: "Shirt", price: 44.0, quantity: 1, image: "/img/shirt3.jpg" },
  ]);

  const handleUpdateQuantity = (id, action) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: action === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={cx("cart-container")}>
      <div className={cx("cart-items")}>
        <h1 className={cx("cart-title")}>Giỏ hàng</h1>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} />
        ))}
        <a href="/" className={cx("back-to-shop")}>← Back to shop</a>
      </div>

      <div className={cx("cart-summary")}>
        <h2>Tổng cộng</h2>
        <div className={cx("summary-row")}>
          <span>Số lượng {cartItems.length}</span>
          <span>đ {totalPrice.toFixed(2)}</span>
        </div>
        <div className={cx("summary-row")}>
          <span>Vận chuyển</span>
          <select>
            <option>Hỏa tốc - đ100.000</option>
            <option>Express-Delivery - đ20.000</option>
          </select>
        </div>
        <div className={cx("summary-row")}>
          <span>Giảm giá</span>
          <input type="text" placeholder="Enter your code" />
        </div>
        <div className={cx("summary-total")}>
          <span>Tổng giá</span>
          <span>€ {(totalPrice + 5).toFixed(2)}</span>
        </div>
        <button className={cx("checkout-btn")}>Thanh toán</button>
      </div>
    </div>
  );
};

export default Cart;
