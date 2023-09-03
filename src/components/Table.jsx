import { Order } from "./Order";
import { useState } from "react";

export const Table = ({ table, orders }) => {
  const [check, setCheck] = useState(true);

  return (
    <>
      {check ? (
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
                    className="bg-slate-300 flex flex-row gap-3 justify-center px-1 py-1 rounded-sm w-full h-full border border-black shadow-sm shadow-black"
                    key={order.id}
                  >
                    <Order order={order} />
                    <button
                      className="bg-green-600 text-slate-200 p-3 font-mono font-bold border border-black rounded-lg hover:bg-green-700 hover:text-white ease-linear duration-200"
                      onClick={() => setCheck(!check)}
                    >
                      LISTO
                    </button>
                  </div>
                ))}
            </ul>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
