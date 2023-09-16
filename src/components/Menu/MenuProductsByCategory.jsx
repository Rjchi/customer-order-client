import { Spinner } from "../utils/Spinner";
import { GiChipsBag } from "react-icons/gi";
import { PiBowlFoodFill } from "react-icons/pi";
import { MenuProductCard } from "./MenuProductCard";
import { BsFillCupHotFill } from "react-icons/bs";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { MdLocalDrink, MdFastfood } from "react-icons/md";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

export const MenuProductsByCategory = ({ category, products }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  if (products.length === 0 || category === undefined || category === null) {
    return <Spinner />;
  } else {
    return (
      <div
        className={`flex flex-col justify-items-center items-center h-full w-full`}
      >
        <Menu
          as="div"
          className={`m-3 flex flex-col w-full h-auto justify-start items-center`}
        >
          {
            <>
              <Menu.Button
                className="flex flex-row w-full font-mono tracking-widest h-14 justify-between items-center rounded-xl bg-slate-500 px-11 py-10 text-xl font-bold text-white hover:bg-slate-600 outline-none ring-1 ring-black ring-opacity-75 shadow-lg shadow-black"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {category === "BEBIDAS CALIENTES" ? (
                  <i>
                    <BsFillCupHotFill className="text-3xl text-amber-400" />
                  </i>
                ) : category === "BEBIDAS FRIAS" ? (
                  <i>
                    <MdLocalDrink className="text-3xl text-blue-600" />
                  </i>
                ) : category === "ACOMPAÑANTES" ? (
                  <i>
                    <PiBowlFoodFill className="text-3xl text-amber-800" />
                  </i>
                ) : category === "ADICIONES" ? (
                  <i>
                    <GiChipsBag className="text-3xl text-purple-900" />
                  </i>
                ) : (
                  <i>
                    <MdFastfood className="text-3xl text-rose-600" />
                  </i>
                )}
                {category}
                {!menuOpen ? (
                  <ChevronDownIcon
                    className="ml-2 -mr-1 h-8 w-8 text-white hover:text-violet-200"
                    aria-hidden="true"
                  />
                ) : (
                  <ChevronUpIcon
                    className="ml-2 -mr-1 h-8 w-8 text-white hover:text-violet-200"
                    aria-hidden="true"
                  />
                )}
              </Menu.Button>
              <Transition
                show={menuOpen}
                as={Fragment}
                enter="transition ease-out duration-700"
                enterFrom="transform opacity-10 scale-75"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                {({ active }) => (
                  <Menu.Items
                    className={`gap-1 mt-2 w-full ${
                      !active ? "h-auto" : "h-20 duration"
                    } origin-top-right divide-y divide-black rounded-md bg-white shadow-lg shadow-black ring-2 ring-black ring-opacity-5 focus:outline-none`}
                  >
                    <div className="px-3 py-4 bg-slate-200">
                      <Menu.Item
                        className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 justify-center gap-3 items-center w-full h-full bg-slate-200"
                        as="div"
                      >
                        {products.map((product) => (
                          <MenuProductCard
                            key={product.id_producto}
                            product={product}
                          />
                        ))}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                )}
              </Transition>
            </>
          }
        </Menu>
      </div>
    );
  }
};
