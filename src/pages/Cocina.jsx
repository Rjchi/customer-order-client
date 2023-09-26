import { useEffect, useState } from "react";

import NavBar from "../components/Navegation/NavBar";
import { Spinner } from "../components/utils/Spinner";
import { useOrders } from "../context/PedidoCotext";
import { CocinaTable } from "../components/Cocina/CocinaTable";

const Cocina = () => {
  const [pedidos, setPedidos] = useState([]);
  const { socket, getOrdersNotCheck, getOrderByTable } = useOrders();

  useEffect(() => {
    window.scrollTo(0, 0);
    socket.emit("cocinaConectada");

    const loadOrders = async () => {
      const response = await getOrdersNotCheck();
      if (response.length !== 0) {
        setPedidos(response);
      }
    };

    if (pedidos.length === 0) {
      loadOrders();
    }

    // Escuchar eventos de nuevos pedidos para la cocina
    socket.on("nuevoPedidoCocina", () => {
      loadOrders();
    });

    socket.on("recargaPedidos", () => {
      setPedidos([]);
      if (pedidos.length === 0) {
        loadOrders();
      }
    });

    // Importante: Limpieza al desmontar el componente
    return () => {
      socket.off("nuevoPedidoCocina");
      socket.off("recargaPedidos");
    };
  }, [pedidos, socket, getOrdersNotCheck]);

  if (pedidos.length === 0) {
    return (
      <>
        <NavBar />
        <Spinner />;
      </>
    );
  } else {
    const ordersByTable = Object.values(getOrderByTable(pedidos));
    console.log(ordersByTable);

    return (
      <>
        <NavBar />
        <div className="bg-transparent rounded-xl h-auto w-full py-3 grid grid-cols-1 items-center justify-center mt-11">
          <div className="h-auto w-full bg-transparent">
            <ul className="grid grid-cols-1 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-10">
              {ordersByTable.map((order, index) => (
                <CocinaTable
                  key={index}
                  table={order.mesa}
                  orders={order.pedidos}
                />
              ))}
            </ul>
          </div>
        </div>
      </>
    );
  }
};

export default Cocina;
