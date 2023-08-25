export const Order = ({ order }) => {
  return (
    <div className="flex flex-col items-center justify-center m-2 p-5 rounded-lg bg-slate-600 text-white">
      <div className="grid grid-cols-2 items-center justify-center p-4 gap-3">
        <div>
          <div className="bg-teal-500">Nombre:</div>
          {order.nombre}
        </div>
        <div className="text-yellow-400 flex flex-col items-center justify-center">
          {order.cantidad} unidad(es)
        </div>
        <div>
          <div className="bg-orange-700">Total:</div>
          {order.precio}
        </div>
        <div>
          <div className="bg-purple-900">Hora pedido: </div>
          {order.hora_pedido}
        </div>
      </div>
    </div>
  );
};
