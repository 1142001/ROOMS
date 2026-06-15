import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api"
});

API.interceptors.request.use((config) => {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  if (user && user.token) {
    config.headers.Authorization = "Bearer " + user.token;
  }

  return config;
});

export default API;
