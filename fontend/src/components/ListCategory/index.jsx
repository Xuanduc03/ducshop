import React from 'react';
import style from "./ListCategory.module.scss";
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedCategory } from '~/redux/categorySlice';

const cx = classNames.bind(style);
export const ListCategory = ({ items = [] }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleCategoryClick = (category) =>{
      dispatch(setSelectedCategory(category));
      navigate('/collection/${category}');
    }
  return (
    <div className={cx("container")}>
      {items.map((category, index) => {
        return (
          <a onClick={() => handleCategoryClick(category)} className={cx("category")} key={index}>
            <img className={cx('img-category')} src={category.img} alt="" />
            <h4 className={cx("title")}>{category.name}</h4>
          </a>
        )
      })}
    </div>
  )
}
