import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "~/services/userService";

const cx = classNames.bind(styles);

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    phone: "", email: "", password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneOrEmail") {
      if (/^\d+$/.test(value)) {
        setData({ ...data, phone: value, email: "" });
      } else {
        setData({ ...data, email: value, phone: "" });
      }
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handeSubmit = async (e) => {
    e.preventDefault();

    if (!data.phone && !data.email) {
      toast.error("Vui lòng nhập email hoặc số điện thoại");
      return;
    }
    console.log(data);

    try {
      await login(data);
      toast.success("Đăng nhập thành công");
      navigate("/");
      window.location.reload();
    } catch (error) {
      toast.error("Tài khoản và mật khẩu ko đúng");
    }
  }
  return (
    <div className={cx("login")}>
      <div className={cx("login__container")}>
        <h1 className={cx("login__title")}>Đăng nhập</h1>
        <p className={cx("login__subtitle")}>Chào mừng bạn quay lại! Hãy đăng nhập để tiếp tục.</p>

        <form className={cx("login__form")} method="post" onSubmit={handeSubmit}>
          <div className={cx("form-group")}>
            <label>Số điện thoại hoặc email</label>
            <input
              type="text"
              value={data.phone ? data.phone : data.email}
              name="phoneOrEmail"
              onChange={handleChange}
              required
              placeholder="Nhập email hoặc SDT của bạn" />
          </div>
          <div className={cx("form-group")}>
            <label>Mật khẩu</label>
            <input
              type="password"
              value={data.password}
              name="password"
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

          <button className={cx("login__button")} type="submit">Đăng nhập</button>
        </form>
        <p className={cx("login__signup")}>
          Chưa có tài khoản? <Link to={'/signup'}>Đăng ký ngay</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
