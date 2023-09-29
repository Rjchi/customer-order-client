import io from "socket.io-client";
import {
  createOrderRequest,
  getProductsRequest,
  getOrdersRequest,
  deleteOrdersRequest,
  deleteOrderRequest,
  deleteOrderByTableRequest,
  getOrdersNotCheckRequest,
  updateCheckRequest,
} from "../api/pedidos.api";
import { validateCookieRequest } from "../api/validate.api";
import { logueoRequest, registroRequest } from "../api/inicioSecion.api";
import { createContext, useContext } from "react";

export const PedidoContext = createContext();

export const PedidoContextProvider = ({ children }) => {
  const API = import.meta.env.VITE_API_URL;
  const socket = io(`${API}`);

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
      const response = await getProductsRequest();
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
      const response = await updateCheckRequest(id);
      return response.status;
    } catch (error) {
      console.log(error);
    }
  };

  const getOrders = async () => {
    try {
      const response = await getOrdersRequest();
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const getOrdersNotCheck = async () => {
    try {
      const response = await getOrdersNotCheckRequest();
      return response.data;
    } catch (error) {
      console.log(error.message);
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

  const deleteOrders = async () => {
    try {
      const response = await deleteOrdersRequest();
      return response.status;
    } catch (error) {
      console.log(`Error al eliminar pedidos detalles: ${error.message}`);
    }
  };

  const deleteOrder = async (id) => {
    try {
      const response = await deleteOrderRequest(id);
      return response.status;
    } catch (error) {
      console.log(`Error al eliminar pedido detalles: ${error.message}`);
    }
  };

  const deleteOrdersByTable = async (table) => {
    try {
      const response = await deleteOrderByTableRequest(table);
      return response.status;
    } catch (error) {
      console.log(
        `Error al eliminar pedidos de una mesa detalles: ${error.message}`
      );
    }
  };

  const logueo = async (user) => {
    try {
      const response = await logueoRequest(user);
      if (response.data) {
        const sessionData = response.data.sessionData.idSesion;
        sessionStorage.setItem('sessionId', sessionData);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };
  const register = async (user) => {
    try {
      const response = await registroRequest(user);
      return response.status;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserLogged = async () => {
    try {
      const response = await validateCookieRequest();
      return response.data;
    } catch (error) {
      console.log(`Error al validar la cookie: ${error.message}`);
    }
  };

  return (
    <PedidoContext.Provider
      value={{
        socket,
        createOrder,
        getProducts,
        getCategories,
        getProByCate,
        getOrdersByTable,
        getOrders,
        getOrderByTable,
        deleteOrders,
        deleteOrder,
        deleteOrdersByTable,
        getOrdersNotCheck,
        updateCheck,
        logueo,
        register,
        getUserLogged,
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
