import { Order } from "./Order";
import { useOrders } from "../context/PedidoCotext";
import { useNavigate } from "react-router-dom";

export const Table = ({ table, orders }) => {
  const { deleteOrder } = useOrders();
  const navigate = useNavigate();

  const DeleteOrderById = async (id) => {
    try {
      const res = await deleteOrder(id);
      if (res === 200 || res === 204) {
        navigate(0);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-red-300 text-center p-2">
      <div>
        <ul className="bg-green-500 p-5 rounded-lg">
          <h1 className="text-start">Mesa {table}</h1>
          {orders &&
            orders.map((order) => (
              <div key={order.id}>
                <Order order={order} />
                <button className="bg-red-500 text-slate-600 p-2 rounded-lg" onClick={() => DeleteOrderById(order.id)}>
                  DELETE
                </button>
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
};
