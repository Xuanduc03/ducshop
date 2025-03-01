import React, { useEffect, useState } from 'react';
import style from "./Dashboard.module.scss";
import classNames from 'classnames/bind';
import axios from 'axios';

const cx = classNames.bind(style);
const Dashboard = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products');
        setProduct(response.data.data);
      }
      catch (error) {
        console.log('Failed to fetch product list: ', error);
      }
    }
    fetchProduct();
  }, []);

  return (
    <div className={cx('container')}>
      <div className={cx("header")}>
        <h1>Dashboard</h1>
      </div>
      <div className={cx("list-category")}>

        <div className={cx("box", "box-1")}>
          <div className={cx("card")}>
            <div className={cx("content")}>
              <p className={cx("card-title")}>Doanh thu (tháng)</p>
              <p className={cx("card-number")}>1.000.000.000 VND</p>
            </div>
            <div className={cx("icon")}>
              <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>


        <div className={cx("box", "box-2")}>
          <div className={cx("card")}>
            <div className={cx("content")}>
              <p className={cx("card-title")}>Số sản phẩm</p>
              <p className={cx("card-number")}>
                {product.length}
              </p>
            </div>
            <div className={cx("icon")}>
              <i className="fas fa-calendar fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>

        <div className={cx("box", "box-3")}>
          <div className={cx("card")}>
            <div className={cx("content")}>
              <p className={cx("card-title")}>Yêu cầu chờ xử lý</p>
              <p className={cx("card-number")}>18</p>
            </div>
            <div className={cx("icon")}>
              <i className="fas fa-calendar fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>

        <div className={cx("box", "box-4")}>
          <div className={cx("card")}>
            <div className={cx("content")}>
              <p className={cx("card-title")}>Doanh thu (tháng)</p>
              <p className={cx("card-number")}>1.000.000.000 VND</p>
            </div>
            <div className={cx("icon")}>
              <i className="fas fa-calendar fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Dashboard