import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ProductManager.module.scss";
import { getAllProduct } from "~/services/productService";
import { Link, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);
const PAGE_SIZE = 4;

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await getAllProduct();
      setProducts(response.data);
    };
    fetchProduct();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.productName.toLowerCase().includes(search.toLowerCase())
  );
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleUpdate = (product) => {
    console.log(product._id);
    navigate(`/admin/product/editproduct/${product._id}`);
  }


  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <h2>Quản lý sản phẩm</h2>
        <Link to={'/admin/product/addproduct'} className={cx("add-button")} >+ Thêm sản phẩm</Link>
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
              <th>Image</th>
              <th>Tên sản phẩm</th>
              <th>Màu</th>
              <th>Size</th>
              <th>Giá</th>
              <th>Danh mục</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td><img src={product.images[0].src} alt="" className={cx("image-product")} /></td>
                <td>{product.productName}</td>
                <td>
                  <ul className={cx('size-list')}>
                    {product.colors.map((color) => (
                      <li key={color._id} className={cx('color-item')}>
                        <p className={cx("color-title")}>{color.name}</p>
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul className={cx('size-list')}>
                    {product.sizes.map((size) => (
                      <li key={size._id} className={cx('size-item')}>
                        <p className={cx("size-title")}>{size.size}</p>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className={cx("price")}>
                  {product.price.original && (
                    <span>Giá gốc: {product.price.original.toLocaleString("vi-VN")}đ</span>
                  )}
                  <p>Giảm giá: {product.discount}%</p>
                  <p>Giá:{product.price.current}đ</p>
                </td>
                <td>{product.category.name}
                  <br />
                  
                </td>
                <td>
                  <button className={cx("edit-button")} onClick={() => handleUpdate(product)} key={product._id}>Sửa</button>
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
