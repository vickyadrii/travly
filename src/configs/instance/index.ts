const BASE_URL = import.meta.env.VITE_API_URL;

import axios, { AxiosError, type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { getAccessToken } from "@/lib/utils";
console.log(getAccessToken())

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
