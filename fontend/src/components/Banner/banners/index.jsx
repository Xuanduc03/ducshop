import React from 'react';
import style from './Banners.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);
export const Banners = ({items = []}) => {
    return (
        <div className={cx('container')}>
            {items.map((banner, index) => (
                <div key={index} className={cx("banner-content")}>
                <img className={cx("image")} src={banner.image} alt={banner.title} />
                <div className={cx("overlay")}>
                  <h1 className={cx("title")}>{banner.title}</h1>
                  <p className={cx("voucher")}>{banner.voucher}</p>
                  <Link to={"/collection"} className={cx("btn-explore")}>
                    Khám phá ngay →
                  </Link>
                </div>
              </div>
            ))}
        </div>
    )
}

