import React from 'react';
import Tippy from '@tippyjs/react/headless';
import style from './CountCart.module.scss'
import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style)
export const CountCart = ({ children, items = [] }) => {

    const renderItems = () => {
        return (
            <div className={cx('list-cart')}>
                {/* title and count cart */}
                <div className={cx("list-count")}>
                    <p><strong>{items.length}</strong> sản phẩm</p>
                    <Link to={"./cart"} className={cx("count-all")}>Xem tất cả </Link>
                </div>
                {items.map((item, index) => (
                    <div key={index} className={cx("list-product")}>
                        <img src={item.image} alt={item.name} />
                        <div className={cx("detail")}>
                            <p className={cx("name-product")}>{item.name}</p>
                            <p className={cx("type-product")}>{item.type}</p>
                            <div className={cx("price-list")}>
                                <h4 className={cx('price')}><strong>{item.price}</strong></h4>
                                <p className={cx('old-price')}>{item.oldPrice}</p>
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
