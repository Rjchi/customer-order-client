import { useState, useEffect } from "react";

import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";

import { useOrders } from "../context/PedidoCotext";
import NavBar from "../components/Navegation/NavBar";

export const Login = () => {
  const context = useOrders();
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [documento, setDocumento] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [seePassword, setSeePassword] = useState(false);

  useEffect(() => {
    const fetchRole = async () => {
      if (sessionStorage.getItem("currentToken")) {
        await context.validateToken(sessionStorage.getItem("currentToken"));
        /**----------------------------------------------
         * | Si el token existe y es valido
         * | Redireccionamos al usuario segun su rol
         *  ----------------------------------------------*/
        await context.redirectUser();
      }
    };

    fetchRole();
  }, [context]);

  // Manejar cambios en los inputs
  const handleDocumentoChange = (e) => {
    setDocumento(e.target.value);
  };

  const handleContraseniaChange = (e) => {
    setContrasenia(e.target.value);
  };

  const getErrors = () => {
    setErrors(true);
    setTimeout(() => {
      setErrors(false);
    }, 2000);
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const datosObj = {
      documento,
      contrasenia,
    };

    if (
      documento &&
      contrasenia &&
      documento.length !== 0 &&
      contrasenia.length !== 0
    ) {
      const response = await context.logueo(datosObj);

      if (response) {
        context.redirectUser();
      } else {
        getErrors();
      }
    } else {
      /**----------------------------------------------
       * | Esta vacio mostrar error en los inputs
       *----------------------------------------------*/
      getErrors();
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col space-y-20">
      {/* el navbar contiene un z-30 */}
      <NavBar />
      <div>
        <div className="rounded-xl bg-gray-950 bg-opacity-50 px-8 py-5 sm:px-16 sm:py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="text-black">
            <div className="mb-8 flex flex-col items-center">
              <img
                src="../../public/Cafe-magico.png"
                width="150"
                alt="logo cafe magico"
              />
              <span className="text-gray-200">
                Ingrese los detalles de inicio de sesión
              </span>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 text-lg">
                <input
                  autoFocus
                  className={`${
                    errors
                      ? "transition ease-linear border border-red-600 bg-red-300 "
                      : "border border-transparent"
                  }rounded-sm appearance-none text-lg py-2 px-7 sm:py-2 text-center text-gray-900 placeholder-slate-500 shadow-lg outline-none`}
                  type="number"
                  name="documento"
                  placeholder="Documento"
                  id="documento"
                  value={documento}
                  onChange={handleDocumentoChange}
                />
              </div>

              <div className="mb-4 text-lg">
                <input
                  className={`${
                    errors
                      ? "transition ease-linear border border-red-600 bg-red-300 "
                      : "border border-transparent"
                  }rounded-sm py-2 pl-10 pr-4 text-center text-lg text-gray-900 placeholder-slate-500 shadow-lg outline-none absolute`}
                  type={`${seePassword ? "text" : "password"}`}
                  name="contrasenia"
                  placeholder="*********"
                  value={contrasenia}
                  onChange={handleContraseniaChange}
                />
                {seePassword ? (
                  <IoIosEye
                    onClick={() => setSeePassword(false)}
                    className="cursor-pointer relative eye-pos m-2 bg-transparent text-2xl"
                  />
                ) : (
                  <IoIosEyeOff
                    onClick={() => setSeePassword(true)}
                    className="cursor-pointer relative eye-pos m-2 bg-transparent text-2xl"
                  />
                )}
              </div>
              <div className="mt-11 flex justify-center text-lg text-black">
                <button
                  type={`${!loading ? "submit" : "button"}`}
                  className="p-2 sm:p-3 rounded-sm border border-solid border-black text-slate-100 text-base shadow-sm shadow-black bg-blue-500 font-mono font-bold hover:bg-blue-800 hover:text-white ease-out duration-1000"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
