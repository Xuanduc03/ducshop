import React from 'react';
import style from './Checkout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);
const Checkout = ({ product }) => {
return (
    <div className={cx('checkout')}>
        {/* Left Section */}
        <div className={cx('checkout__left')}>
            <h2>Thông tin đặt hàng</h2>

            <form className={cx('checkout__form')}>
                <div className={cx('form-group')}>
                    <label>Họ và tên</label>
                    <div className={cx('form-row')}>
                        <select>
                            <option>Anh/Chị</option>
                            <option>Ông</option>
                            <option>Bà</option>
                        </select>
                        <input type="text" placeholder="Nhập tên" />
                    </div>
                </div>

                <div className={cx('form-group')}>
                    <label>Email</label>
                    <input type="email" placeholder="Nhập email" />
                </div>

                <div className={cx('form-group')}>
                    <label>Địa chỉ</label>
                    <input type="text" placeholder="Nhập địa chỉ" />
                </div>

                <div className={cx('form-group', 'form-row')}>
                    <div>
                        <label>Tỉnh/Thành phố</label>
                        <select>
                            <option>Hồ Chí Minh</option>
                            <option>Hà Nội</option>
                            <option>Đà Nẵng</option>
                        </select>
                    </div>
                    <div>
                        <label>Quận/Huyện</label>
                        <select>
                            <option>Chọn Quận/Huyện</option>
                        </select>
                    </div>
                    <div>
                        <label>Phường/Xã</label>
                        <select>
                            <option>Chọn Phường/Xã</option>
                        </select>
                    </div>
                </div>

                <div className={cx('form-group')}>
                    <label>Ghi chú</label>
                    <input type="text" placeholder="Ghi chú thêm (Ví dụ: Giao hàng giờ hành chính)" />
                </div>

                <div className={cx('form-group')}>
                    <input type="checkbox" /> Gọi cho người khác nhận hàng (nếu có)
                </div>
            </form>
        </div>

        {/* Right Section */}
        <div className={cx('checkout__right')}>
            <h2>Giỏ hàng</h2>
            <div className={cx('cart-item')}>
                <img src={product.image} alt={product.name} />
                <div className={cx('cart-item__info')}>
                    <h3>{product.name}</h3>
                    <p>{product.color} / {product.size}</p>
                    <div className={cx('cart-item__actions')}>
                        <button className={cx('remove')}>Xóa</button>
                        <div className={cx('quantity')}>
                            <button>-</button>
                            <span>{product.quantity}</span>
                            <button>+</button>
                        </div>
                        <p className={cx('price')}>{product.price}đ</p>
                    </div>
                </div>
            </div>

            <div className={cx('voucher')}>
                <input type="text" placeholder="Nhập mã giảm giá" />
                <button>Áp dụng Voucher</button>
            </div>

            <div className={cx('checkout__summary')}>
                <p>Thành tiền: <span>{product.totalPrice}đ</span></p>
                <button className={cx('checkout-btn')}>Thanh toán</button>
            </div>
        </div>
    </div>
);
};

export default Checkout;
