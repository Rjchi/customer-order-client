// import { NavBar } from "../components/Navegation/NavBar";
import { Table } from "../components/Table";
import { useOrders } from "../context/PedidoCotext";
import { useEffect, useState } from "react";

const Cocina = () => {
  const [pedidos, setPedidos] = useState([]);
  const { socket, getOrders, getOrderByTable, deleteOrders } = useOrders();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Conexión a la sala "cocina"
    socket.emit("cocinaConectada");

    const loadOrders = async () => {
      const response = await getOrders();
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

    // Importante: Limpieza al desmontar el componente
    return () => {
      socket.off("nuevoPedidoCocina");
    };
  }, [pedidos, socket, getOrders]);

  const DeleteOders = async () => {
    const res = await deleteOrders();
    if (res === 200 || res === 204) {
      setPedidos([]);
    }
  };

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
      <div className="bg-blue-300 rounded-xl h-auto w-full border border-black p-0 py-3 grid grid-cols-1 items-center justify-center">
        {/* <NavBar /> */}
        <div className="h-auto w-full bg-transparent overflow-scroll">
          <ul className="grid grid-cols-1 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-10">
            {ordersByTable.map((order, index) => (
              <Table key={index} table={order.mesa} orders={order.pedidos} />
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center mb-5">
          <button
            className="bg-rose-600 hover:bg-rose-700 ease-out duration-700 h-12 w-6/12 border border-black p-0 font-mono rounded-lg text-xl font-bold text-white shadow-xl shadow-black"
            onClick={() => DeleteOders()}
          >
            Eliminar Todo
          </button>
        </div>
      </div>
    );
  }
};

export default Cocina;
