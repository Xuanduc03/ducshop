import React from 'react';
import Tippy from '@tippyjs/react/headless';
import style from './Menu.module.scss'
import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(style);
export const Menu = ({ children, items = [] }) => {

    const renderItems = () => {
        return (
            <div className={cx('category-menu')}>
                {/* Categories */}
                <div className={cx('categories')}>
                    {items.map((category, index) => (
                        <div key={index} className={cx('category')}>
                            <h3 className={cx('category-title')}>{category.title}</h3>
                            <ul className={cx('category-list')}>
                                {category.items.map((item, idx) => (
                                    <li
                                        key={idx}
                                        className={cx('category-item', { highlight: item.highlight })}
                                    >
                                        {item.name}
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
