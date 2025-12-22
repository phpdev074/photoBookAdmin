import axios from "axios";

const api = axios.create({
  baseURL: "http://72.62.92.138:5419",
  headers: {
    "Content-Type": "application/json",
  },
});

// OPTIONAL (later)
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

export default api;
