import { useState } from "react";

function PedidoForm({ socket }) {
  const [producto, setProducto] = useState({
    nombre: "",
    cantidad: "",
    mesa: "",
    precio: "",
  });

  const { nombre, cantidad, mesa, precio } = producto;

  const onChange = (e) =>
    setProducto({ ...producto, [e.target.name]: e.target.value });

  // console.log(producto)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (producto) {
      socket.emit("nuevoPedido", producto);
      setProducto({
        nombre: "",
        cantidad: "",
        mesa: "",
        precio: "",
      });
    }
  };

  return (
    <div>
        <h1>Cliente</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="nombre"
          type="text"
          value={nombre}
          onChange={(e) => onChange(e)}
          placeholder="Nombre"
        />
        <input
          name="cantidad"
          type="text"
          value={cantidad}
          onChange={(e) => onChange(e)}
          placeholder="cantidad"
        />
        <input
          name="mesa"
          type="text"
          value={mesa}
          onChange={(e) => onChange(e)}
          placeholder="mesa"
        />
        <input
          name="precio"
          type="text"
          value={precio}
          onChange={(e) => onChange(e)}
          placeholder="Precio"
        />
        <button type="submit">Hacer Pedido</button>
      </form>
    </div>
  );
}

export default PedidoForm;
