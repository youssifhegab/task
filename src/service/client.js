import axios from "axios";

const API_KEY = "078c05dabd0b3d537d154bf4ba0354fc";

const BASE_URL = `https://api.openweathermap.org/data/3.0/onecall?appid=${API_KEY}`;
export const axiosClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // to include the cookies along with the requests.
  headers: {
    "content-type": "application/json",
  },
});
