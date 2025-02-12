import React, { use, useState } from "react";
import style from "./DetailProduct.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

const ImageSwitcher = ({ images = [], productName, price, discounts, colors, sizes, description }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(colors?.[0]?.name || "");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectQuantity, setSelectQuantity] = useState(1);

  const handleImageChange = (index) => setCurrentIndex(index);
  const handleColorChange = (color) => setSelectedColor(color);
  const handleSizeChange = (size) => setSelectedSize(size);

  return (
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
        <div className={cx("price")}>
          <span className={cx("current-price")}>{price.current}đ</span>
          <span className={cx("original-price")}>{price.original}đ</span>
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
            <button
              key={index}
              className={cx("size", { active: selectedSize === size })}
              onClick={() => handleSizeChange(size)}
            >
              {size}
            </button>
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
          <button className={cx("add-to-cart")}>{selectedSize ? "Thêm vào giỏ hàng" : "Chọn kích thước"}</button>
        </div>


      </div>
    </div>
  );
};

export default ImageSwitcher;
