import "./App.css";
import io from "socket.io-client";
import { Route, Routes } from "react-router-dom";

import PedidoForm from "./pages/PedidoForm";
import Cocina from "./pages/Cocina";
import { PedidoContextProvider } from "./context/PedidoCotext";

const socket = io("http://localhost:5000");

function App() {
  return (
    <div>
      <PedidoContextProvider>
        <Routes>
          <Route path="/" element={<PedidoForm socket={socket} />} />
          <Route path="/cocina" element={<Cocina socket={socket} />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </PedidoContextProvider>
    </div>
  );
}

export default App;
