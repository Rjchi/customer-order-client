import { PayOrder } from "./PayOrder";
import { useState } from "react";
import { useOrders } from "../context/PedidoCotext";

export const PayPerTable = ({ table, orders, total }) => {
  const [mostrarPedidos, setMostrarPedidos] = useState(true);
  const { deleteOrdersByTable } = useOrders();

  const DeleteOrderByTable = async () => {
    try {
      setMostrarPedidos(false);
      await deleteOrdersByTable(table);
    } catch (error) {
      console.log(error.message);
    }
  };

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
                <p className="bg-cyan-800 text-amber-300 text-xl font-mono font-bold border border-black p-5 h-full w-full flex flex-col justify-center items-center">
                  <strong className="p-3 tracking-wider bg-black rounded-xl">
                    TOTAL: $ {total}
                  </strong>
                </p>
                <button
                  className="bg-rose-500 w-full text-white font-mono font-bold text-xl h-40 p-5 border border-black shadow-lg shadow-black rounded-md"
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
};
