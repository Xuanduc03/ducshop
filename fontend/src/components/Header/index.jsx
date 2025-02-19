import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { Menu } from '~/components/Popper/Menu';
import { CountCart } from '~/components/Popper/CountCart';
import { UserOption } from "~/components/Popper/UserOption";

const cx = classNames.bind(styles);

const items = [
  {
    id: 1,
    name: "Quần dài nam ECC Ripstop Pants",
    type: "Xanh lá đậm / M",
    image: "https://example.com/image1.jpg", // Thay bằng URL hình ảnh thực tế
    price: "297.000đ",
    oldPrice: "349.000đ",
    quantity: 1,
  },
  {
    id: 2,
    name: "Áo giữ nhiệt Essential Brush Poly cổ thấp",
    type: "Xám nhạt / 3XL",
    image: "https://example.com/image2.jpg", // Thay bằng URL hình ảnh thực tế
    price: "119.000đ",
    oldPrice: "149.000đ",
    quantity: 1,
  },
];


export const Header = () => {
 
  return (
    <header className={cx('header')}>

      <div className={cx("mobile-menu")}>
        <i class={cx("fa-solid fa-bars")}></i>
      </div>
      {/* Logo */}
      <Link to="/" className={cx('logo')}>
        <span className={cx('logo-highlight')}>DUC</span>MATE
      </Link>

      {/* Menu */}
      <nav className={cx('menu')}>
        <span className={cx('sale')}>-50% THU ĐÔNG</span>
        <Menu>
          <a href="#" className={cx('menu-link')}>SẢN PHẨM</a>
        </Menu>


        <a href="#" className={cx('menu-link')}>Áo nam</a>
        <a href="#" className={cx('menu-link')}>quần nam</a>
        <a href="#" className={cx('menu-link')}>phụ kiện</a>
        <a href="#" className={cx('menu-link')}>CARE & SHARE</a>
      </nav>

      {/* Actions */}
      <div className={cx('actions')}>
        {/* Search Bar */}
        <div className={cx('search-bar')}>
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className={cx('search-input')}
          />
        </div>

        {/* User Icon */}
        <UserOption>
          <i className={cx("fas fa-user")}></i>
        </UserOption>

        {/* Cart Icon */}
        <div className={cx('icon', 'cart')}>
          <CountCart items={items}>
            <i className="fas fa-shopping-bag"></i>
          </CountCart>
        </div>
      </div>
    </header>
  );
};
