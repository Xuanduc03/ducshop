import React, { useEffect, useState } from 'react';
import style from "./ListCategory.module.scss";
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedCategory } from '~/redux/categorySlice';
import axios from 'axios';

const cx = classNames.bind(style);
export const ListCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    dispatch(setSelectedCategory(category));
    navigate(`/collection/subcategories/${category._id}`);
  }
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios('http://localhost:8080/api/categories');
        setCategories(response.data.data);
      } catch (error) {
        console.error("Lấy danh mục ko thành công", error);
      }
    };

    fetchCategories();
  }, []);

  const subcategories = categories.flatMap(category => category.children.slice(0, 2));

  return (
    <div className={cx("container")}>
      {subcategories.map((category) => {
        return (
          <a onClick={() => handleCategoryClick(category)} className={cx("category")} key={category._id}>
            <img className={cx('img-category')} src={category.image} alt="" />
            <h4 className={cx("title")}>{category.name}</h4>
          </a>
        )
      })}
    </div>
  )
}
