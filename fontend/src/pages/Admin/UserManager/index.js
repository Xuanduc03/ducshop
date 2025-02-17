import React from 'react';
import style from './UserManger.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

const UserManager = () => {
  // Dữ liệu mẫu cho người dùng
  const users = [
    {
      _id: 1,
      fullname: 'Nguyễn Văn A',
      email: 'a@gmail.com',
      phone: '0901234567',
      address: 'Hà Nội',
      role: 'admin',
      createAt: '2023-01-01'
    },
    {
      _id: 2,
      fullname: 'Trần Thị B',
      email: 'b@gmail.com',
      phone: '0912345678',
      address: 'TP. Hồ Chí Minh',
      role: 'user',
      createAt: '2023-02-15'
    },
    {
      _id: 3,
      fullname: 'Lê Văn C',
      email: 'c@gmail.com',
      phone: '0923456789',
      address: 'Đà Nẵng',
      role: 'user',
      createAt: '2023-03-10'
    }
  ];

  return (
    <div className={cx('user-manager')}>
      <h2 className={cx('title')}>Quản Lý Người Dùng</h2>

      <div className={cx('card')}>
        <div className={cx('add-user')}>
          <input type="text" placeholder="Nhập tên người dùng..." />
          <button>Thêm Mới</button>
        </div>

        <div className={cx('table-wrapper')}>
          <table className={cx('user-table')}>
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
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                  <td>{user.role}</td>
                  <td>{user.createAt}</td>
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

export default UserManager;
