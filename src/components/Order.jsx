import moment from "moment";
import { useEffect, useState } from "react";

export const Order = ({ order }) => {
  const [minutosTranscurridos, setMinutosTranscurridos] = useState(0);

  useEffect(() => {
    const ahora = moment();
    const horaPedido = moment(order.hora_pedido, "HH:mm:ss");
    const minutos = ahora.diff(horaPedido, "minutes");
    setMinutosTranscurridos(minutos < 0 ? minutos - minutos * 2 : minutos);
    const interval = setInterval(() => {
      // Hora actual
      const ahora = moment();
      // convierte la hora en un objeto moment
      const horaPedido = moment(order.hora_pedido, "HH:mm:ss");
      // calcula la diferencia en minutos
      const minutos = ahora.diff(horaPedido, "minutes");
      setMinutosTranscurridos(minutos < 0  ? (minutos) - (minutos*2) : minutos);
    }, 60000);

    return () => {
      // Funcion de limpieza
      clearInterval(interval);
    };
  }, [order.hora_pedido]);

  return (
    <div className="flex flex-col items-center w-5/6 h-auto justify-center p-3 font-mono rounded-lg bg-slate-600 border border-black text-white">
      <div className="grid grid-cols-1 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 items-center justify-center gap-3 p-1">
        <div className="font-mono font-bold text-sm p-3 bg-black rounded-full">
          {order.nombre}
        </div>
        <div className="text-amber-300 flex flex-col items-center justify-center font-bold">
          {order.cantidad} unidad(es)
        </div>
        <div className="font-mono font-bold">
          {/* {order.hora_pedido} */}
          Hace <strong className="text-amber-300">{minutosTranscurridos}</strong> minutos
        </div>
      </div>
    </div>
  );
};
