import { BASEURL } from "@/lib/base";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
