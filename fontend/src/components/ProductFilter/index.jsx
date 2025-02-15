import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ProductFilter.module.scss";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

const ProductFilter = () => {
  const selectedCategory = useSelector((state) => state.category.selectedCategory);

  const [selectedCategories, setSelectedCategory] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const categories = ["Quần Dài", "Quần Shorts", "Quần Lót", "Quần Bơi"];
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
        <div className={cx("filter-group")}>
          <h4>Nhóm sản phẩm</h4>
          {categories.map((category, index) => (
            <div key={index} className={cx("filter-item")}>
              <input
                type="radio"
                id={`category-${index}`}
                name="category"
                checked={selectedCategories === category}
                onChange={() => setSelectedCategory(category)}
              />
              <label htmlFor={`category-${index}`}>{category}</label>
            </div>
          ))}
        </div>

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
        <h2 className={cx("category-title")}>{selectedCategory.name}</h2>
        <div className={cx("breadcrumb")}>Trang chủ / {selectedCategory.name}</div>
        <div className={cx("products")}>
          <div className={cx("product-item")}>
            <img src="https://via.placeholder.com/150" alt="Product 1" />
            <p>Quần Dài</p>
          </div>
          <div className={cx("product-item")}>
            <img src="https://via.placeholder.com/150" alt="Product 2" />
            <p>Quần Shorts</p>
          </div>
          <div className={cx("product-item")}>
            <img src="https://via.placeholder.com/150" alt="Product 3" />
            <p>Quần Lót</p>
          </div>
          <div className={cx("product-item")}>
            <img src="https://via.placeholder.com/150" alt="Product 4" />
            <p>Quần Bơi</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
