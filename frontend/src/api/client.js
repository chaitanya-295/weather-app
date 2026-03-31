import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Add Interceptor to attach token
API.interceptors.request.use((config) => {
  const userString = localStorage.getItem("weather_user");
  if (userString) {
    const user = JSON.parse(userString);
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  }
  return config;
});

export default API;
