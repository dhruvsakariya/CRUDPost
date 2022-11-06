import axios from "axios";

let baseURL = "https://jsonplaceholder.typicode.com/"; // Todo chage

if (window.location.hostname === "localhost") {
  baseURL = "https://jsonplaceholder.typicode.com/";
}

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;