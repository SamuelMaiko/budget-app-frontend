import axios from "axios";
import { getCookie } from "../Cookies/Cookie";

const instance = axios.create({
  // baseURL: "http://192.168.100.9:8000/api",
  // baseURL: "http://localhost:8000/api",
  baseURL: "https://budgettyapp.pythonanywhere.com/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getCookie("access_token")}`,
  },
});

export default instance;
