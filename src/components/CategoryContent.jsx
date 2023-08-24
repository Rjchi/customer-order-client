import { useOrders } from "../context/PedidoCotext";
import { useEffect, useState } from "react";
import { MenuContent } from "./MenuContent";

export const CategoryContent = () => {
  const [products, setProducts] = useState([]);

  const { getProducts, getProByCate } = useOrders();

  useEffect(() => {
    const loadProducts = async () => {
      const response = await getProducts();
      if (response !== undefined) {
        setProducts(response);
      }
    };

    loadProducts();
  }, [getProducts]);

  if (products.length === 0) {
    return (
      <h1 className="flex justify-center items-center text-white">
        Loading...
      </h1>
    );
  } else {
    const productsByCategory = Object.values(getProByCate(products));

    return (
      <div>
        {productsByCategory.map((product) => (
          <MenuContent
            key={product.id_categoria}
            category={product.nombre_categoria}
            products={product.productos}
          />
        ))}
      </div>
    );
  }
};
