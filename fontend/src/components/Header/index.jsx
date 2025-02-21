import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Menu } from '~/components/Popper/Menu';
import { CountCart } from '~/components/Popper/CountCart';
import { UserOption } from "~/components/Popper/UserOption";
import axios from 'axios';
import SummaryApi from '~/utils/ApiRoute';

const cx = classNames.bind(styles);

export const Header = () => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCategoryClick = (category) => {
    navigate(`/collection/${category._id}`, { state: { categoryName: category.name } });
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios({
          url: SummaryApi.GetCategories.url,
          method: SummaryApi.GetCategories.method,
        });
        setCategories(response.data.data);
      } catch (error) {
        console.error("Lấy danh mục ko thành công", error);
      }
    };

    fetchCategories();
  }, [])

  return (
    <header className={cx('header')}>

      <div className={cx("mobile-menu")} onClick={toggleMenu}>
        <i class={cx("fa-solid fa-bars")}></i>
      </div>
      {/* Logo */}
      <Link to="/" className={cx('logo')}>
        <span className={cx('logo-highlight')}>DUC</span>MATE
      </Link>
      {/* menu destop */}
      <nav className={cx('menu')}>
        <span className={cx('sale')}>-50% THU ĐÔNG</span>
        <Menu>
          <a href="#" className={cx('menu-link')}>SẢN PHẨM</a>
        </Menu>
        {categories.map((category) => (
          <>
            <a key={category._id} onClick={() => handleCategoryClick(category)} className={cx('menu-link')}>{category.name}</a>
          </>
        ))}
        <a href="#" className={cx('menu-link')}>CARE & SHARE</a>
      </nav>

      {/* Menu mobile*/}
      <div className={cx("menu-overlay", { active: isMenuOpen })}>
        <div className={cx("menu-sidebar")}>
          <button className={cx("close-menu")} onClick={toggleMenu}>
            &times;
          </button>
          <span className={cx("sale")}>THU ĐÔNG -50%</span>
          <nav className={cx('menu-list')}>
            <span className={cx('sale')}>-50% THU ĐÔNG</span>
            <Menu>
              <a href="#" className={cx('menu-link')}>SẢN PHẨM</a>
            </Menu>

            {categories.map((category) => (
              <>
                <a key={category._id} onClick={() => handleCategoryClick(category)} className={cx('menu-link')}>{category.name}</a>
              </>
            ))}
            <a href="#" className={cx('menu-link')}>CARE & SHARE</a>
          </nav>
        </div>
      </div>


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
          <CountCart>
            <i className="fas fa-shopping-bag"></i>
          </CountCart>
        </div>
      </div>
    </header>
  );
};
