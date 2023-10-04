import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useOrders } from "../context/PedidoCotext";
import hooks from "../hooks/useFunctions";
import NavBar from "../components/Navegation/NavBar";

export const Login = () => {
  const context = useOrders();
  const navigate = useNavigate();
  const [documento, setDocumento] = useState("");
  const [contrasenia, setContrasenia] = useState("");

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
        const token = hooks.useDecodedToken(response);
        console.log(token);
        if (token.user.usu_rol === "Mesero") {
          navigate(`/menu`);
        } else if (token.user.usu_rol === "Cocinero") {
          navigate(`/cocina`);
        } else if (token.user.usu_rol === "Cajero") {
          navigate(`/cajero`);
        } else {
          navigate(`/menu`);
        }
      }
    } else {
      /**----------------------------------------------
       * | Esta vacio mostrar error en los inputs
       *----------------------------------------------*/
      console.log(JSON.stringify(datosObj));
    }
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
                  type="submit"
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
