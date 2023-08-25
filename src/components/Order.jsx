import { useOrders } from "../context/PedidoCotext";
import { useNavigate } from "react-router-dom";

export const Order = ({ order }) => {
  const navigate = useNavigate();
  const { deleteOrder } = useOrders();

  const DeleteOrderById = async (id) => {
    const res = await deleteOrder(id);
    if (res === 200 || res === 204) {
      navigate(0);
    }
  };
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
      <div className="w-full h-full">
        <button
          className="bg-red-500 w-full h-14"
          onClick={() => DeleteOrderById(order.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

// MODIFICAR LA ELIMINACION POR ID DE UN PEDIDO, PARA QUE NO SE RECARGUE LA PAGINA
// DESDE DONDE SE ESTE MANDANDO EL ARREGLO DE PEDIDOS
