import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { useOrders } from "../context/PedidoCotext";
import NavBar from "../components/Navegation/NavBar";

export const Login = () => {
  const context = useOrders();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [documento, setDocumento] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  useEffect(() => {
    const fetchRole = async () => {
      if (sessionStorage.getItem("currentToken")) {
        try {
          const res = await context.validateToken(
            sessionStorage.getItem("currentToken")
          );
          if (res) {
            /**----------------------------------------------
             * | Si el token existe y es valido
             * | Redireccionamos al usuario segun su rol
             *  ----------------------------------------------*/
            context.redirectUser();
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchRole();
  }, [context, navigate]);

  // Manejar cambios en los inputs
  const handleDocumentoChange = (e) => {
    setDocumento(e.target.value);
  };

  const handleContraseniaChange = (e) => {
    setContrasenia(e.target.value);
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
      }
    } else {
      /**----------------------------------------------
       * | Esta vacio mostrar error en los inputs
       *----------------------------------------------*/
      console.log(JSON.stringify(datosObj));
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
                  className="rounded-sm border-none bg-opacity-50 py-2 sm:px-6 sm:py-2 text-center text-inherit text-gray-900 placeholder-slate-500 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="documento"
                  placeholder="Documento"
                  value={documento}
                  onChange={handleDocumentoChange}
                />
              </div>

              <div className="mb-4 text-lg">
                <input
                  className="rounded-sm border-none bg-opacity-50 py-2 sm:px-6 sm:py-2 text-center text-inherit text-gray-900 placeholder-slate-500 shadow-lg outline-none backdrop-blur-md"
                  type="password"
                  name="contrasenia"
                  placeholder="*********"
                  value={contrasenia}
                  onChange={handleContraseniaChange}
                />
              </div>
              <div className="mt-8 flex justify-center text-lg text-black">
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
