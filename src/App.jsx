import "./App.css";
import { Route, Routes } from "react-router-dom";
import { PedidoContextProvider } from "./context/PedidoCotext";

import Cocina from "./pages/Cocina";
import { Caja } from "./pages/Caja";
import { Menu } from "./pages/Menu";
import { Login } from "./pages/Login";
import { Cliente } from "./pages/Cliente";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <div className="container mx-auto my-auto p-4 h-auto w-full flex flex-col items-center justify-center">
      <PedidoContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Cliente />} />

          <Route path="/menu" element={<Menu />} />

          <Route path="/cocina" element={<Cocina />} />
          <Route path="/caja" element={<Caja />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </PedidoContextProvider>
    </div>
  );
}

export default App;
