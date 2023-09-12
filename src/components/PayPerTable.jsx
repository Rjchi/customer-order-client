import { Spinner } from "../components/Spinner";
import { PayOrder } from "./PayOrder";
import { useOrders } from "../context/PedidoCotext";
import { useState, useEffect } from "react";

export const PayPerTable = ({ table, orders, total }) => {
  const [mostrarPedidos, setMostrarPedidos] = useState(true);
  const [anterior, setAnterior] = useState("");
  const { socket, deleteOrdersByTable } = useOrders();

  const DeleteOrderByTable = async () => {
    setMostrarPedidos(!mostrarPedidos);
    setAnterior(orders[0].id);
    const res = await deleteOrdersByTable(table);
    if (res === 200) {
      // console.log("200")
      socket.emit("recargaPedidos");
    }
  };
  useEffect(() => {
    if (parseInt(anterior) !== orders[0].id) {
      setMostrarPedidos(true);
    }
  }, [deleteOrdersByTable, table, anterior, orders]);
  if (orders && orders.length > 0) {
    return (
      <>
        {mostrarPedidos ? (
          <>
            <div className="text-center p-1 w-full h-full">
              <div className="w-full h-full">
                <ul className="bg-slate-500 w-full h-full p-4 border border-black shadow-lg shadow-black rounded-lg flex flex-col items-center justify-center ">
                  <h1 className="text-start font-mono font-bold text-3xl text-white">
                    Mesa
                    <p className="inline-flex ml-3 text-amber-700 p-4 bg-white rounded-full text-center">
                      {table}
                    </p>
                  </h1>
                  {orders &&
                    orders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-slate-300 flex flex-col px-1 py-1 rounded-sm w-full h-full border border-black shadow-sm shadow-black"
                      >
                        <PayOrder order={order} />
                      </div>
                    ))}
                  <p className="bg-slate-400 text-amber-300 text-xl font-mono font-bold border border-black p-5 h-full w-full flex flex-col justify-center items-center">
                    <strong className="p-3 tracking-wider bg-black rounded-xl">
                      TOTAL: $ {total}
                    </strong>
                  </p>
                  <button
                    className="bg-rose-500 hover:bg-rose-600 ease-linear duration-200 w-full text-white font-mono font-bold text-xl h-40 p-5 border border-black shadow-lg shadow-black rounded-md"
                    onClick={() => DeleteOrderByTable()}
                  >
                    LIMPIAR
                  </button>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </>
    );
  } else {
    return <Spinner />;
  }
};
