import { Link } from "react-router-dom";
import { useOrders } from "../context/PedidoCotext";

export const NotFound = () => {
  const { getUserLogged } = useOrders();

  const va = async () => {
    const response = await getUserLogged();
    console.log(response);
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-6">
      <button onClick={() => va()}>PPPPPPPP</button>
      <p className="text-9xl text-white font-bold text-center">404</p>
      <p className="text-5xl text-slate-300 font-bold text-center">
        Página no encontrada
      </p>
      <button className="text-lg text-slate-200 font-bold text-center bg-teal-900 p-4 rounded-lg shadow-xl shadow-black hover:bg-teal-950 hover:text-white transition-colors duration-500 ease-in-out">
        <Link to={`/`}>Ir al inicio</Link>
      </button>
    </div>
  );
};
