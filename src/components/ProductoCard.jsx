import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../context/PedidoCotext";

export const ProductoCard = ({ product }) => {
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const { socket, createOrder } = useOrders();

  const [producto, setProducto] = useState({
    nombre: "",
    cantidad: "",
    mesa: "",
    precio: "",
  });

  const { cantidad, mesa } = producto;

  const onChange = (e) =>
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
      nombre: product.nombre_producto,
      precio: product.precio_producto,
    });

  const handleClick = (operator, value, name) => {
    try {
      console.log(value, name, isNaN(value));
      if (isNaN(value)) {
        navigate(0);
      } else {
        if (name === "cantidad" && operator === "+") {
          setProducto({
            ...producto,
            nombre: product.nombre_producto,
            precio: product.precio_producto,
            cantidad: (value += 1),
          });
        } else if (name === "mesa" && operator === "+") {
          setProducto({
            ...producto,
            nombre: product.nombre_producto,
            precio: product.precio_producto,
            mesa: (value += 1),
          });
        } else if (name === "cantidad" && operator === "-") {
          setProducto({
            ...producto,
            nombre: product.nombre_producto,
            precio: product.precio_producto,
            cantidad: (value -= 1),
          });
        } else if (name === "mesa" && operator === "-") {
          setProducto({
            ...producto,
            nombre: product.nombre_producto,
            precio: product.precio_producto,
            mesa: (value -= 1),
          });
        }
      }
    } catch (error) {
      console.log(`Detalles: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (producto.cantidad.length === 0 || producto.mesa.length === 0) {
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 2000);
    } else if (
      parseInt(producto.cantidad) === 0 ||
      parseInt(producto.mesa) === 0
    ) {
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 2000);
    } else {
      const response = await createOrder(producto);
      if (response === 204) {
        socket.emit("nuevoPedido");
        setProducto({
          nombre: "",
          cantidad: "",
          mesa: "",
          precio: "",
        });
        console.log(producto);
        setOpen(false);
      }
    }
  };

  return (
    <div className="w-full h-auto bg-amber-600 rounded-lg">
      <div
        className=" flex flex-col items-center justify-center text-center gap-1"
        onClick={() => setOpen(true)}
      >
        {open ? (
          <div className="absolute z-10 top-0 left-0 w-full h-full bg-cyan-300 flex flex-col items-center justify-start pt-20 xl:pt-1 xl:pb-1">
            <form
              className="flex flex-col bg-teal-600 w-4/6 h-64 rounded-lg items-center justify-center"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-3 items-center justify-around w-full h-44 bg-slate-200">
                <div
                  className="cursor-pointer m-auto p-5 bg-blue-500 rounded-full w-auto h-auto text-white font-bold text-center shadow-lg shadow-black "
                  onClick={() => {
                    try {
                      handleClick(
                        "-",
                        parseInt(cantidad.length === 0 ? "0" : cantidad),
                        "cantidad"
                      );
                    } catch (error) {
                      console.log(`Error: ${error.message}`);
                    }
                  }}
                >
                  —
                </div>
                <input
                  name="cantidad"
                  type={`number`}
                  autoFocus
                  id="cantidad"
                  value={cantidad}
                  onChange={(e) => onChange(e)}
                  placeholder="cantidad"
                  className={`${
                    err
                      ? "transition ease-linear border border-red-600 bg-red-300 "
                      : ""
                  }outline-none shadow-lg shadow-black rounded-md w-auto text-center h-10`}
                />
                <div
                  className="cursor-pointer m-auto p-5 bg-blue-500 rounded-full w-auto h-auto text-white font-bold text-center shadow-lg shadow-black "
                  onClick={() => {
                    try {
                      handleClick(
                        "+",
                        parseInt(cantidad.length === 0 ? "0" : cantidad),
                        "cantidad"
                      );
                    } catch (error) {
                      console.log(`Error: ${error.message}`);
                    }
                  }}
                >
                  ✚
                </div>
                <div
                  className="cursor-pointer m-auto p-5 bg-blue-500 rounded-full w-auto h-auto text-white font-bold text-center shadow-lg shadow-black"
                  onClick={() => {
                    try {
                      handleClick(
                        "-",
                        parseInt(mesa.length === 0 ? "0" : mesa),
                        "mesa"
                      );
                    } catch (error) {
                      console.log(`Error: ${error.message}`);
                    }
                  }}
                >
                  —
                </div>

                <input
                  name="mesa"
                  id="mesa"
                  type="number"
                  value={mesa}
                  onChange={(e) => onChange(e)}
                  placeholder="mesa"
                  className={`${
                    err
                      ? "transition ease-linear border border-red-600 bg-red-300 "
                      : ""
                  } outline-none shadow-lg shadow-black rounded-md w-auto text-center h-10`}
                />
                <div
                  className="cursor-pointer m-auto p-5 bg-blue-500 rounded-full w-auto h-auto text-white font-bold text-center shadow-lg shadow-black"
                  onClick={() => {
                    try {
                      handleClick(
                        "+",
                        parseInt(mesa.length === 0 ? "0" : mesa),
                        "mesa"
                      );
                    } catch (error) {
                      console.log(`Error: ${error.message}`);
                    }
                  }}
                >
                  ✚
                </div>
              </div>
              <div className=" w-full h-16 flex flex-row items-center justify-around bg-slate-600">
                <button className="" type="submit">
                  Hacer Pedido
                </button>
                <div className="cursor-pointer">Cancelar</div>
              </div>
            </form>
          </div>
        ) : (
          <>
            <img
              className={`w-auto h-auto rounded-tl-lg rounded-tr-lg`}
              src="https://placekitten.com/300/250"
              alt="placeholder"
            />
            <h1 className={`font-bold text-base`}>{product.nombre_producto}</h1>
            <p className={`font-bold text-base text-amber-400 mb-3`}>
              ${product.precio_producto}
            </p>
          </>
        )}
      </div>
    </div>
  );
};
