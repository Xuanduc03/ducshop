import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getUser } from '~/services/userService';

const ProtectedRoute = ({ children, role }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            const fetchUser = async () => {
                try {
                    const response = await getUser();
                    setUser(response.data);
                } catch (error) {
                   console.log("Lỗi khi lấy thông tin ", error) 
                } finally{
                    setLoading(false);
                }
            };
            fetchUser();
    }, []);
    if (loading) return <div>Đang tải...</div>;

    if (!user) return <Navigate to={'/login'} replace/>

    if (role && user.role !== role) return <Navigate to={"/"} />

    return children || <Outlet />;
}

export default ProtectedRoute