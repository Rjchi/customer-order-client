import { Table } from "../components/Table";
import { useOrders } from "../context/PedidoCotext";
import { useEffect, useState } from "react";

const Cocina = () => {
  const [pedidos, setPedidos] = useState([]);

  const { socket, getOrders, getOrderByTable, deleteOrders } = useOrders();

  useEffect(() => {
    // Conexión a la sala "cocina"
    socket.emit("cocinaConectada");

    const loadOrders = async () => {
      const response = await getOrders();
      if (response !== undefined) {
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

    // Importante: Limpieza al desmontar el componente
    return () => {
      socket.off("nuevoPedidoCocina");
    };
  }, [pedidos, socket, getOrders]);

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
      <div className="bg-orange-700 h-screen w-full grid grid-cols-1">
        <div className="h-auto w-full bg-gray-200 overflow-scroll">
          <ul className="grid grid-cols-1 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-10">
            {ordersByTable.map((order, index) => (
              <Table key={index} table={order.mesa} orders={order.pedidos} />
            ))}
          </ul>
        </div>
        <button className="bg-purple-900 h-auto w-full rounded-lg text-2xl font-bold text-white shadow-xl shadow-black">
          Limpiar Todo
        </button>
      </div>
    );
  }
};
// HACER LA FUNCIONALIDAD DE LOS BOTONES DE ELIMINACION DE PEDIDOS

export default Cocina;
