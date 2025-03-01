import React, { useEffect, useState } from 'react';
import style from './UserManger.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';

const cx = classNames.bind(style);

const PAGE_SIZE = 5;
const UserManager = () => {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/allusers");
        setUsers(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllUser();
  }, []);

  const filterUser = users.filter((u) =>
    u.fullname.toLowerCase().includes(search.toLowerCase())
  );
  const paginatedUsers = filterUser.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const totalPages = Math.ceil(filterUser.length / PAGE_SIZE);
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
              <th>Họ Tên</th>
              <th>Email</th>
              <th>Số Điện Thoại</th>
              <th>Địa Chỉ</th>
              <th>Quyền</th>
              <th>Ngày Tạo</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>0{user.phone}</td>
                <td>{user.address}</td>
                <td>{user.role}</td>
                <td>{user.createAt}</td>
                <td>
                <button className={cx("edit-button")}>Sửa</button>
                  <button
                    className={cx("delete-button")}
                   
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

export default UserManager;
