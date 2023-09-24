import { useState } from "react";
import { useOrders } from "../context/PedidoCotext";
import NavBar from "../components/Navegation/NavBar";
export const Login = () => {
  const { logueo } = useOrders();
  // Estados para los valores de los inputs
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const datosObj = {
      documento,
      contrasenia,
    };
    console.log(JSON.stringify(datosObj));
    logueo(datosObj);
  };

  return (
    <div className="flex flex-col space-y-20">
      <div className="w-full fixed top-0 left-0 z-30 shadow-2xl max-w-screen-lg">
        <NavBar/>
      </div>
      <div>
        <div className="rounded-xl bg-gray-950 bg-opacity-50 px-8 py-5 sm:px-16 sm:py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="text-white">
            <div className="mb-8 flex flex-col items-center">
              <img
                src="../../public/Cafe-magico.png"
                width="150"
                alt="Descripción de la imagen"
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
