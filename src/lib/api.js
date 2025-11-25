import axios from "axios";

const api = axios.create({
    baseURL: "https://my-backend-amber.vercel.app/api",
});

export const apiPost = async (url, data) => {
    try {
        const res = await api.post(url, data);
        return res.data;
    } catch (error) {
        return { error: true, message: error.response?.data?.message || "Failed" };
    }
};

export const apiGet = async (url) => {
    try {
        const res = await api.get(url);
        return res.data;
    } catch (error) {
        return { error: true };
    }
};
