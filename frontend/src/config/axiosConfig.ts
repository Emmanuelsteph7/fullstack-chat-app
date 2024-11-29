import axios from "axios";
import { API_BASE_URL } from "../constants";

const baseURL = API_BASE_URL;

export const AxiosConfig = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  timeout: 60000,
  withCredentials: true,
});
