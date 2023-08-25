import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className="bg-orange-600 flex flex-col w-full h-auto items-center justify-center mt-2 mb-2">
      <ul className="flex flex-row items-center justify-around gap-2 w-full h-1/5">
        <li>
          <Link to={`/cocina`}>Cocina</Link>
        </li>
        <li>
          <Link to={`/`}>Cliente</Link>
        </li>
      </ul>
    </nav>
  );
};
