import axios from "axios";

export const axiosInstanceFA = axios.create({
  baseURL: process.env.BASE_URL, // Base URL from .env
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_JWT_TOKEN}`,
  },
});

export const APIConfig = axios.create({
  baseURL: `${process.env.BASE_URL}/`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetcher = async (url: string) => {
  try {
    const response = await APIConfig.get(url);
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};
