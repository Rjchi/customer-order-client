// import { NavBar } from "../components/Navegation/NavBar";
import { Table } from "../components/Table";
import { useOrders } from "../context/PedidoCotext";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Cocina = () => {
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();
  const { socket, getOrdersNotCheck, getOrderByTable } = useOrders();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Conexión a la sala "cocina"
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
      navigate(0)
    });

    // Importante: Limpieza al desmontar el componente
    return () => {
      socket.off("nuevoPedidoCocina");
      socket.off("recargaPedidos");
    };
  }, [pedidos, socket, getOrdersNotCheck, navigate]);

  if (pedidos.length === 0) {
    return (
      <h1 className="flex justify-center items-center text-white">
        Loading...
      </h1>
    );
  } else {
    const ordersByTable = Object.values(getOrderByTable(pedidos));
    console.log(ordersByTable);

    return (
      <div className="bg-transparent rounded-xl h-auto w-full py-3 grid grid-cols-1 items-center justify-center">
        {/* <NavBar /> */}
        <div className="h-auto w-full bg-transparent overflow-scroll">
          <ul className="grid grid-cols-1 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-10">
            {ordersByTable.map((order, index) => (
              <Table key={index} table={order.mesa} orders={order.pedidos} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
};

export default Cocina;
