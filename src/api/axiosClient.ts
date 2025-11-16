// src/api/axiosClient.ts
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://dummyjson.com", // url base
  headers: {
    "Content-Type": "application/json",
  },
});


export default axiosClient;
