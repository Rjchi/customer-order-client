import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// -----Categorias-----

export const getCategoriesRequest = async () =>
  await axios.get(`${API}/api/get-categories`);

// -----Productos con categoria-----

export const getProductsRequest = async () =>
  await axios.get(`${API}/api/get-products`)

// -----Pedidos-----

export const createOrderRequest = async (order) =>
  await axios.post(`${API}/api/create-order`, order);
