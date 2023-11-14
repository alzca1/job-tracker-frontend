import axios from "axios";
import { getToken } from "./auth";
const { token } = getToken();
const bearer = `Bearer ${token}`;
console.log("bearer", bearer);

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    Authorization: bearer,
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
