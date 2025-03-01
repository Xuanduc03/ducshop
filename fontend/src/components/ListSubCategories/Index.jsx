import React, { useCallback, useEffect, useMemo, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ListSubCate.module.scss";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ProductItem } from "../ProductItem";

const cx = classNames.bind(styles);

const ListSubCategories = () => {
  const { subcategoryId } = useParams();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const responseCategory = await axios.get(`http://localhost:8080/api/category/${subcategoryId}`);
        const responseProduct = await axios.get(`http://localhost:8080/api/products/subcategory/${subcategoryId}`);
        setCategories(responseCategory.data.data);
        setProducts(responseProduct.data.data);
      } catch (error) {
        console.error("Lấy danh mục ko thành công", error);
      }
    };

    fetchCategories();
  }, [subcategoryId]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory = selectedSubCategory ? product.category._id === selectedSubCategory : true;
      const matchSize = selectedSize ? product.sizes.some(size => size.name === selectedSize) : true;
      const matchColor = selectedColor ? product.colors.some(color => color.name === selectedColor) : true;
      return matchCategory && matchSize && matchColor;
    })
  }, [products, selectedSubCategory, selectedSize, selectedColor]);


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
        <div className={cx("breadcrumb")}>
            <Link to="/">
            Trang chủ </Link>
            / 
            {categories.name}</div>
        <h2 className={cx("category-title")}>{categories.name}</h2>

        {/* Danh sách danh mục con */}
        <div className={cx("subcategory-list")}>
            <div
              key={categories._id}
              className={cx("category-item")}>
              <img src={categories.image} alt={categories.name} className={cx("subcategory-image")} />
              <p className={cx("subcategory-title")}>{categories.name}</p>
            </div>
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

export default ListSubCategories;
