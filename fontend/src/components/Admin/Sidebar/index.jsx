import React from 'react';
import style from "./Sidebar.module.scss"; // Import file SCSS
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faChartLine, faBoxes, faFileAlt, faUsers, faSignOutAlt, faList } from '@fortawesome/free-solid-svg-icons'; // Import icons

const cx = classNames.bind(style); // classnames

const Sidebar = () => {
  return (
    <aside className={cx('sidebar')}>
      <ul className={cx('sidebar__nav')}>
        <li className={cx('sidebar__item')}>
          <a href="#" className={cx('sidebar__link')}>
            <FontAwesomeIcon icon={faChartLine} className={cx('sidebar__icon')} />
            Thống kê
          </a>
        </li>
        <li className={cx('sidebar__item')}>
          <Link to={'/admin/categories'} className={cx('sidebar__link')}>
          <FontAwesomeIcon icon={faList} className={cx('sidebar__icon')} />
            Danh mục
          </Link>
        </li>
        <li className={cx('sidebar__item')}>
          <Link to={'/admin/product/addproduct'} className={cx('sidebar__link')}>
            <FontAwesomeIcon icon={faBoxes} className={cx('sidebar__icon')} />
            Sản phẩm
          </Link>
        </li>
        <li className={cx('sidebar__item')}>
          <a href="#" className={cx('sidebar__link')}>
            <FontAwesomeIcon icon={faFileAlt} className={cx('sidebar__icon')} />
            Đơn hàng
          </a>
        </li>
        <li className={cx('sidebar__item')}>
          <Link to={'/admin/users'} className={cx('sidebar__link')}>
            <FontAwesomeIcon icon={faUsers} className={cx('sidebar__icon')} />
            Khách hàng
          </Link>
        </li>
        <li className={cx('sidebar__item', 'sidebar__item--logout')}>
          <a href="#" className={cx('sidebar__link')}>
            <FontAwesomeIcon icon={faSignOutAlt} className={cx('sidebar__icon')} />
            Đăng xuất
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;