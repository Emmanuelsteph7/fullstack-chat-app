import { API_BASE_URL } from "@/constants/envs";
import axios from "axios";

const baseURL = `${API_BASE_URL}/api/v1`;

export const AxiosConfig = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  timeout: 60000,
  withCredentials: true,
});
