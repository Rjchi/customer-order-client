import "./App.css";
import { Route, Routes } from "react-router-dom";

import Cocina from "./pages/Cocina";
import { NotFound } from "./pages/NotFound";

import { PedidoContextProvider } from "./context/PedidoCotext";
import { CategoryContent } from "./components/CategoryContent";

function App() {
  return (
    <div className="container mx-auto my-auto p-4 h-auto w-full flex flex-col items-center justify-center">
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
