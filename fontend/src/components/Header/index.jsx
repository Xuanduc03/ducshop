import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { Menu } from '~/components/Popper/Menu';
import { CountCart } from '~/components/Popper/CountCart';

const cx = classNames.bind(styles);
const categories = [
  {
    title: 'THEO SẢN PHẨM',
    items: [
      { name: 'Tất cả', highlight: false },
      { name: 'Sản phẩm mới', highlight: true },
      { name: 'Bán chạy nhất', highlight: false },
      { name: 'Combo/Set đồ', highlight: false },
      { name: 'Đồ thu đông', highlight: false },
      { name: 'Exdry', highlight: false },
    ],
  },
  {
    title: 'ÁO NAM',
    items: [
      { name: 'Tất cả Áo Nam' },
      { name: 'Áo thun' },
      { name: 'Áo sơ mi' },
      { name: 'Áo nỉ (sweatshirt)' },
      { name: 'Áo polo' },
      { name: 'Áo dài tay' },
      { name: 'Áo khoác' },
      { name: 'Áo Tanktop' },
      { name: 'Áo thể thao' },
    ],
  },
  {
    title: 'QUẦN NAM',
    items: [
      { name: 'Tất cả Quần Nam' },
      { name: 'Quần shorts' },
      { name: 'Quần dài' },
      { name: 'Quần jean' },
      { name: 'Quần kaki' },
      { name: 'Quần jogger' },
      { name: 'Quần thể thao' },
      { name: 'Quần lót' },
      { name: 'Quần bơi' },
    ],
  },
  {
    title: 'PHỤ KIỆN NAM',
    items: [
      { name: 'Tất cả phụ kiện' },
      { name: 'Tất/Vớ' },
      { name: 'Mũ/Nón' },
      { name: 'Túi' },
      { name: 'Ví/Thắt lưng' },
      { name: 'Ly/Cốc' },
    ],
  },
];

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
        <span className={cx('logo-highlight')}>COOL</span>MATE
      </Link>

      {/* Menu */}
      <nav className={cx('menu')}>
        <span className={cx('sale')}>-50% THU ĐÔNG</span>
        <Menu items={categories}>
          <a href="#" className={cx('menu-link')}>SẢN PHẨM</a>
        </Menu>


        <a href="#" className={cx('menu-link')}>ĐỒ LÓT</a>
        <a href="#" className={cx('menu-link')}>ĐỒ THỂ THAO</a>
        <a href="#" className={cx('menu-link')}>MẶC HÀNG NGÀY</a>
        <a href="#" className={cx('menu-link')}>SẢN XUẤT RIÊNG</a>
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
        <Link to={'/login'} className={cx('icon')}>
          <i className="fas fa-user"></i>
        </Link>

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
