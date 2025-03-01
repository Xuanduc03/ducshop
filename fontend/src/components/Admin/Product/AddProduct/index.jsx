import React, { useEffect, useState } from 'react';
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
        seoDescription: "",
        price: { current: null, original: null },
        category: '',
        subcategory: '',
        discounts: '0%',
        stock: 0,
        types: [{name: ''}],
        images: [{ thumbnail: '', src: '' }],
        colors: [{ name: '', code: '' }],
        sizes: [],
    });

    const sizeOptions = [
        { size: "S", heightRange: "1m55 - 1m60", weightRange: "40kg - 50kg" },
        { size: "M", heightRange: "1m60 - 1m65", weightRange: "55kg - 61kg" },
        { size: "L", heightRange: "1m66 - 1m72", weightRange: "63kg - 68kg" },
        { size: "XL", heightRange: "1m72 - 1m77", weightRange: "69kg - 75kg" },
        { size: "2XL", heightRange: "1m77 - 1m73", weightRange: "76kg - 82kg" },
        { size: "3XL", heightRange: "1m84 - 1m88", weightRange: "82kg - 87kg" }
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: name === "seoDescription" ? formatText(value) : (type === "checkbox" ? checked : value)
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

    const formatText = (text) => {
        return text
            .replace(/\n/g, "") // Xóa xuống dòng thừa
            .replace(/: /g, ":\n• ") // Thêm bullet khi có dấu ":"
            .replace(/\.\s/g, ".\n\n") // Xuống dòng sau mỗi câu
            .replace(/Đặc điểm nổi bật:/g, "\n🔹 Đặc điểm nổi bật:\n") // Làm nổi bật tiêu đề
            .replace(/Công nghệ Excool:/g, "\n⭐ Công nghệ Excool:\n")
            .replace(/Chất liệu:/g, "\n📌 Chất liệu:\n")
            .replace(/Thiết kế:/g, "\n🎨 Thiết kế:\n")
            .replace(/Outlet:/g, "\n🛒 Outlet:\n");
    };

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/categories");
                setCategories(response.data.data);
            } catch (error) {
                console.error("Lấy danh mục ko thành công", error);
            }
        };

        fetchCategories();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

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
        <div className={cx("container")}>
            <div className={cx("header")}>
                <h1 className={cx('header-title')}>Tạo sản phẩm</h1>
                <button type="submit" form='product-form' className={cx("button-submit")}>Lưu sản phẩm</button>
            </div>
            <form id='product-form' className={cx('product-form')} onSubmit={handleSubmit}>

                {/* Tên sản phẩm */}
                <div className={cx("left-group")}>
                    <div className={cx('form-group')}>
                        <h3 className={cx("form-title")}>Thông tin sản phẩm</h3>
                        <div className={cx('input-group')}>
                            <label htmlFor="productName">Tên sản phẩm:</label>
                            <input type="text" id="productName" name="productName" value={product.productName} required onChange={handleChange} />
                        </div>

                        <div className={cx('input-group')}>
                            <label htmlFor="features">Đặc điểm:</label>
                            <textarea id="features" name="features" value={product.features} required onChange={handleChange} />
                        </div>
                        {/* Kích cỡ */}
                        <div className={cx('input-group')}>
                            <label>Kích cỡ:</label>
                            <ul className={cx("list-size")}>
                                {sizeOptions.map((size, index) => (
                                    <li key={index} className={cx('size-checkbox')}>
                                        <input type="checkbox" checked={product.sizes.some(s => s.size === size.size)} onChange={() => handleSizeToggle(size)} />
                                        {size.size}
                                    </li>
                                ))}
                            </ul>

                        </div>

                        {/* Màu sắc */}
                        <div className={cx('input-group')}>
                            <label>Màu sắc:</label>
                            {product.colors.map((color, index) => (
                                <div key={index} className={cx("input-color")}>
                                    <input type="text" name="name" placeholder="Tên màu" value={color.name} required onChange={(e) => handleColorChange(index, e)} />
                                    <input type="color" name="code" value={color.code} required onChange={(e) => handleColorChange(index, e)} />
                                </div>
                            ))}
                            <button type="button" className={cx('btn-handle')} onClick={handleAddColor}>Thêm màu</button>
                        </div>
                    </div>

                    {/* Giá */}
                    <div className={cx('form-group', 'form-price')}>
                        <h3 className={cx("form-title")}>Giá và lượng hàng</h3>
                        <div className={cx("input-row")}>
                            <div className={cx("input-group")}>
                                <label htmlFor="originalPrice">Giá gốc:</label>
                                <input
                                    type="number"
                                    id="originalPrice"
                                    name="original"
                                    value={product.price.original || ''}
                                    onChange={handlePriceChange}
                                />
                            </div>

                            <div className={cx("input-group")}>
                                <label htmlFor="currentPrice">Giá hiện tại:</label>
                                <input
                                    type="number"
                                    id="currentPrice"
                                    name="current"
                                    value={product.price.current || ''}
                                    required
                                    onChange={handlePriceChange}
                                />
                            </div>
                        </div>
                        <div className={cx("input-row")}>
                            <div className={cx("input-group")}>
                                <label htmlFor="discounts">Giảm giá:</label>
                                <input
                                    type="text"
                                    id="discounts"
                                    name="discounts"
                                    value={product.discounts}
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={cx("input-group")}>
                                <label htmlFor="stock">kho còn:</label>
                                <input
                                    type="text"
                                    id="stock"
                                    name="stock"
                                    value={product.stock}
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                        </div>


                        {/* hàng mới */}
                        <div className={cx('input-group')}>
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
                    </div>
                </div>

                <div className={cx('right-group')}>
                    <div className={cx('form-group')}>
                        <h3 className={cx('form-title')}>Upload hình ảnh</h3>

                        <div className={cx("upload-preview")}>
                            <img src={product.images[0]?.src || '/placeholder-image.jpg'} alt="Ảnh sản phẩm" />
                        </div>

                        <div className={cx("image-list")}>
                            {product.images.map((image, index) => (
                                <div key={index} className={cx('image-input')}>
                                    <input type="text" name="thumbnail" placeholder="Thumbnail" value={image.thumbnail} required onChange={(e) => handleImageChange(index, e)} />
                                    <input type="text" name="src" placeholder="Source" value={image.src} required onChange={(e) => handleImageChange(index, e)} />
                                </div>
                            ))}
                        </div>

                        <button type="button" className={cx('btn-handle')} onClick={handleAddImage}>
                            Thêm ảnh
                        </button>
                    </div>

                    {/* Danh mục */}
                    <div className={cx('form-group')}>
                        <h3 className={cx('form-title')}>Danh mục</h3>
                        <div className={cx("input-group")}>
                            <label htmlFor="category">Danh mục:</label>
                            <select className={cx("select-category")} id="category" name="category" value={product.category} required onChange={handleChange}>
                                <option value="">Chọn danh mục</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className={cx("input-group")}>
                            <label htmlFor="subcategory">Danh mục con:</label>
                            <select
                                className={cx("select-category")}
                                id="subcategory"
                                name="subcategory"
                                value={product.subcategory}
                                required
                                onChange={handleChange}
                            >
                                <option value="">Chọn danh mục</option>

                                {categories.map((category) => (
                                    <optgroup key={category._id} label={category.name}>
                                        {category.children.map((subCategory) => (
                                            <option key={subCategory._id} value={subCategory._id}>
                                                {subCategory.name}
                                            </option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* SEO */}
                    <div className={cx('form-group')}>
                        <h3 className={cx('form-title')}>SEO</h3>
                        <div className={cx('input-group')}>
                            <label htmlFor="seoDescription">Mô tả SEO:</label>
                            <textarea id="seoDescription" name="seoDescription" className={cx('seo-textarea')} value={product.seoDescription} onChange={handleChange} />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
