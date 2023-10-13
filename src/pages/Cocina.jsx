import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useOrders } from "../context/PedidoCotext";
import NavBar from "../components/Navegation/NavBar";
import { Spinner } from "../components/utils/Spinner";
import { CocinaTable } from "../components/Cocina/CocinaTable";

const Cocina = () => {
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();
  const context = useOrders();

  useEffect(() => {
    window.scrollTo(0, 0);

    /**----------------------------------------------
     * | Validamos el rol y la validez del token
     * ----------------------------------------------*/
    const fetchRole = async () => {
      if (sessionStorage.getItem("currentToken")) {
        try {
          const res = await context.validateToken(
            sessionStorage.getItem("currentToken")
          );
          if (res) {
            /**----------------------------------------------
             * | Si el token existe y es valido
             * | Redireccionamos al usuario segun su rol
             *  ----------------------------------------------*/
            context.redirectUser();
          } else {
            navigate(`/menu`);
          }
        } catch (error) {
          navigate(`/menu`);
        }
      } else {
        navigate(`/menu`);
      }
    };

    fetchRole();

    context.socket.emit("cocinaConectada");

    const loadOrders = async () => {
      const response = await context.getOrdersNotCheck();
      if (response.length !== 0) {
        setPedidos(response);
      }
    };

    if (pedidos.length === 0) {
      loadOrders();
    }

    /**---------------------------------------------------------
     * | Escuchar eventos de nuevos pedidos para la cocina
     * ---------------------------------------------------------*/
    context.socket.on("nuevoPedidoCocina", () => {
      loadOrders();
    });

    context.socket.on("recargaPedidos", () => {
      setPedidos([]);
      if (pedidos.length === 0) {
        loadOrders();
      }
    });

    /**----------------------------------------
     * | Limpieza al desmontar el componente
     * ----------------------------------------*/
    return () => {
      context.socket.off("nuevoPedidoCocina");
      context.socket.off("recargaPedidos");
    };
  }, [pedidos, context, navigate]);

  if (pedidos.length === 0) {
    return (
      <>
        <NavBar />
        <Spinner />;
      </>
    );
  } else {
    const ordersByTable = Object.values(getOrderByTable(pedidos));
    console.log(ordersByTable);

    return (
      <>
        <NavBar />
        <div className="bg-transparent rounded-xl h-auto w-full py-3 grid grid-cols-1 items-center justify-center mt-11">
          <div className="h-auto w-full bg-transparent">
            <ul className="grid grid-cols-1 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-10">
              {ordersByTable.map((order, index) => (
                <CocinaTable
                  key={index}
                  table={order.mesa}
                  orders={order.pedidos}
                />
              ))}
            </ul>
          </div>
        </div>
      </>
    );
  }
};

export default Cocina;
