import axios from "axios";
import { getCookie } from "../Cookies/Cookie";

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getCookie("access_token")}`,
  },
});

export default instance;
