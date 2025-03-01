import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");


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
  }, [categoryId]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory = selectedSubCategory ? product.category._id === selectedSubCategory : true;
      const matchSize = selectedSize ? product.sizes.some(size => size.name === selectedSize) : true;
      const matchColor = selectedColor ? product.colors.some(color => color.name === selectedColor) : true;
      return matchCategory && matchSize && matchColor;
    })
  }, [products, selectedSubCategory, selectedSize, selectedColor]);

  const handleFilterSubCategory = async (subCategoryId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/products/subcategory/${subCategoryId}`);
      setProducts(response.data.data);
    } catch (error) {
      console.error("Lấy danh mục ko thành công", error);
    }
  };
  const handleFilterChange = useCallback((type, value) => {
    if (type === "subCategory") setSelectedSubCategory(value);
    if (type === "size") setSelectedSize(value);
    if (type === "color") setSelectedColor(value);
  }, []);

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
                onClick={() => handleFilterSubCategory(subCategory._id)}
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
            <div
              key={subCategory._id}
              className={cx("category-item")}
              onClick={() => handleFilterSubCategory(subCategory._id)}>
              <img src={subCategory.image} alt={subCategory.name} className={cx("subcategory-image")} />
              <p className={cx("subcategory-title")}>{subCategory.name}</p>
            </div>
          ))}
        </div>

        {/* tổng sản phẩm và sắp xếp */}
        <div className={cx("product-summary")}>
          <p>{filteredProducts.length} sản phẩm</p>
          <select onChange={(e) => console.log(e.target.value)}>
            <option>Mới nhất</option>
            <option>Bán chạy</option>
            <option>Giá thấp đến cao</option>
            <option>Giá cao đến thấp</option>
            <option>% giảm giá</option>
          </select>
        </div>

        <div className={cx("product-list__item")}>
        {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => <ProductItem product={product} key={product._id} />)
          ) : (
            <p>Không có sản phẩm nào phù hợp.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProductFilter;
