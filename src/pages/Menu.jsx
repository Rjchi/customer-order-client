import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useOrders } from "../context/PedidoCotext";
import NavBar from "../components/Navegation/NavBar";
import { Spinner } from "../components/utils/Spinner";
import { MenuProductsByCategory } from "../components/Menu/MenuProductsByCategory";

export const Menu = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const context = useOrders();

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadProducts = async () => {
      const response = await context.getProducts();
      if (response !== undefined) {
        setProducts(response);
      }
    };

    loadProducts();
  }, [context, navigate]);

  if (products.length === 0) {
    return <Spinner />;
  } else {
    const productsByCategory = Object.values(context.getProByCate(products));

    return (
      <div className="mt-16 2xl:mt-52 xl:mt-32 lg:mt-20 md:mt-20 sm:mt-20 w-full h-full flex flex-col items-center justify-center">
        <NavBar />
        {productsByCategory.map((product) => (
          <MenuProductsByCategory
            key={product.id_categoria}
            category={product.nombre_categoria}
            products={product.productos}
          />
        ))}
      </div>
    );
  }
};
