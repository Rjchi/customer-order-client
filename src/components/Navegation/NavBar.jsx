import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    // <div className="w-full fixed top-0 left-0 z-30 lg:grid lg:grid-cols-10 ">
    <div className="w-full fixed top-0 left-0 z-30">
      <div className="col-span-8 col-start-2">
        <nav className="flex justify-center bg-black bg-opacity-80 border border-blue-950 shadow-lg backdrop-blur-md font-mono font-bold ">
          <div className="w-full flex items-center justify-between mt-0 px-6 py-2">
            <label
              htmlFor="menu-toggle"
              className="cursor-pointer md:hidden block"
            >
              <svg
                className="fill-current text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <title>menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
              </svg>
            </label>
            <input className="hidden" type="checkbox" id="menu-toggle" />

            <div
              className="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1"
              id="menu"
            >
              <nav>
                <ul className="flex items-center justify-between space-x-3 text-base text-blue-600 pt-4 md:pt-0">
                  <li className="hover:text-gray-50">
                    <Link to={`/cocina`}>Cocina</Link>
                  </li>
                  <li className="hover:text-gray-50">
                    <Link to={`/menu`}>Cliente</Link>
                  </li>
                  <li className="hover:text-gray-50">
                    <Link to={`/caja`}>Caja</Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div
              className="order-2 md:order-3 flex flex-wrap items-center justify-end mr-0 md:mr-4"
              id="nav-content"
            >
              <div className="auth flex items-center w-full md:w-full">
                <button
                  type="button"
                  onClick={() => navigate(`/login`)}
                  className="p-2 sm:p-3 rounded-sm border border-solid border-black text-slate-100 text-base shadow-sm shadow-black bg-blue-500 font-mono font-bold hover:bg-blue-800 hover:text-white ease-out duration-1000"
                >
                  Iniciar sesion
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
