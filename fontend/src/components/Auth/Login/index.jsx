import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import SummaryApi from "~/utils/ApiRoute";
import { fetchUserInfo, loginUser } from "~/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const cx = classNames.bind(styles);

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user, error} = useSelector((state) => state.auth);
  const [data, setData] = useState({
    phone: "", password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  const handeSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(data.phone)) {
      toast.error("SDT phải là 10 số");
      return;
    }

    try {
      const response = await axios({
        url: SummaryApi.Login.url,
        method: SummaryApi.Login.method,
        withCredentials: 'true',
        headers: {
          "Content-Type": "application/json"
        },
        data: data
      });

      if (response.data.success) {
        dispatch(loginUser(data));
        toast.success("Đăng nhập thành công");
        navigate("/");
        window.location.reload();
      } else {
        toast.error("Không thể đăng nhập lỗi thông tin");
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
    <div className={cx("login")}>
      <div className={cx("login__container")}>
        <h1 className={cx("login__title")}>Đăng nhập</h1>
        <p className={cx("login__subtitle")}>Chào mừng bạn quay lại! Hãy đăng nhập để tiếp tục.</p>

        <form className={cx("login__form")} method="post" onSubmit={handeSubmit}>
          <div className={cx("form-group")}>
            <label>Số điện thoại</label>
            <input
              type="text"
              value={data.phone}
              name="phone"
              onChange={handleChange}
              pattern="\d{10}"
              required
              placeholder="Nhập email của bạn" />
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
