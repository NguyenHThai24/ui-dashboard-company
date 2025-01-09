import axios from "axios";

export const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const req = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL_REQ,
});

