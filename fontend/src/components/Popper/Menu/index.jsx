import React, { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import style from './Menu.module.scss'
import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import axios from 'axios';
import SummaryApi from '~/utils/ApiRoute';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);
export const Menu = ({ children }) => {
    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        navigate(`/collection/${category._id}`, { state: { categoryName: category.name } });
    }

    const handleSubCategoryClick = (subCategory) => {
        navigate(`/collection/subcategories/${subCategory._id}`);
    }
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios({
                    url: SummaryApi.GetCategories.url,
                    method: SummaryApi.GetCategories.method,
                });
                setCategories(response.data.data);
            } catch (error) {
                console.error("Lấy danh mục ko thành công", error);
            }
        };

        fetchCategories();
    }, [])
    const renderItems = () => {
        return (
            <div className={cx('category-menu')}>
                {/* Categories */}
                <div className={cx('categories')}>
                    {categories.map((category) => (
                        <div key={category._id} className={cx('category')}>
                            <h3 key={category._id} onClick={() => handleCategoryClick(category)} className={cx('category-title')}>
                                {category.name}
                            </h3>
                            <ul className={cx('category-list')}>
                                {category.children.map((subCategory) => (
                                    <li key={subCategory._id} onClick={() => handleSubCategoryClick(subCategory)} className={cx('category-item')}>
                                        <img src={subCategory.image} alt={subCategory.name} className={cx('subcategory-image')} />
                                        <p className={cx("subcategory-title")}>{subCategory.name}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return (
        <Tippy
            interactive
            placement="bottom-start"
            render={(attrs) => (
                <div className={cx('content')} {...attrs}>
                    <PopperWrapper>
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    )
}
