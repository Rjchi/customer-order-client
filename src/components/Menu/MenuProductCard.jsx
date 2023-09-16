import { useState } from "react";
import { useOrders } from "../../context/PedidoCotext";
import { useNavigate } from "react-router-dom";

export const MenuProductCard = ({ product }) => {
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
            cantidad: value > 400 ? value : (value += 1),
          });
        } else if (name === "mesa" && operator === "+") {
          setProducto({
            ...producto,
            nombre: product.nombre_producto,
            precio: product.precio_producto,
            mesa: value > 400 ? value : (value += 1),
          });
        } else if (name === "cantidad" && operator === "-") {
          setProducto({
            ...producto,
            nombre: product.nombre_producto,
            precio: product.precio_producto,
            cantidad: value <= 0 ? value : (value -= 1),
          });
        } else if (name === "mesa" && operator === "-") {
          setProducto({
            ...producto,
            nombre: product.nombre_producto,
            precio: product.precio_producto,
            mesa: value <= 0 ? value : (value -= 1),
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
      parseInt(producto.cantidad) <= 0 ||
      parseInt(producto.mesa) <= 0
    ) {
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 2000);
    } else if (!Number.isNaN(Number(cantidad)) && !Number.isNaN(Number(mesa))) {
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
    } else {
      navigate(0);
    }
  };

  return (
    <div className="cursor-pointer w-full h-auto bg-amber-600 rounded-lg shadow-md shadow-black hover:bg-amber-700 transform-colors ease-out duration-300">
      <div className=" flex flex-col items-center justify-center text-center gap-1">
        {open ? (
          <div
            className={`absolute z-10 top-0 left-0 w-full h-full bg-slate-300 bg-opacity-70 flex flex-col items-center justify-start pt-20 xl:pt-1 xl:pb-1`}
          >
            <form
              className="flex flex-col bg-white w-4/6 h-64 rounded-lg items-center justify-center shadow-lg shadow-black border border-solid border-black p-0"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-3 items-center justify-around w-full h-full bg-slate-200 rounded-lg">
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
                  }outline-none text-lg appearance-none font-mono font-bold border border-solid border-black shadow-lg shadow-black rounded-md w-auto text-center h-10`}
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
                  } outline-none shadow-lg appearance-none border border-solid border-black text-lg font-mono font-bold shadow-black rounded-md w-auto text-center h-10`}
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
              <div className=" w-full h-24 rounded-lg flex flex-row items-center justify-around bg-gray-400 border-t border-solid border-black p-0">
                <button
                  className="p-3 rounded-sm border border-solid border-black text-slate-100 text-base shadow-sm shadow-black bg-blue-500 font-mono font-bold hover:bg-blue-600 hover:text-white ease-out duration-1000"
                  type="submit"
                >
                  Hacer Pedido
                </button>
                <div
                  onClick={() => {
                    setOpen(!open)
                  }}
                  className=" cursor-pointer p-3 rounded-sm text-white shadow-sm border border-solid border-black shadow-black bg-rose-500 font-mono font-bold hover:bg-rose-600 hover:text-white ease-out duration-1000"
                >
                  Cancelar
                </div>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div
              onClick={() => setOpen(true)}
              className="w-full h-full flex flex-col justify-center items-center"
            >
              <div className="relative w-full h-full">
                <img
                  className={`object-cover rounded-tl-lg rounded-tr-lg w-full h-full hover:scale-105 transition-transform duration-300`}
                  // src="https://baconmockup.com/410/410/"
                  src="https://p-hold.com/430/430"
                  // src="../../assets/placeholder.jpg"
                  alt="placeholder"
                />
              </div>
            </div>
            <h1
              onClick={() => setOpen(true)}
              className={`font-bold text-lg text-black font-mono hover:text-amber-300 transform-colors ease-out duration-200`}
            >
              {product.nombre_producto}
            </h1>
            <p
              onClick={() => setOpen(true)}
              className={`font-bold text-base font-serif textblack mb-3 shadow-sm shadow-black hover:text-amber-300 transform-colors ease-out duration-200`}
            >
              $ {product.precio_producto}
            </p>
          </>
        )}
      </div>
    </div>
  );
};
