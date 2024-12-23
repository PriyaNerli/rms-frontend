import axios from "axios";

export const axiosInstanceFA = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL_FEA, // Base URL from .env
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_JWT_TOKEN}`, // JWT token from .env
  },
});
