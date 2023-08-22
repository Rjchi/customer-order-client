import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { ProductoCard } from "./ProductoCard";
import { Fragment, useState } from "react";

export const MenuContent = ({ category, products }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  if (products.length === 0 || category === undefined || category === null) {
    return (
      <h1 className="flex justify-center items-center text-white">
        Loading...
      </h1>
    );
  } else {
    return (
      <div className={`flex flex-col bg-cyan-400 justify-items-center items-center h-full w-full`}>
        <Menu
          as="div"
          className={`m-3 flex flex-col w-full h-auto justify-start items-center`}
        >
          {({ open }) => (
            <>
              <Menu.Button
                className="flex flex-row w-full h-14 justify-around items-center rounded-xl bg-green-700 px-4 py-2 text-xl font-bold text-white hover:bg-green-600 focus:outline-none focus-visible:ring-1 focus-visible:ring-black focus-visible:ring-opacity-75"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {category}
                <ChevronDownIcon
                  className="ml-2 -mr-1 h-8 w-8 text-white hover:text-violet-200"
                  aria-hidden="true"
                />
              </Menu.Button>
              <Transition
                show={menuOpen}
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                {({ active }) => (
                  <Menu.Items
                    className={`overflow-scroll gap-1 mt-2 w-full ${
                      !active ? "h-auto" : "h-20"
                    } origin-top-right divide-y divide-black rounded-md bg-white shadow-lg shadow-black ring-2 ring-black ring-opacity-5 focus:outline-none`}
                  >
                    <div className="px-1 py-1">
                      <Menu.Item
                        className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 justify-center gap-3 items-center w-full h-full bg-slate-400"
                        as="div"
                      >
                        {({ active }) =>
                          products.map((product) => (
                            <ProductoCard
                              key={product.id_producto}
                              product={product}
                            />
                          ))
                        }
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                )}
              </Transition>
            </>
          )}
        </Menu>
      </div>
    );
  }
};
