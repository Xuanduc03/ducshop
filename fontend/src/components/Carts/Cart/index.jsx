import React from "react";
import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import CartItem from "../CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeFromCart } from "~/redux/cartSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Cart = () => {
  const cartItem = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    toast.success("Đã xóa toàn bộ sản phẩm ");
    dispatch(clearCart());
  };

  const totalPrice = cartItem.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={cx("cart-container")}>
      <div className={cx("cart-items")}>
        <h1 className={cx("cart-title")}>Giỏ hàng</h1>
        <div className={cx("cart-description")}>
          <p>Tất cả sản phẩm | <button className={cx("delete-all-btn")} onClick={handleClearCart}>Xóa tất cả</button></p>
          <p>Giá</p>
        </div>
        {cartItem.map((item) => (
          <CartItem key={item._id} item={item} onRemoveItem={() => handleRemoveItem(item._id)} />
        ))}
        <a href="/" className={cx("back-to-shop")}>← Back to shop</a>
      </div>

      <div className={cx("cart-summary")}>
        <h2>Tổng cộng</h2>
        <div className={cx("summary-row")}>
          <span>Số lượng {cartItem.length}</span>
          <span>{totalPrice.toLocaleString("vi-VN")}đ</span>
        </div>
        <div className={cx("summary-row")}>
          <span>Giao hàng</span>
          <p>Miễn phí ship</p>
        </div>
        <div className={cx("summary-row")}>
          <span>Giảm giá</span>
          <input type="text" placeholder="Enter your code" />
        </div>
        <div className={cx("summary-total")}>
          <span>Thành tiền</span>
          <span className={cx("total-price")}>{totalPrice.toLocaleString("vi-VN")}đ</span>
        </div>
        <Link className={cx("checkout-btn")} to={'/checkout'}>Thanh toán</Link>
      </div>
    </div>
  );
};

export default Cart;
