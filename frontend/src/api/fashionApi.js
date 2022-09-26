import axios from "axios";
const apiUrl = "https://fashion-like-api.herokuapp.com/api";
// const apiUrl = "http://localhost:5000/api";

export const fashionApi = axios.create({ baseURL: apiUrl });
export const fashionApiWithToken = axios.create({
  baseURL: apiUrl,
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});
