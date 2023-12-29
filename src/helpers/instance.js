import axios from "axios";
import { getToken } from "./auth";
const sessionInfo = getToken();
const token = sessionInfo?.token;
const bearer = `Bearer ${token}`;

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    Authorization: bearer,
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
