import io from "socket.io-client";
import {
  createOrderRequest,
  getProductsRequest,
  getCategoriesRequest,
  getOrderByTableRequest,
} from "../api/pedidos.api";
import { createContext, useContext, useState } from "react";

export const PedidoContext = createContext();

export const PedidoContextProvider = ({ children }) => {
  const API = import.meta.env.VITE_API_URL;
  const socket = io(`${API}`);

  const [pedidos, setPedidos] = useState([]);

  const getProByCate = (products) => {
    const productsByCategory = products.reduce((acc, product) => {
      const { id_categoria, nombre_categoria } = product;

      if (!acc[id_categoria]) {
        acc[id_categoria] = { id_categoria, nombre_categoria, productos: [] };
      }

      acc[id_categoria].productos.push(product);

      return acc;
    }, {});

    return productsByCategory;
  };

  const getProducts = async () => {
    try {
      const response = await getProductsRequest();
      if (response.status === 200) {
        return response.data;
      }
      return "error";
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await getCategoriesRequest();
      if (response.status === 200) {
        return response.data;
      }
      return "error";
    } catch (error) {
      console.log(error);
    }
  };

  const getOrdersByTable = async (table) => {
    try {
      const response = await getOrderByTableRequest(table);
      if (response.status === 200) {
        return response.data;
      }
      return "error";
    } catch (error) {
      console.log(error);
    }
  };

  const createOrder = async (order) => {
    try {
      const response = await createOrderRequest(order);
      return response.status;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PedidoContext.Provider
      value={{
        socket,
        pedidos,
        createOrder,
        getProducts,
        getCategories,
        getProByCate,
        getOrdersByTable,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(PedidoContext);
  if (!context) {
    throw new Error("useOrders debe usarse dentro de PedidoContextProvider");
  }
  return context;
};
