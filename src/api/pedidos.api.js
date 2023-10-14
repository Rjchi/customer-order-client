import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const getProductsRequest = async () =>
  await axios.get(`${API}/api/get-products`);

const createOrderRequest = async (order) =>
  await axios.post(`${API}/api/create-order`, order);

const getOrdersRequest = async () => await axios.get(`${API}/api/get-orders`);

const getOrdersNotCheckRequest = async () =>
  await axios.get(`${API}/api/get-orders-not-check`);

const deleteOrdersRequest = async () =>
  await axios.delete(`${API}/api/delete-orders`);

const deleteOrderRequest = async (id) =>
  await axios.delete(`${API}/api/delete-order/${id}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("currentToken")}`,
    },
  });

const updateCheckRequest = async (id) =>
  await axios.put(`${API}/api/update-check/${id}`);

const deleteOrderByTableRequest = async (table) =>
  await axios.delete(`${API}/api/delete-orders-by-table/${table}`);

export default {
  getProductsRequest,
  createOrderRequest,
  getOrdersNotCheckRequest,
  getOrdersRequest,
  deleteOrderRequest,
  deleteOrdersRequest,
  updateCheckRequest,
  deleteOrderByTableRequest,
};
