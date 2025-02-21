import React, { useState } from "react";
import style from "./DetailProduct.module.scss";
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "~/redux/cartSlice";
import { toast } from "react-toastify";

const cx = classNames.bind(style);

const DetailProduct = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || "");
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectQuantity, setSelectQuantity] = useState(1);

  const handleImageChange = (index) => setCurrentIndex(index);
  const handleColorChange = (color) => setSelectedColor(color);
  const handleSizeChange = (size) => setSelectedSize(size);

  const handleCategoryClick = (category) => {
    navigate(`/collection/${category._id}`, { state: { categoryName: category.name } });
  }

  const handleAddToCart = (product) => {
    if (!selectedColor || !selectedSize) {
      toast.error("Vui lòng chọn màu và kích thước");
      return;
    } else {
      toast.success(`Thêm ${product.productName} thành công`);
      dispatch(addToCart({
        _id: product._id,
        productName: product.productName,
        price: product.price.current,
        images: product.images[0].src,
        category: product.category.name,
        size: selectedSize,
        color: selectedColor,
        quantity: 1
      }));
    }
  }

  return (
    <div className={cx("product-detail")}>
      <nav className={cx("breadcrumb")}>
        <ul>
          <Link to={'/'}>Trang chủ</Link>
          <span> / </span>
          <a onClick={() => handleCategoryClick(product.category)}>{product.category.name}</a>
          <span> / </span>
          <Link>{product.subcategory}</Link>
        </ul>
      </nav>
      <div className={cx("image-switcher")}>
        {/* Left - Thumbnails */}
        <div className={cx("thumbnails")}>
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleImageChange(index)}
              className={cx("thumbnail", { active: currentIndex === index })}
            >
              <img src={image.thumbnail} alt={`Thumbnail ${index}`} />
            </button>
          ))}
        </div>

        {/* Center - Main Image */}
        <div className={cx("main-image")}>
          <img src={product.images[currentIndex]?.src} alt="" />
        </div>

        {/* Right - Product Details */}
        <div className={cx("details")}>
          <h1 className={cx("product-name")}>{product.productName}</h1>
          <p>{product.features}</p>
          {product.price.original && (
            <span className={cx("original-price")}>{product.price.original.toLocaleString("vi-VN")}đ</span>
          )}
          <div className={cx("price")}>
            <span className={cx("current-price")}>{product.price.current.toLocaleString("vi-VN")}đ</span>
            <span className={cx("discount")}>{product.discounts}</span>
          </div>

          {/* select color button */}
          <p className={cx("color-label")}>
            Màu sắc: <strong className={cx("selected")}>{selectedColor}</strong>
          </p>
          <div className={cx("colors")}>
            {product.colors.map((color, index) => (
              <button
                key={index}
                className={cx("color", { active: selectedColor === color.name })}
                style={{ backgroundColor: color.code }}
                onClick={() => handleColorChange(color.name)}
              ></button>
            ))}
          </div>

          {/* select size button */}
          <p className={cx("size-label")}>Kích thước:
            <strong className={cx("selected")}>{selectedSize}</strong>
          </p>
          <div className={cx("sizes")}>
            {product.sizes.map((size, index) => (
              <Tippy
                key={index}
                placement="bottom"
                content={
                  <div className={cx("size-tooltip")}>
                    <p> {size.heightRange}</p>
                    <p>{size.weightRange}</p>
                  </div>
                }
                interactive={true}
                delay={200}
              >
                <button
                  className={cx("size-button", { active: selectedSize === size.size })}
                  onClick={() => handleSizeChange(size.size)}
                >
                  {size.size}
                </button>
              </Tippy>
            ))}
          </div>

          <div className={cx("actions")}>
            <div className={cx("quantity")}>
              <button
                onClick={
                  () => setSelectQuantity(selectQuantity - 1)}
                disabled={selectQuantity === 1}
              >-</button>
              <span>{selectQuantity}</span>
              <button
                onClick={
                  () => setSelectQuantity(selectQuantity + 1)}
                disabled={selectQuantity === 20}
              >
                +</button>
            </div>
            <button className={cx("add-to-cart")} onClick={() => handleAddToCart(product)}><i className="fa-solid fa-bag-shopping"></i>{selectedSize ? "Thêm vào giỏ hàng" : "Chọn kích thước"}</button>
          </div>

          <div className={cx("product-policy")}>
            <div className={cx("product-policy__item")}>
              <img className={cx("product-policy__img")} src="https://www.coolmate.me/images/product-detail/return.svg" alt="" />
              <p className={cx("product-policy__title")}>Đổi trả cực dễ chỉ cần số điện thoại</p>
            </div>
            <div className={cx("product-policy__item")}>
              <img className={cx("product-policy__img")} src="https://www.coolmate.me/images/product-detail/return-60.svg" alt="" />
              <p className={cx("product-policy__title")}>60 ngày đổi trả vì bất kỳ lý do gì</p>
            </div>
            <div className={cx("product-policy__item")}>
              <img className={cx("product-policy__img")} src="https://www.coolmate.me/images/product-detail/phone.svg" alt="" />
              <p className={cx("product-policy__title")}>Hotline 1900.27.27.37 hỗ trợ từ 8h30 - 22h mỗi ngày</p>
            </div>
            <div className={cx("product-policy__item")}>
              <img className={cx("product-policy__img")} src="https://www.coolmate.me/images/product-detail/location.svg" alt="" />
              <p className={cx("product-policy__title")}>Đến tận nơi nhận hàng trả,
                hoàn tiền trong 24h</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default DetailProduct;
