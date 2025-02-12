import React, { useState } from 'react';
import style from './ProductItem.module.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

const cx = classNames.bind(style);
export const ProductItem = ({ product,index }) => {
    const [selectedColor, setSelectedColor] = useState("");

    const handleColorChange = (color) => setSelectedColor(color);
  
    return (
        <div key={index} className={cx("product-item")}>

            <div className={cx("image-container")}>
                <img src={product.image} alt={product.name} className={cx("product-image")} />
                <div className={cx("overlay")}>
                    <p className={cx('title-size')}>Thêm nhanh vào giỏ hàng</p>
                    <div className={cx("sizes")}>
                        {product.sizes.map((size, index) => (
                            <button onClick={() => toast.success('Thêm vào giỏ hàng thành công ')} key={index} className={cx("size-button")}>
                                {size}
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

            <Link to={"/product"} className={cx("product-info")}>
                <p className={cx("product-name")}>{product.name}</p>
                <p className={cx("product-price")}>
                    {product.price}{" "}
                    <span className={cx("old-price")}>{product.oldPrice}</span>
                </p>
                <p className={cx("product-discount")}>{product.discount}</p>
            </Link>
        </div>
    )
}
