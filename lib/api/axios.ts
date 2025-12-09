import axios from "axios";
import { API_URL } from "./config";

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("access_token");
        if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export default api;
