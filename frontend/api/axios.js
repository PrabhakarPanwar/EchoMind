import axios from "axios";

const controller = new AbortController();
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 60000,
  withCredentials: true,
  signal: controller.signal,
});

export default axiosInstance;
