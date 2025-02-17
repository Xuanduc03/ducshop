import React, { useState } from 'react';
import style from './AddProduct.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);
const AddProduct = () => {
    const [product, setProduct] = useState({
        productName: '',
        features: '',
        price: {
            current: 0,
            original: null,
        },
        discount: null,
        category: '',
        subcategory: '',
        images: [{ thumbnail: '', src: '' }],
        colors: [{ name: '', code: '' }],
        sizes: [{ size: '' }],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            price: { ...product.price, [name]: value },
        });
    };

    const handleImageChange = (index, e) => {
        const { name, value } = e.target;
        const updatedImages = [...product.images];
        updatedImages[index][name] = value;
        setProduct({ ...product, images: updatedImages });
    };

    const handleAddImage = () => {
        setProduct({
            ...product,
            images: [...product.images, { thumbnail: '', src: '' }],
        });
    };

    const handleColorChange = (index, e) => {
        const { name, value } = e.target;
        const updatedColors = [...product.colors];
        updatedColors[index][name] = value;
        setProduct({ ...product, colors: updatedColors });
    };

    const handleAddColor = () => {
        setProduct({
            ...product,
            colors: [...product.colors, { name: '', code: '' }],
        });
    };

    const handleSizeChange = (index, e) => {
        const { name, value } = e.target;
        const updatedSizes = [...product.sizes];
        updatedSizes[index][name] = value;
        setProduct({ ...product, sizes: updatedSizes });
    };

    const handleAddSize = () => {
        setProduct({
            ...product,
            sizes: [...product.sizes, { size: '' }],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(product); // Xử lý dữ liệu sản phẩm ở đây
    };

    return (
        <form className={cx('product-form')} onSubmit={handleSubmit}>
            {/* Các trường dữ liệu khác */}
            <div className={cx('form-group')}>
                <label htmlFor="productName">Tên sản phẩm:</label>
                <input
                    type="text"
                    id="productName"
                    name="productName"
                    value={product.productName}
                    onChange={handleChange}
                />
            </div>

            <div className={cx('form-group')}>
                <label htmlFor="features">Đặc điểm:</label>
                <textarea
                    id="features"
                    name="features"
                    value={product.features}
                    onChange={handleChange}
                />
            </div>

            {/* Giá */}
            <div className={cx('form-group')}>
                <label htmlFor="currentPrice">Giá hiện tại:</label>
                <input
                    type="number"
                    id="currentPrice"
                    name="current"
                    value={product.price.current}
                    onChange={handlePriceChange}
                />
            </div>

            <div className={cx('form-group')}>
                <label htmlFor="originalPrice">Giá gốc:</label>
                <input
                    type="number"
                    id="originalPrice"
                    name="original"
                    value={product.price.original || ''}
                    onChange={handlePriceChange}
                />
            </div>

            {/* Hình ảnh */}
            <div className={cx('form-group')}>
                <label>Hình ảnh:</label>
                {product.images.map((image, index) => (
                    <div key={index} className={cx('image-input')}>
                        <input
                            type="text"
                            name="thumbnail"
                            placeholder="Thumbnail"
                            value={image.thumbnail}
                            onChange={(e) => handleImageChange(index, e)}
                        />
                        <input
                            type="text"
                            name="src"
                            placeholder="Source"
                            value={image.src}
                            onChange={(e) => handleImageChange(index, e)}
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddImage}>
                    Thêm ảnh
                </button>
            </div>

            {/* Màu sắc */}
            <div className={cx('form-group')}>
                <label>Màu sắc:</label>
                {product.colors.map((color, index) => (
                    <div key={index} className={cx('color-input')}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Tên màu"
                            value={color.name}
                            onChange={(e) => handleColorChange(index, e)}
                        />
                        <input
                            type="color"
                            name="code"
                            value={color.code}
                            onChange={(e) => handleColorChange(index, e)}
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddColor}>
                    Thêm màu
                </button>
            </div>

            {/* Kích cỡ */}
            <div className={cx('form-group')}>
                <label>Kích cỡ:</label>
                {product.sizes.map((size, index) => (
                    <div key={index} className={cx('size-input')}>
                        <input
                            type="text"
                            name="size"
                            placeholder="Kích cỡ"
                            value={size.size}
                            onChange={(e) => handleSizeChange(index, e)}
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddSize}>
                    Thêm kích cỡ
                </button>
            </div>

            <button type="submit">Lưu sản phẩm</button>
        </form>
    );
};

export default AddProduct;