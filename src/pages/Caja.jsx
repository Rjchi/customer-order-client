import { Spinner } from "../components/utils/Spinner";
import { useOrders } from "../context/PedidoCotext";
import { CajaPayPerTable } from "../components/Caja/CajaPayPerTable";
import { useEffect, useState } from "react";
import NavBar from "../components/Navegation/NavBar";

export const Caja = () => {
  const [pedidos, setPedidos] = useState([]);
  const { socket, getOrders, getOrderByTable } = useOrders();

  useEffect(() => {
    socket.emit("cajaConectada");

    window.scrollTo(0, 0);

    const loadOrders = async () => {
      const response = await getOrders();
      if (response && response.length !== 0) {
        setPedidos(response);
      }
    };

    if (pedidos.length === 0) {
      loadOrders();
    }

    socket.on("nuevoPedidoCocina", () => {
      console.log("ENTRO");
      loadOrders();
    });

    socket.on("recargaPedidosCaja", () => {
      setPedidos([]);
      loadOrders();
    });

    return () => {
      socket.off("nuevoPedidoCocina");
      socket.off("recargaPedidosCaja");
    };
  }, [pedidos, socket, getOrders]);

  // const DeleteOrders = async () => {
  //   setPedidos([]);
  //   if (pedidos.length !== 0) {
  //     await deleteOrders();
  //     setPedidos([]);
  //   }
  //   socket.emit("recargaPedidos");
  // };

  if (pedidos.length === 0) {
    // socket.emit("recargaPedidos");
    return (
      <>
        <NavBar />
        <Spinner />;
      </>
    );
  } else {
    const ordersByTable = Object.values(getOrderByTable(pedidos));
    // console.log(ordersByTable);

    return (
      <>
      <NavBar />
        <div className="bg-transparent rounded-xl h-auto w-full py-3 grid grid-cols-1 items-center justify-center mt-11">
          <div className="h-auto w-full bg-transparent">
            <ul className="grid grid-cols-1 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-10">
              {ordersByTable.map((order, index) => (
                <CajaPayPerTable
                  key={index}
                  table={order.mesa}
                  total={order.total}
                  orders={order.pedidos}
                  value={true}
                />
              ))}
            </ul>
          </div>
          {/* <div className="flex flex-col items-center justify-center mb-5">
          <button
            className="bg-rose-600 hover:bg-rose-700 ease-out duration-700 h-12 w-6/12 border border-black p-0 font-mono rounded-lg text-xl font-bold text-white shadow-xl shadow-black"
            onClick={() => DeleteOrders()}
          >
            Eliminar Todos
          </button>
        </div> */}
        </div>
      </>
    );
  }
};
