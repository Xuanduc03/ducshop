import React, { useState } from 'react';
import style from './ProductItem.module.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

const cx = classNames.bind(style);

export const ProductItem = ({ product, index }) => {
    const [selectedColor, setSelectedColor] = useState("");
    const [currentImage, setCurrentImage] = useState(product.images[0].src || "");

    const handleColorChange = (color) => setSelectedColor(color);

    return (
        <div key={index} className={cx("product-item")}>
            <div className={cx("image-container")}
                onMouseEnter={() => setCurrentImage(product.images[1]?.src || product.images[0]?.src)}
                onMouseLeave={() => setCurrentImage(product.images[0]?.thumbnail)}
            >
                <Link to={`/product/${product._id}`}>
                    <img
                        src={currentImage}
                        alt={product.productName}
                        className={cx("product-image")}
                    />
                </Link>

                <div className={cx("overlay")}>
                    <p className={cx('title-size')}>Thêm nhanh vào giỏ hàng</p>
                    <div className={cx("sizes")}>
                        {product.sizes.map((sizeObj, index) => (
                            <button
                                onClick={() => toast.success('Thêm vào giỏ hàng thành công')}
                                key={index}
                                className={cx("size-button")}
                            >
                                {sizeObj.size}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

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

            <Link to={`/product/${product._id}`} className={cx("product-info")}>
                <p className={cx("product-name")}>{product.productName}</p>
                <p className={cx("product-price")}>
                    {product.price.current} đ
                    <span className={cx("old-price")}>{product.price.original && " "} đ</span>
                    <p className={cx("product-discount")}>{product.discounts}</p>
                </p>
            </Link>
        </div>
    );
};
