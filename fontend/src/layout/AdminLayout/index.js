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
      {/* Header */}
      <Header collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className={cx("admin-container")}>
        {/* Sidebar */}
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* Nội dung chính */}
        <main className={cx("main-content", { collapsed })}>
          <div className={cx("content")}>{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout