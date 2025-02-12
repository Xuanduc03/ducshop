import React from 'react';
import style from "./ListCategory.module.scss";
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);
export const ListCategory = ({items = []}) => {
  return (
    <div className={cx("container")}>
        {items.map((category, index) => {
            return (
                <Link to={'/collection'} className={cx("category")} key={index}>
                    <img className={cx('img-category')} src={category.img} alt="" />
                    <h4 className={cx("title")}>{category.name}</h4>
                </Link>
            )
        })}
    </div>
  )
}
