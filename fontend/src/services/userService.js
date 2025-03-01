import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const login = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/login`, data, { withCredentials: true });

        if (response.data.success) {
            return response.data;
        } else {
            throw new Error(response.data.message || "Đăng nhập thất bại");
        }
    } catch (error) {
        console.error("Lỗi login:", error);
        throw error;
    }
};

export const register = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/register`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        await axios.get(`${API_URL}/logout`, { withCredentials: true });
    } catch (error) {
        console.error("Lỗi khi logout:", error);
    }
};

export const getUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/user`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Không thể lấy thông tin user:", error);
        return null;
    }
};
