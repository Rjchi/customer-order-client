import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// -----Categorias-----

// -----Productos con categoria-----

export const getProductsRequest = async () =>
  await axios.get(`${API}/api/get-products`)

// -----Pedidos-----

export const createOrderRequest = async (order) =>
  await axios.post(`${API}/api/create-order`, order);

export const getOrdersRequest = async () =>
  await axios.get(`${API}/api/get-orders`)

export const getOrdersNotCheckRequest = async () =>
  await axios.get(`${API}/api/get-orders-not-check`)

export const deleteOrdersRequest = async () =>
  await axios.delete(`${API}/api/delete-orders`)

export const deleteOrderRequest = async (id) =>
  await axios.delete(`${API}/api/delete-order/${id}`)

export const updateCheckRequest = async (id) =>
  await axios.put(`${API}/api/update-check/${id}`)

export const deleteOrderByTableRequest = async (table) =>
  await axios.delete(`${API}/api/delete-orders-by-table/${table}`)