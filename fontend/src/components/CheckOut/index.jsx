import React, { useState, useEffect } from 'react';
import style from './Checkout.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';

const cx = classNames.bind(style);
const CheckOut = () => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");

    // 🏙️ Fetch danh sách tỉnh
    useEffect(() => {
        axios.get("https://provinces.open-api.vn/api/p/")
            .then(res => setProvinces(res.data))
            .catch(err => console.error("Lỗi lấy tỉnh: ", err));
    }, []);

    // 🏡 Khi chọn tỉnh -> Fetch huyện
    useEffect(() => {
        if (selectedProvince) {
            axios.get(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
                .then(res => setDistricts(res.data.districts))
                .catch(err => console.error("Lỗi lấy huyện: ", err));
        } else {
            setDistricts([]);
            setWards([]);
        }
    }, [selectedProvince]);

    // 🏠 Khi chọn huyện -> Fetch xã
    useEffect(() => {
        if (selectedDistrict) {
            axios.get(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
                .then(res => setWards(res.data.wards))
                .catch(err => console.error("Lỗi lấy xã: ", err));
        } else {
            setWards([]);
        }
    }, [selectedDistrict]);

    return (
        <div className={cx('container')}>
            <h1 className={cx('checkout-title')}>Thông tin đặt hàng</h1>

            <div className={cx("cart-summary")}>
                <h2>Tổng cộng</h2>
                <div className={cx("summary-row")}>
                    <span>Số lượng </span>
                    <span>1209999đ</span>
                </div>
                <div className={cx("summary-row")}>
                    <span>Giao hàng</span>
                    <p>Miễn phí ship</p>
                </div>
                <div className={cx("summary-row")}>
                    <span>Giảm giá</span>
                    <input type="text" placeholder="Enter your code" />
                </div>
                <div className={cx("summary-total")}>
                    <span>Thành tiền</span>
                    <span className={cx("total-price")}>1209999đ</span>
                </div>
            </div>

            <form action="">
                <div className={cx("form-group")}>
                    <div className={cx("input-group")}>
                        <label htmlFor="">Họ và tên</label>
                        <input type="text" name='fullName' />
                    </div>
                    <div className={cx("input-group")}>
                        <label htmlFor="">Số điện thoại</label>
                        <input type="text" name='phoneNumber' />
                    </div>
                </div>

                <div className={cx("form-group")}>
                    <div className={cx("input-group")}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="" />
                    </div>

                    <div className={cx("input-group")}>
                        {/* Chọn Tỉnh */}
                        <select value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)}>
                            <option value="">Chọn tỉnh/thành phố</option>
                            {provinces.map((province) => (
                                <option key={province.code} value={province.code}>
                                    {province.name}
                                </option>
                            ))}
                        </select>

                        {/* Chọn Huyện */}
                        <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} disabled={!selectedProvince}>
                            <option value="">Chọn quận/huyện</option>
                            {districts.map((district) => (
                                <option key={district.code} value={district.code}>
                                    {district.name}
                                </option>
                            ))}
                        </select>

                        {/* Chọn Xã */}
                        <select value={selectedWard} onChange={(e) => setSelectedWard(e.target.value)} disabled={!selectedDistrict}>
                            <option value="">Chọn phường/xã</option>
                            {wards.map((ward) => (
                                <option key={ward.code} value={ward.code}>
                                    {ward.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={cx("input-group")}>
                        <label htmlFor="note">Ghi chú </label>
                        <input type="note" name="note" id="" />
                    </div>
                </div>

                <button className={cx('checkout-btn')}>Đặt hàng</button>
            </form>

            <div className={cx("payment-option")}>

            </div>

        </div>
    );
}

export default CheckOut;