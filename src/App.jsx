import "./App.css";
import { Route, Routes } from "react-router-dom";

import Cocina from "./pages/Cocina";
import { NotFound } from "./pages/NotFound";

import { PedidoContextProvider } from "./context/PedidoCotext";
import { CategoryContent } from "./components/CategoryContent";

function App() {
  return (
    <div className="container mx-auto p-4 h-full w-full">
      <PedidoContextProvider>
        <Routes>
          <Route path="/" element={<CategoryContent />} />

          <Route path="/cocina" element={<Cocina />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </PedidoContextProvider>
    </div>
  );
}

export default App;
