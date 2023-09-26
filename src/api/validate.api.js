import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const validateCookieRequest = async () =>
  await axios.get(`${API}/validate-cookie`, { withCredentials: true });
