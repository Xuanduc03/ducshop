import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ProductManager.module.scss";

const cx = classNames.bind(styles);

const mockProducts = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Sản phẩm ${i + 1}`,
  price: Math.floor(Math.random() * 1000000) + 100000,
  category: "Áo Nam",
}));

const PAGE_SIZE = 10;

const ProductManager = () => {
  const [products, setProducts] = useState(mockProducts);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    
  })

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <h2>Quản lý sản phẩm</h2>
        <button className={cx("add-button")}>+ Thêm sản phẩm</button>
      </div>

      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        className={cx("search-input")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className={cx("table-container")}>
        <table className={cx("table")}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Danh mục</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price.toLocaleString()}đ</td>
                <td>{product.category}</td>
                <td>
                  <button className={cx("edit-button")}>Sửa</button>
                  <button
                    className={cx("delete-button")}
                    onClick={() => handleDelete(product.id)}
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

export default ProductManager;
