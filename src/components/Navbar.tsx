import { useState } from "react";
import { FaDumbbell } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiSearch } from "react-icons/ci";
import useAuthActions from "../hooks/useAuthActions";
import { useUser } from "reactfire";
import { NavLink } from "react-router";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { data: user } = useUser();

  const menuItems = [
    { id: 1, name: "Dashboard", href: "/admin" },
    { id: 2, name: "Profile", href: "/admin/profile" },
  ];

  const { Logout } = useAuthActions();

  return (
    <>
      <nav>
        <div className="container mx-auto flex justify-between items-center px-3 py-8">
          {/* LOGO SECTION */}
          <div className="text-2xl flex items-center gap-2 font-bold uppercase">
            <FaDumbbell />
            <p>Coders</p>
            <p className="text-orange-500">Gym</p>
          </div>

          {/* MENU SECTION */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-6 text-gray-600">
              {menuItems.map((item) => {
                return (
                  <li key={item.id}>
                    <NavLink
                      to={item.href}
                      className="inline-block py-1 px-3 hover:text-orange-400 font-semibold"
                    >
                      {item.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ICONS SECTION */}
          <div className="flex items-center gap-4">
            <button className="text-2xl hover:bg-orange-500 hover:text-white rounded-full p-2 duration-200">
              <CiSearch />
            </button>
            <div>
              <img
                src={user?.photoURL ?? undefined}
                alt="exmple"
                className="w-[35px] h-[35px] rounded-full cursor-pointer"
              />
            </div>

            <button
              onClick={Logout}
              className="hover:bg-orange-500 cursor-pointer text-orange-500 font-semibold hover:text-white rounded-md border-2 border-orange-500 px-6 py-2 duration-200 hidden md:block"
            >
              SignOut
            </button>
          </div>

          {/* MOBILE HAMBURGUER MENU SECTION */}
          <div className="md:hidden" onClick={() => setOpen(!open)}>
            <GiHamburgerMenu className="text-4xl" />
          </div>
        </div>
      </nav>

      {/* MOBILE SIDEBAR SECTION */}

      {open && (
        <div className="absolute top-20 left-0 w-full h-screen  z-10">
          <div className="text-xl font-semibold uppercase bg-orange-500 text-white py-10 m-6 rounded-3xl">
            <ul className="flex flex-col justify-center items-center gap-10">
              <li>Dashboard</li>
              <li>Profile</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
