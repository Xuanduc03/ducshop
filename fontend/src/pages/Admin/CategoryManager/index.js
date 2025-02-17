import React, { useEffect, useState } from 'react';
import style from './CategoryManager.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';

const cx = classNames.bind(style);

const CategoryManager = () => {
  // Dữ liệu mẫu cho giao diện

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
  }, [])
  return (
    <div className={cx('category-manager')}>
      <h2 className={cx('title')}>Quản Lý Danh Mục</h2>

      <div className={cx('card')}>
        <div className={cx('add-category')}>
          <input type="text" placeholder="Nhập tên danh mục..." />
          <button>Thêm Mới</button>
        </div>

        <div className={cx('table-wrapper')}>
          <table className={cx('category-table')}>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên Danh Mục</th>
                <th>Danh mục con</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category._id}>
                  <td>{index + 1}</td>
                  <td>
                    {category.parentId && <span className={cx('child-indicator')}>↳ </span>}
                    {category.name}
                  </td>
                  <td>
                    <ul className={cx('category-list')}>
                      {category.children.map((subCategory) => (
                        <li key={subCategory._id} className={cx('category-item')}>

                          <p className={cx("subcategory-title")}>{subCategory.name}</p>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <button className={cx('edit-btn')}>Sửa</button>
                    <button className={cx('delete-btn')}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
