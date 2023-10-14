import { useState } from "react";
import { useOrders } from "../../context/PedidoCotext";
import { useNavigate } from "react-router-dom";

export const MenuProductCard = ({ product, colorIntercalado }) => {
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { socket, createOrder } = useOrders();
  const [producto, setProducto] = useState({
    nombre: "",
    cantidad: "",
    mesa: "",
    precio: "",
    ped_usu_mesero_doc: null,
  });

  // 2890E9
  // E0296A
  // 51AB55
  // FD9912
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
      setLoading(true);
      const response = await createOrder(producto);
      if (response === 204) {
        socket.emit("nuevoPedido");
        setProducto({
          nombre: "",
          cantidad: "",
          mesa: "",
          precio: "",
          ped_usu_mesero_doc: null,
        });
        console.log(producto);
        setLoading(false);
        setOpen(false);
      }
      setLoading(false);
    } else {
      navigate(0);
    }
  };
  return (
    <div
      className={`cursor-pointer w-full h-auto ${colorIntercalado} shadow-lg shadow-zinc-800 text-white rounded-lg transform-colors ease-out duration-300`}
    >
      <div className=" flex flex-col items-center justify-center text-center gap-1">
        {open ? (
          <div
            className={`absolute z-10 top-0 text-black  left-0 w-full h-full bg-slate-300 bg-opacity-70 flex flex-col items-center justify-start pt-20 xl:pt-1 xl:pb-1`}
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
                {loading ? (
                  <button
                    className="p-3 rounded-sm border border-solid border-black text-slate-100 text-base shadow-sm shadow-black bg-blue-500 font-mono font-bold hover:bg-blue-600 hover:text-white ease-out duration-1000"
                    type={`button`}
                  >
                    Hacer Pedido
                  </button>
                ) : (
                  <button
                    className="p-3 rounded-sm border border-solid border-black text-slate-100 text-base shadow-sm shadow-black bg-blue-500 font-mono font-bold hover:bg-blue-600 hover:text-white ease-out duration-1000"
                    type={`submit`}
                  >
                    Hacer Pedido
                  </button>
                )}
                <div
                  onClick={() => {
                    setOpen(!open);
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
              onClick={() => setOpen(!open)}
              className="w-full h-full flex flex-col justify-center items-center"
            >
              <div className="relative w-full h-full flex flex-col justify-center items-center">
                <img
                  className={`object-cover rounded-tl-lg rounded-tr-lg hover:scale-105 transition-transform duration-300 imagen-tam`}
                  src={`${
                    product.imagen_producto
                      ? product.imagen_producto
                      : "https://p-hold.com/430/430"
                  }`}
                  alt="placeholder"
                />
              </div>
            </div>
            <h2
              onClick={() => setOpen(!open)}
              // className={`font-bold text-lg  font-mono hover:text-3xl hover:p-8 hover:w-full transform-colors ease-out duration-200 w-2/3`}
              className={`font-bold text-lg  font-mono transform-colors ease-out duration-200 w-full`}
            >
              {product.nombre_producto}
            </h2>
            <p
              onClick={() => setOpen(!open)}
              className="font-extrabold font-mono border-b-4 text-zinc-900 text-xl w-2/3"
            >
              $ {product.precio_producto}
            </p>
            <div
              className={`opacity-10 text-xl text- border-b-4 textblack mb-3 transform-colors ease-out duration-600`}
            ></div>
          </>
        )}
      </div>
    </div>
  );
};
