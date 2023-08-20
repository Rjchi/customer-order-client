import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const createOrderRequest = async (order) =>
  await axios.post(`${API}/api/create-order`, order);
