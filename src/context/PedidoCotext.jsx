import io from "socket.io-client";
import { createContext, useContext, useState } from "react";

import pedidos from "../api/pedidos.api";
import inicioSesion from "../api/inicioSecion.api";

export const PedidoContext = createContext();

export const PedidoContextProvider = ({ children }) => {
  const API = import.meta.env.VITE_API_URL;
  const socket = io(`${API}`);

  const [token, setToken] = useState(null);

  let currentToken = null;

  const setAuthToken = (newToken) => {
    // setCurrentToken(newToken);
    return currentToken = newToken;
  };

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

  const getOrderByTable = (orders) => {
    const ordersByTable = orders.reduce((acc, order) => {
      const { mesa, precio, cantidad } = order;

      if (!acc[mesa]) {
        acc[mesa] = { mesa, pedidos: [], total: 0 };
      }

      acc[mesa].pedidos.push(order);
      acc[mesa].total += precio * cantidad;

      return acc;
    }, {});

    return ordersByTable;
  };

  const getProducts = async () => {
    try {
      const response = await pedidos.getProductsRequest();
      if (response.status !== 204) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const updateCheck = async (id) => {
    try {
      const response = await pedidos.updateCheckRequest(id);
      return response.status;
    } catch (error) {
      console.log(error);
    }
  };

  const getOrders = async () => {
    try {
      const response = await pedidos.getOrdersRequest();
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const getOrdersNotCheck = async () => {
    try {
      const response = await pedidos.getOrdersNotCheckRequest();
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const createOrder = async (order) => {
    try {
      const response = await pedidos.createOrderRequest(order);
      return response.status;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOrders = async () => {
    try {
      const response = await pedidos.deleteOrdersRequest();
      return response.status;
    } catch (error) {
      console.log(`Error al eliminar pedidos detalles: ${error.message}`);
    }
  };

  const deleteOrder = async (id) => {
    try {
      const response = await pedidos.deleteOrderRequest(id);
      return response.status;
    } catch (error) {
      console.log(`Error al eliminar pedido detalles: ${error.message}`);
    }
  };

  const deleteOrdersByTable = async (table) => {
    try {
      const response = await pedidos.deleteOrderByTableRequest(table);
      return response.status;
    } catch (error) {
      console.log(
        `Error al eliminar pedidos de una mesa detalles: ${error.message}`
      );
    }
  };

  const logueo = async (user) => {
    try {
      setToken(null)
      setAuthToken(null);
      const response = await inicioSesion.logueoRequest(user);
      if (response && response.data) {
        if (response.data && response.data.token) {
          const token = setAuthToken(response.data.token);
          setToken(token);
          console.log("CURRENT TOKEN GG; ", currentToken);
          return token;
        } else {
          console.log("CURRENT TOKEN MAL; ", currentToken);
          return false;
        }
      }
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  const register = async (user) => {
    try {
      const response = await inicioSesion.registroRequest(user);
      return response.status;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PedidoContext.Provider
      value={{
        socket,
        createOrder,
        getProducts,
        getProByCate,
        getOrders,
        getOrderByTable,
        deleteOrders,
        deleteOrder,
        deleteOrdersByTable,
        getOrdersNotCheck,
        updateCheck,
        logueo,
        token,
        register,
        setAuthToken,
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
