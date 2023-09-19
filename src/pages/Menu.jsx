import { Spinner } from "../components/utils/Spinner";
import { useOrders } from "../context/PedidoCotext";
import { useEffect, useState } from "react";
import { MenuProductsByCategory } from "../components/Menu/MenuProductsByCategory";

export const Menu = () => {
  const [products, setProducts] = useState([]);
  const { getProducts, getProByCate } = useOrders();

  useEffect(() => {
    window.scrollTo(0, 0);
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
      <Spinner />
    );
  } else {
    const productsByCategory = Object.values(getProByCate(products));

    return (
      <div className="mt-11 2xl:mt-52 xl:mt-32 w-full h-full flex flex-col items-center justify-center">
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