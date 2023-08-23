import { useOrders } from "../context/PedidoCotext";
import { useEffect, useState } from "react";

const Cocina = () => {
  const { socket } = useOrders();
  const [pedidos, setPedidos] = useState({
    mesa: "",
    pedidos: []
  });

  useEffect(() => {
    // Conexión a la sala "cocina"
    socket.emit("cocinaConectada");

    // Escuchar eventos de nuevos pedidos para la cocina
    socket.on("nuevoPedidoCocina", async (pedido) => {
        // setPedidos({...pedidos, mesa: pedido.mesa, pedidos: res});
    });

    // Importante: Limpieza al desmontar el componente
    return () => {
      socket.off("nuevoPedidoCocina");
    };
  }, [pedidos, socket]);
  return (
    <div>
      <h2>Pedidos en Cocina</h2>
      <ul>

      </ul>
    </div>
  );
};

export default Cocina;

// Crear la funcion de traer todos los pedidos y posteriormete filtrarlos aqui y crear un componente individual por mesa