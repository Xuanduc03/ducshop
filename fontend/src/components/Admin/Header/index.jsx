import React from 'react';
import style from "./HeaderAdmin.module.scss";
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Import icons

const cx = classNames.bind(style);

const HeaderAdmin = () => {
  return (
    <header className={cx('header')}>
      <div className={cx('header__container')}>
        <div className={cx('header__left')}>
          <div className={cx('header__logo')}>
          <span className={cx('logo-highlight')}>DUC</span>MATE
          </div>
          <button className={cx('header__toggle-btn')}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        <div className={cx('header__center')}>
          <form className={cx('header__search-form')}>
            <input type="text" placeholder="Tìm kiếm..." className={cx('header__search-input')} />
            <button type="submit" className={cx('header__search-btn')}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
        </div>
        <div className={cx('header__right')}>
          <div className={cx('header__user-menu')}>
            <button className={cx('header__user-btn')}>
                <FontAwesomeIcon icon={faUser} />
            </button>
            <ul className={cx('header__user-dropdown')}>
              <li className={cx('header__user-item')}>
                <a href="#" className={cx('header__user-link')}>Profile</a>
              </li>
              <li className={cx('header__user-item')}>
                <a href="#" className={cx('header__user-link')}>Settings</a>
              </li>
              <li className={cx('header__user-item')}>
                <a href="#" className={cx('header__user-link')}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2"/> Đăng xuất
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;