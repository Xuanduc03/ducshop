import React, { useEffect, useState } from 'react';
import style from './CategoryManager.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);
const PAGE_SIZE = 5;
const CategoryManager = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
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

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );
   
  const paginatedCategory = filteredCategories.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );
  
  const totalPages = Math.ceil(filteredCategories.length / PAGE_SIZE);

  const handleDelete = (id) => {
    setCategories(categories.filter((p) => p.id !== id));
  };

  const handleEdit = (category) => {
    navigate(`/admin/category/edit/${category._id}`);
  };
  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <h2>Quản lý Danh mục</h2>
        <button className={cx("add-button")}>+ Thêm Danh mục</button>
      </div>

      <input
        type="text"
        placeholder="Tìm kiếm Danh mục..."
        className={cx("search-input")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className={cx("table-container")}>
        <table className={cx("table")}>
        <thead>
              <tr>
                <th>STT</th>
                <th>Tên Danh Mục</th>
                <th>Danh mục con</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCategory.map((category, index) => (
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
                  <button className={cx("edit-button")} onClick={() => handleEdit(category)} key={category._id}>Sửa</button>
                  <button
                    className={cx("delete-button")}
                    onClick={() => handleDelete(category._id)}
                  >
                    Xóa
                  </button>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>


      <div className={cx("pagination")}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          &laquo; Trước
        </button>
        <span>Trang {page} / {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Sau &raquo;
        </button>
      </div>
    </div>
  );
};

export default CategoryManager;
