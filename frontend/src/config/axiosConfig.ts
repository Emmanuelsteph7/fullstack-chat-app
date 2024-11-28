import axios from "axios";
import { API_BASE_URL } from "../constants";

const baseURL =
  import.meta.env.MODE === "development" ? API_BASE_URL : "/api/v1";

export const AxiosConfig = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  timeout: 60000,
  withCredentials: true,
});
