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
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAMFBMVEXx8/XCy9K/yND09vfw8vTP1tzp7O/i5ure4+fO1dvJ0dfT2d/EzNPt7/Lb4OXo6+4FeM7UAAAFL0lEQVR4nO2c24KrIAxFLdha7///t0dxOlWDSiAKztnrbR4G6SoJBKHZA6zJYncgQeCEAicUOKHACQVOKHBCgRMKnFDghAInFDihwAkFTihwQoETCpxQ4IQCJxQ4ocAJBU4ocEKBEwqcUOCEAicUOKHACQVOKHBCgRMKnFDghAInFDihwAkFTihwQoETCpxQ4IQCJxQ4ocAJBU4ot3Oi1KMq64FnWTVq+EueWzlRquqKVn/J+/ezEfdyHydKPYtc62yF1m1Xymq5ixPVdDnx8eslf1eCVu7hRFXFppAfLW39kNJyByeqOTJirGTvRsbKDZyozsHIpKUQsZK8E1Vu55GTrKTuRL0ZRoyVLviZaTtRVctUMuaVOnCoJO1E1WwjxsorbGZO2Qk7br5WuhApKTvpfZWMy5WAoZKuk6b1NhI4VJJ10uRBSsas0ng+OlUnVaARw9NvqCTqRERJpt9eUtJ0IqPEN36SdNIIKRnIPeafFJ0Ep9c5mr+qTdFJ2CRMpLAn5fScqJeokrFWZkoRdaImwtpw2T9iSnnxuiDoRFXda6hK28JzWTA14ryBxKFlTT9iTlT1W57o3Lta96yED8krRieknCw/DDuEP1TnKBlgzMlCTtZDXr+8pIjOwitK5x7JOKFD3mukiE85ix45S5FxYll46prdiv8ekpsU19wv4kS9LV1ouQPlrPzKliIzTuw9YDYiVfgFSxFx8rR+wcyMomSX9HYpTjlFwonqrB3gBc/JyYQjRcRJYe8Ay4l9rMlLcVi8iTjp7Y/nOBHcMjngWEoi4+TUlcmKw9rnxHzCWMqeU/ltkB9JEZl3SusnYmwQn1fm2GgPeiOzZrM9WZfu/3/BNDznYATLOLENffep+JppeMZBMSZUF9N6ljFM7KF3qpTduBZyQj4W53XTiRsEm1L2dr2k9k9W9Rtjq2BrJj9Zyk7pI7bP9lw8kfH+4KIFLGF77Sa3R90Un0POvHNCcYzsLVMk9+2buni1bd9xjMSJHMPmjCz7zov/fidW5GQ7OS/2e8BoRrLtrBfXScTIMVLsk09cJxEjZ8I6+cR1EmG1tsRaDsZ0EjlyDL0leuxOpulD4JTALtfXORRbnqVO1LDOePdtpoclWPsqulL+wt0P0SNnxFKrrp2opmuXl+5OuHA3PSmByDGQ9ezSydYdM+ELd4YUIsdANnoWTva2RSUv3JlnJRE5I2RbY+6kee1+dTrrhC7cPTZeMUdivZnydaIc3tdqqWuI6USOYZlSfp0oxzVlJxNByUSOYZlSPk6cDzqEXy17JDTn/LBMKRlTSRZ4X2giep2zZnEwZHLiGjifFt6BTtKKHMMspUxO2BkvDzoDm1jkGGa7bsaJx0t9XfgrOfuMlhezwsc48RrKufvhyiXXHatg8T2Zkm0eHzluxO8W4pXHKljkXycBt3h9blFdeqyCx2fPOguLbn6qTWsBu+Czxs/CopsdP4kmkx+mcZ8FRrfuWUqSTSYT005keDucW4iXnzRhMg17iYacC6A0VyZzzIQs0pBrUrn22JoXY4Us0pDjaZMzb+dIMX6/Qi0dHSU0XHySz48heqSaOs60vsvlq2mtpzj9OCh/Trgjew7afgLar63d6ec2SmTZm37+UyV7048K+Gmkm7O10A/8aaSbY7sEr8rYvYoNnX4Sr3EuYJVpVc35Ccu/innZbryMJ1n4v9f4N9FZ39XPZ931GYzMGH9VPHYfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADp8Q9+nG9anuOrfAAAAABJRU5ErkJggg=="
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
