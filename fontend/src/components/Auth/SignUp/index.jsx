import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./SignUp.module.scss";
import SummaryApi from "~/utils/ApiRoute";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function SignUp() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    fullname: '', email: '', phone: '', password: '', role: 'admin'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(data.phone)) { // Regex kiểm tra số điện thoại 10 số
      toast.error("Số điện thoại phải là 10 chữ số");
      return;
    }
    try {
      const response = await axios({
        url: SummaryApi.SignUp.url,
        method: SummaryApi.SignUp.method,
        headers: {
          "Content-Type": "application/json"
        },
        data: data
      });

      if (response.data.success) {
        toast.success("Đăng ký thành công");
        navigate("/");
      } else {
        toast.error("Không thể đăng ký");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Có lỗi xảy ra khi đăng ký");
      } else {
        toast.error("Lỗi kết nối, vui lòng thử lại");
      }
    }
  }
  return (
    <div className={cx("SignUp")}>
      <div className={cx("SignUp__container")}>
        <h1 className={cx("SignUp__title")}>Đăng ký</h1>
        <p className={cx("SignUp__subtitle")}>Chào ký ngay để nhận voucher 50% giá trị!</p>

        <form className={cx("SignUp__form")} method="post" onSubmit={handleSubmit}>
          <div className={cx("form-group")}>
            <label>Tên của bạn</label>
            <input
              type="text"
              pattern="^[a-zA-ZÀ-ỹ\s]+$"
              name="fullname"
              value={data.fullname}
              onChange={handleChange}
              placeholder="Nhập tên của bạn"
              required />
          </div>
          <div className={cx("form-group")}>
            <label>SĐT của bạn</label>
            <input
              type="text"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              pattern="\d{10}"
              required
              placeholder="Nhập Số điện thoại của bạn" />
          </div>
          <div className={cx("form-group")}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
              placeholder="Nhập email của bạn" />
          </div>
          <div className={cx("form-group")}>
            <label>Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
              placeholder="Nhập mật khẩu" />
          </div>

          <div className={cx("form-options")}>
            <div>
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Nhớ tài khoản</label>
            </div>
            <a href="#!" className={cx("forgot-password")}>Quên mật khẩu?</a>
          </div>

          <button className={cx("SignUp__button")} type="submit">Đăng ký</button>
        </form>

        <p className={cx("SignUp__signup")}>
          bạn có tài khoản? <Link to={'/login'}>Đăng nhập ngay</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
