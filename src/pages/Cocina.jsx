import { useEffect, useState } from "react";

const Cocina = ({socket}) => {
  const [pedidos, setPedidos] = useState([]);
  useEffect(() => {
    // Conexión a la sala "cocina"
    socket.emit("cocinaConectada");

    // Escuchar eventos de nuevos pedidos para la cocina
    socket.on("nuevoPedidoCocina", (pedido) => {
      setPedidos([...pedidos, pedido]);
    });

    // Importante: Limpieza al desmontar el componente
    return () => {
      socket.off("nuevoPedidoCocina");
    };
  }, [pedidos, socket]);
  console.log(pedidos);
  return (
    <div className="cocina">
      <h2>Pedidos en Cocina</h2>
      <ul>
        {pedidos.map((pedido, index) => (
          <li key={index}>{pedido.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default Cocina;
