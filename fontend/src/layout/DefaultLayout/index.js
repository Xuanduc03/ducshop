import React from 'react'
import { Header } from '~/components/Header';
import style from "./DefaultLayout.module.scss";
import classNames from 'classnames/bind';

const cx = classNames.bind(style);
const DefaultLayout = ({children}) => {
  return (
    <div className={cx('wrapper')}>
        <Header />
        <div className={cx('container')}>
            {children}
        </div>
    </div>
  )
}

export default DefaultLayout