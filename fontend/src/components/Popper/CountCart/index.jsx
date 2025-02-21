import React from 'react';
import Tippy from '@tippyjs/react/headless';
import style from './CountCart.module.scss'
import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const cx = classNames.bind(style)
export const CountCart = ({ children }) => {
    const navigate = useNavigate();
    const cartitems = useSelector((state) => state.cart.items);

    const handleDetailProduct = (product) => {
        navigate(`/product/${product._id}`);
    }
    const renderItems = () => {
        return (
            <div className={cx('list-cart')}>
                {/* title and count cart */}
                <div className={cx("list-count")}>
                    <p><strong>{cartitems.length}</strong> sản phẩm</p>
                    <Link to={"/cart"} className={cx("count-all")}>Xem tất cả </Link>
                </div>
                {cartitems.map((item, index) => (
                    <div key={index._id} onClick={() => handleDetailProduct(item)} className={cx("list-product")}>
                        <img src={item.images} alt={item.productName} />
                        <div className={cx("detail")}>
                            <p className={cx("name-product")}>{item.productName}</p>
                            <p className={cx("type-product")}>{item.color}</p>
                            <div className={cx("price-list")}>
                                <h4 className={cx('price')}><strong>{item.price}</strong> đ</h4>
                                <p className={cx('old-price')}>{item.price.orinal}</p>
                            </div>
                            <p className={cx("quantity")}>x{item.quantity}</p>
                        </div>
                        <div className={cx("delete")}>
                            <button>x</button>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <Tippy
            interactive
            placement="bottom-end"
            delay={200}
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
