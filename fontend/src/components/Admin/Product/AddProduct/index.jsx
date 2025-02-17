import React, { useState } from 'react';
import style from './AddProduct.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { toast } from 'react-toastify';

const cx = classNames.bind(style);

const AddProduct = () => {
    const [product, setProduct] = useState({
        productName: '',
        features: '',
        brandNew: false,
        price: { current: null, original: null },
        category: '',
        subcategory: '',
        discounts: '0%',
        images: [{ thumbnail: '', src: '' }],
        colors: [{ name: '', code: '' }],
        sizes: [],
    });

    const sizeOptions = [
        { size: "S", heightRange: "1m55 - 1m60", weightRange: "40kg - 50kg" },
        { size: "M", heightRange: "1m60 - 1m65", weightRange: "55kg - 61kg" },
        { size: "L", heightRange: "1m66 - 1m72", weightRange: "63kg - 68kg" },
        { size: "XL", heightRange: "1m72 - 1m77", weightRange: "69kg - 75kg" }
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct(prev => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value
        }));
      };
      

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            price: { ...prev.price, [name]: value ? Number(value) : null }
        }));
    };

    const handleImageChange = (index, e) => {
        const { name, value } = e.target;
        setProduct(prev => {
            const updatedImages = [...prev.images];
            updatedImages[index][name] = value;
            return { ...prev, images: updatedImages };
        });
    };

    const handleAddImage = () => {
        setProduct(prev => ({
            ...prev,
            images: [...prev.images, { thumbnail: '', src: '' }]
        }));
    };

    const handleColorChange = (index, e) => {
        const { name, value } = e.target;
        setProduct(prev => {
            const updatedColors = [...prev.colors];
            updatedColors[index][name] = value;
            return { ...prev, colors: updatedColors };
        });
    };

    const handleAddColor = () => {
        setProduct(prev => ({
            ...prev,
            colors: [...prev.colors, { name: '', code: '' }]
        }));
    };

    const handleSizeToggle = (selectedSize) => {
        setProduct(prev => {
            const exists = prev.sizes.some(size => size.size === selectedSize.size);
            return {
                ...prev,
                sizes: exists
                    ? prev.sizes.filter(size => size.size !== selectedSize.size)
                    : [...prev.sizes, selectedSize]
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('product', product)
        if (!product.productName || !product.price.current) {
            toast.error("Vui lòng nhập tên sản phẩm và giá hiện tại!");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/create-products', product, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 201) {
                toast.success("Tạo sản phẩm thành công!");
            } else {
                toast.error("Không thể tạo sản phẩm!");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi, vui lòng thử lại sau!");
        }
    };

    return (
        <>
            <h1>Tạo sản phẩm</h1>
            <form className={cx('product-form')} onSubmit={handleSubmit}>
                {/* Tên sản phẩm */}
                <div className={cx('form-group')}>
                    <label htmlFor="productName">Tên sản phẩm:</label>
                    <input type="text" id="productName" name="productName" value={product.productName} required onChange={handleChange} />
                </div>

                {/* Đặc điểm */}
                <div className={cx('form-group')}>
                    <label htmlFor="features">Đặc điểm:</label>
                    <textarea id="features" name="features" value={product.features} required onChange={handleChange} />
                </div>

                {/* Giá */}
                <div className={cx('form-group')}>
                    <label htmlFor="currentPrice">Giá hiện tại:</label>
                    <input type="number" id="currentPrice" name="current" value={product.price.current || ''} required onChange={handlePriceChange} />
                </div>

                <div className={cx('form-group')}>
                    <label htmlFor="originalPrice">Giá gốc:</label>
                    <input type="number" id="originalPrice" name="original" value={product.price.original || ''} onChange={handlePriceChange} />
                </div>

                {/* Giảm giá */}
                <div className={cx('form-group')}>
                    <label htmlFor="discounts">Giảm giá:</label>
                    <input type="text" id="discounts" name="discounts" value={product.discounts} required onChange={handleChange} />
                </div>

                {/* Danh mục */}
                {/* Danh mục */}
                <div className={cx('form-group')}>
                    <label htmlFor="category">Danh mục:</label>
                    <select className={cx("select-category")} id="category" name="category" value={product.category} required onChange={handleChange}>
                        <option value="">Chọn danh mục</option>
                        <option value="67b0e7e37da4c5b454388aef">Áo nam</option>
                        <option value="67b0ea647da4c5b454388b00">Quần nam</option>
                        <option value="67b1ec5b72f621ddb0394546">Phụ kiện nam</option>
                    </select>


                    <label htmlFor="subcategory">Danh mục con: </label>
                    <input
                        type="text"
                        id="subcategory"
                        name="subcategory"
                        value={product.subcategory}
                        required onChange={handleChange}
                    />
                </div>

                {/* Hình ảnh */}
                <div className={cx('form-group')}>
                    <label>Hình ảnh:</label>
                    {product.images.map((image, index) => (
                        <div key={index} className={cx('image-input')}>
                            <input type="text" name="thumbnail" placeholder="Thumbnail" value={image.thumbnail} required onChange={(e) => handleImageChange(index, e)} />
                            <input type="text" name="src" placeholder="Source" value={image.src} required onChange={(e) => handleImageChange(index, e)} />
                        </div>
                    ))}
                    <button type="button" className={cx('btn-handle')} onClick={handleAddImage}>Thêm ảnh</button>
                </div>

                {/* Màu sắc */}
                <div className={cx('form-group')}>
                    <label>Màu sắc:</label>
                    {product.colors.map((color, index) => (
                        <div key={index}>
                            <input type="text" name="name" placeholder="Tên màu" value={color.name} required onChange={(e) => handleColorChange(index, e)} />
                            <input type="color" name="code" value={color.code} required onChange={(e) => handleColorChange(index, e)} />
                        </div>
                    ))}
                    <button type="button" className={cx('btn-handle')} onClick={handleAddColor}>Thêm màu</button>
                </div>

                {/* hàng mới */}
                <div className={cx('form-group')}>
                    <label>Hàng mới:</label>
                    <label className={cx('size-checkbox')}>
                        <input
                            type="checkbox"
                            name="brandNew"
                            onChange={handleChange}
                            checked={product.brandNew}  // Đảm bảo rằng trạng thái hiển thị đồng bộ với state
                        />
                        Mẫu mới về
                    </label>
                </div>


                {/* Kích cỡ */}
                <div className={cx('form-group')}>
                    <label>Kích cỡ:</label>
                    {sizeOptions.map((size, index) => (
                        <label key={index} className={cx('size-checkbox')}>
                            <input type="checkbox" checked={product.sizes.some(s => s.size === size.size)} onChange={() => handleSizeToggle(size)} />
                            {size.size} ({size.heightRange} - {size.weightRange})
                        </label>
                    ))}
                </div>

                <button type="submit" className={cx("button-19")}>Lưu sản phẩm</button>
            </form>
        </>
    );
};

export default AddProduct;
