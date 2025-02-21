import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ProductFilter.module.scss";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { ProductItem } from "../ProductItem";

const cx = classNames.bind(styles);

const ProductFilter = () => {
  const { categoryId } = useParams();
  const location = useLocation();
  const categoryName = location.state?.categoryName || "Đang tải...";

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const responseCategory = await axios.get(`http://localhost:8080/api/subcategories/${categoryId}`);
        const responseProduct = await axios.get(`http://localhost:8080/api/products/category/${categoryId}`);
        setCategories(responseCategory.data.data);
        setProducts(responseProduct.data.data);
      } catch (error) {
        console.error("Lấy danh mục ko thành công", error);
      }
    };

    fetchCategories();
  }, [categoryId])

  // State cho filter
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  // Mảng kích cỡ và màu sắc
  const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"];
  const colors = [
    { name: "Đen", code: "#000000" },
    { name: "Xám", code: "#808080" },
    { name: "Cam", code: "#FFA500" },
    { name: "Xanh Lam", code: "#0000FF" },
    { name: "Nâu", code: "#8B4513" },
    { name: "Be", code: "#F5F5DC" },
    { name: "Xanh Rêu", code: "#556B2F" },
    { name: "Navy", code: "#000080" },
  ];



  return (
    <div className={cx("product-filter")}>
      {/* Sidebar */}
      <div className={cx("sidebar")}>
        {/* Filter Danh Mục Con */}
        <div className={cx("filter-group")}>
          <h4 className={cx("filter-title")}>Nhóm sản phẩm</h4>
          {categories?.map((subCategory) => (
            <div key={subCategory._id} className={cx("filter-item")}>
              <input
                type="radio"
                id={`category-${subCategory._id}`}
                name="category"
                checked={selectedSubCategory === subCategory.name}
                onChange={() => setSelectedSubCategory(subCategory.name)}
              />
              <label htmlFor={`category-${subCategory._id}`}>
                {subCategory.name}
              </label>
            </div>
          ))}
        </div>

        {/* Filter Kích Cỡ */}
        <div className={cx("filter-group")}>
          <h4>Kích cỡ</h4>
          <div className={cx("size-group")}>
            {sizes.map((size, index) => (
              <button
                key={index}
                className={cx("size-item", { active: selectedSize === size })}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Màu Sắc */}
        <div className={cx("filter-group")}>
          <h4>Màu sắc</h4>
          <div className={cx("color-group")}>
            {colors.map((color, index) => (
              <button
                key={index}
                className={cx("color-item", { active: selectedColor === color.name })}
                style={{ backgroundColor: color.code }}
                onClick={() => setSelectedColor(color.name)}
              >
                {selectedColor === color.name && <span>&#10003;</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className={cx("product-list")}>
        <div className={cx("breadcrumb")}>Trang chủ / {categoryName}</div>
        <h2 className={cx("category-title")}>{categoryName}</h2>

        {/* Danh sách danh mục con */}
        <div className={cx("subcategory-list")}>
          {categories?.map((subCategory) => (
            <div key={subCategory._id} className={cx("category-item")}>
              <img src={subCategory.image} alt={subCategory.name} className={cx("subcategory-image")} />
              <p className={cx("subcategory-title")}>{subCategory.name}</p>
            </div>
          ))}
        </div>

        <div className={cx("product-list__item")}>
          {products.map((product, index) => (
            <ProductItem product={product} key={index} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProductFilter;
