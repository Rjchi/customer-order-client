import { Order } from "./Order";

export const Table = ({ table, orders }) => {
  return (
    <div className="bg-red-300 text-center p-2">
      <div>
        <ul className="bg-green-500 p-5 rounded-lg">
          <h1 className="text-start">Mesa {table}</h1>
          {orders &&
            orders.map((order) => <Order key={order.id} order={order} />)}
        </ul>
      </div>
    </div>
  );
};
