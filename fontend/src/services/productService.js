import axios from "axios";
const API_URL = "http://localhost:8080/api";

export const getAllProduct = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getProductByCategory = async () => {
    try {
        
    } catch (error) {
        throw error;
    }
}