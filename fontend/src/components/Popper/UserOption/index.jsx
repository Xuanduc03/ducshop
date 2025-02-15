import React, { useState, useEffect } from 'react';
import Tippy from '@tippyjs/react/headless';
import style from './UserOption.module.scss'
import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SummaryApi from '~/utils/ApiRoute';
import { toast } from 'react-toastify';

const cx = classNames.bind(style);
export const UserOption = ({ children}) => {
    const navigate = useNavigate();

     const [user, setUser] = useState(null);
    
      useEffect(() => {
          const fetchUserInfo = async () => {
              try {
                  const response = await axios({
                      url: SummaryApi.GetUser.url,
                      method: SummaryApi.GetUser.method,
                      withCredentials: true,
                  });
                  if (response.data.success) {
                      setUser(response.data);
                  }
              } catch (error) {
                  console.error("Error fetching user info:", error);
              }
          };
          fetchUserInfo();
      }, []);

    const handleLogout = async () => {
        try {
            const response = await axios({
                url: SummaryApi.Logout.url,
                method: SummaryApi.Logout.method,
                withCredentials: true,
            });

            if(response.data.success) {
                toast.success("Logout success");
                window.location.reload();
                navigate("/");
            }else {
                toast.error("cann't logout");
            }
        } catch (error) {
            console.log(error);
        }
    };
    const renderItems = () => {
        return (
            <div className={cx("user-dropdown")}>
                <div className={cx("dropdown-menu")}>
                    {user ? (
                        <>
                            <div className={cx("user-info")}>
                                <p className={cx("username")}>Xin chào{user.fullname}</p>
                                <p className={cx("email")}>{user.email}</p>
                            </div>
                            <button className={cx("logout")} onClick={handleLogout}> 
                                <i class="fa-solid fa-right-from-bracket"></i>Đăng xuất
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to={'/login'} className={cx("login")}>
                                Đăng nhập
                            </Link>
                            <Link to={'/signup'} className={cx("register")}>
                                Đăng ký
                            </Link>
                        </>
                    )}
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
