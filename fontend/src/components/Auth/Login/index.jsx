import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";

const cx = classNames.bind(styles);

function Login() {
  const [data, setData] = useState({
    username: "", password: ""
  });
  return (
    <div className={cx("login")}>
      <div className={cx("login__container")}>
        <h1 className={cx("login__title")}>Đăng nhập</h1>
        <p className={cx("login__subtitle")}>Chào mừng bạn quay lại! Hãy đăng nhập để tiếp tục.</p>

        <form className={cx("login__form")}>
          <div className={cx("form-group")}>
            <label>Email</label>
            <input type="email" placeholder="Nhập email của bạn" />
          </div>
          <div className={cx("form-group")}>
            <label>Mật khẩu</label>
            <input type="password" placeholder="Nhập mật khẩu" />
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

        <div className={cx("login__divider")}>
          <span>Hoặc</span>
        </div>

        <div className={cx("social-login")}>
          <button className={cx("social-button", "google")}>Đăng nhập với Google</button>
          <button className={cx("social-button", "facebook")}>Đăng nhập với Facebook</button>
        </div>

        <p className={cx("login__signup")}>
          Chưa có tài khoản? <a href="#!">Đăng ký ngay</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
