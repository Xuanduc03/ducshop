import React, { useState } from 'react';
import style from './ProductItem.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addToCart } from '~/redux/cartSlice';

const cx = classNames.bind(style);

export const ProductItem = ({ product, index }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState("");
    const [currentImage, setCurrentImage] = useState(product.images[0].src || "");

    const handleProductClick = (product) => {
        navigate(`/product/${product._id}`);
    }
    const handleColorChange = (color) => setSelectedColor(color);

    const handleAddToCart = (product) => {
        if (!selectedColor) {
            toast.error("Vui lòng chọn màu");
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
        <div key={index} className={cx("product-item")}>
            <div className={cx("image-container")}
                onMouseEnter={() => setCurrentImage(product.images[1]?.src || product.images[0]?.src)}
                onMouseLeave={() => setCurrentImage(product.images[0]?.thumbnail)}
            >
                {product.brandNew && <div className={cx("brand-new")}>New</div>}
                
                <div className={cx("rate")}>5<i class="fa-solid fa-star"></i></div>
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
                                onClick={() => handleAddToCart(product)}
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

            <a onClick={() => handleProductClick(product)} key={product._id} className={cx("product-info")}>
                <p className={cx("product-name")}>{product.productName}</p>
                <p className={cx("product-price")}>
                    {product.price.current.toLocaleString("vi-VN")}đ
                    {product.discounts !== "0%" && product.discounts && (
                        <p className={cx("product-discount")}>{product.discounts}</p>
                    )}
                    {product.price.original &&
                        <span className={cx("old-price")}>{product.price.original.toLocaleString("vi-VN")} đ</span>
                    }
                   
                </p>
            </a>
        </div>
    );
};
