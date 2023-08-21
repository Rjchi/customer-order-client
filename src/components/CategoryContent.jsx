import { useOrders } from "../context/PedidoCotext";
import { useEffect, useState } from "react";
import { MenuContent } from "./MenuContent";

export const CategoryContent = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const { getProducts, getCategories, getProByCate } = useOrders();

  useEffect(() => {
    const loadProducts = async () => {
      const response = await getProducts();
      setProducts(response);
    };

    const loadCategories = async () => {
      const response = await getCategories();
      setCategories(response);
    };

    loadProducts();
    loadCategories();
  }, [getProducts, getCategories]);

  if (products.length === 0 || categories.length === 0) {
    return (
      <h1 className="flex justify-center items-center text-white">
        Loading...
      </h1>
    );
  } else {
    const productsByCategory = getProByCate(products);
    const numberOfCate = Object.keys(productsByCategory).length;
    console.log(productsByCategory[1].nombre_categoria)
    console.log(productsByCategory[1].productos)
    console.log(numberOfCate)
    // COMO MANDAR EL NOMBRE DE LA CATEGORIA Y LOS PRODUCTOS POR PROPS A MENU
    
    return (
      <div>
        
      </div>
    );
  }
};
