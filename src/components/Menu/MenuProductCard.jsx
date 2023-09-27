import { useState } from "react";
import { useOrders } from "../../context/PedidoCotext";
import { useNavigate } from "react-router-dom";

export const MenuProductCard = ({ product, colorAleatorio }) => {
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
    <div className={`cursor-pointer w-full h-auto ${colorAleatorio} text-white rounded-lg shadow-md shadow-black transform-colors ease-out duration-300`}>
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
              <div className="relative w-full h-full">
                <img
                  className={`object-cover rounded-tl-lg rounded-tr-lg w-full h-full hover:scale-105 transition-transform duration-300`}
                  // src="https://baconmockup.com/410/410/"
                  src={`${
                    product.imagen_producto
                      ? product.imagen_producto
                      : "https://p-hold.com/430/430"
                  }`}
                  width="430px"
                  height="430px"
                  // src={`data:image/jpeg;base64,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`}
                  // src="https://p-hold.com/430/430"
                  // src="../../assets/placeholder.jpg"
                  alt="placeholder"
                />
              </div>
            </div>
            <h1
              onClick={() => setOpen(!open)}
              className={`font-bold text-lg  font-mono hover:text-3xl hover:p-8 transform-colors ease-out duration-200 w-2/3`}
            >
              {product.nombre_producto}
            </h1>
              <p
              onClick={() => setOpen(!open)}
              className="font-extrabold font-mono border-b-4 text-zinc-500 text-xl">
              $ {product.precio_producto}
              </p>
            <div
              className={`opacity-10 text-xl text- border-b-4 textblack mb-3 transform-colors ease-out duration-600`}
            >
            </div>
          </>
        )}
      </div>
    </div>
  );
};
