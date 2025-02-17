import React, { useState } from "react";
import style from "./DetailProduct.module.scss";
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react";
import { Link } from "react-router-dom";

const cx = classNames.bind(style);

const ImageSwitcher = ({ images = [], productName, price, discounts, colors, sizes, description, category,subcategory }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(colors?.[0]?.name || "");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectQuantity, setSelectQuantity] = useState(1);

  const handleImageChange = (index) => setCurrentIndex(index);
  const handleColorChange = (color) => setSelectedColor(color);
  const handleSizeChange = (size) => setSelectedSize(size);

  return (
    <div className={cx("product-detail")}>
      <nav className={cx("breadcrumb")}>
        <ul>
          <Link to={'/'}>Trang chủ</Link>
          <span> / </span>
          <Link to={'/collection'}>{category}</Link>
          <span> / </span>
          <Link>{subcategory}</Link>
        </ul>
      </nav>
      <div className={cx("image-switcher")}>
        {/* Left - Thumbnails */}
        <div className={cx("thumbnails")}>
          {images.map((image, index) => (
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
          <img src={images[currentIndex]?.src} alt={`Image ${currentIndex}`} />
        </div>

        {/* Right - Product Details */}
        <div className={cx("details")}>
          <h1 className={cx("product-name")}>{productName}</h1>
          <span className={cx("original-price")}>{price.original}đ</span>
          <div className={cx("price")}>
            <span className={cx("current-price")}>{price.current}đ</span>
            <span className={cx("discount")}>{discounts}</span>
          </div>

          {/* select color button */}
          <p className={cx("color-label")}>
            Màu sắc: <strong className={cx("selected")}>{selectedColor}</strong>
          </p>
          <div className={cx("colors")}>
            {colors.map((color, index) => (
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
            {sizes.map((size, index) => (
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
            <button className={cx("add-to-cart")}><i className="fa-solid fa-bag-shopping"></i>{selectedSize ? "Thêm vào giỏ hàng" : "Chọn kích thước"}</button>
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

export default ImageSwitcher;
