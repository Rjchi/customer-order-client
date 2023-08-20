import { createOrderRequest } from "../api/pedidos.api";
import { createContext, useContext, useState } from "react";

export const PedidoContext = createContext();

export const PedidoContextProvider = ({ children }) => {
  const [pedidos, setPedidos] = useState([]);

  const createOrder = async (order) => {
    try {
      await createOrderRequest(order);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PedidoContext.Provider
      value={{
        pedidos,
        createOrder,
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
