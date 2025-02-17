import React, { useState } from 'react';
import Header from '~/components/Admin/Header';
import Sidebar from '~/components/Admin/Sidebar';
import style from "./AdminLayout.module.scss";
import classNames from 'classnames/bind';

const cx = classNames.bind(style);
const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cx("admin-layout")}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={cx("main-content", { collapsed })}>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className={cx("content")}>{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout