import io from "socket.io-client";
import { useLocation, useNavigate } from "react-router-dom";
import { createContext, useContext } from "react";

import pedidos from "../api/pedidos.api";
import hooks from "../hooks/useFunctions";
import validate from "../api/validateToken.api";
import inicioSesion from "../api/inicioSecion.api";

export const PedidoContext = createContext();

export const PedidoContextProvider = ({ children }) => {
  const API = import.meta.env.VITE_API_URL;
  const socket = io(`${API}`);
  const navigate = useNavigate();
  const locate = useLocation();

  /**------------------------------------------------------
   * | Esto es para redireccionar en caso de que el token
   * | No sea proporcionado o ya sea invalido
   * ------------------------------------------------------*/
  const redirectForActions = (error) => {
    if (error) {
      if (
        (error.response.status && error.response.status === 403) ||
        error.response.status === 401
      ) {
        sessionStorage.clear();
        navigate(`/login`);
      }
    }
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
      redirectForActions(error);
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
    sessionStorage.clear();
    try {
      const response = await inicioSesion.logueoRequest(user);
      if (response && response.data) {
        if (response.data && response.data.token) {
          const token = response.data.token;
          sessionStorage.setItem("currentToken", token);
          return true;
        } else {
          return false;
        }
      }
      return false;
    } catch (error) {
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

  const validateToken = async (token) => {
    try {
      const response = await validate.validateTokenRequest(token);
      if (response && response.data.token) {
        sessionStorage.clear();
        sessionStorage.setItem("currentToken", response.data.token);
      } else {
        sessionStorage.clear();
      }
    } catch (error) {
      sessionStorage.clear();
    }
  };

  const redirectUser = () => {
    try {
      const token = sessionStorage.getItem("currentToken");
      const decodedToken = hooks.useDecodedToken(token);

      if (token && decodedToken) {
        if (decodedToken.user.usu_rol === "Mesero") {
          if (locate && locate.pathname && locate.pathname !== "/menu") {
            navigate(`/menu`);
          }
        } else if (decodedToken.user.usu_rol === "Cocinero") {
          if (locate && locate.pathname && locate.pathname !== "/cocina") {
            navigate(`/cocina`);
          }
        } else if (decodedToken.user.usu_rol === "Cajero") {
          if (locate && locate.pathname && locate.pathname !== "/caja") {
            navigate(`/caja`);
          }
        } else {
          if (locate && locate.pathname && locate.pathname !== "/menu") {
            navigate(`/menu`);
          }
        }
      } else {
        if (locate && locate.pathname && locate.pathname !== "/menu") {
          navigate(`/menu`);
        }
      }
    } catch (error) {
      if (locate && locate.pathname && locate.pathname !== "/menu") {
        navigate(`/menu`);
      }
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
        validateToken,
        register,
        redirectUser,
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
