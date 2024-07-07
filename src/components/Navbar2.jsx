import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { isAuthenticated, isAdmin } = useContext(AppContext);

  const navigate = useNavigate();
  const navItems = [
    { name: "Home", href: "/home", current: true },
    // { name: "Dropdown", href: "#", current: false, dropdown: true },
    { name: "Services", href: "#", current: false },
    { name: "Pricing", href: "#", current: false },
    { name: "Contact", href: "#", current: false },
  ];

  const dropdownItems = [
    { name: "Dashboard", href: "#" },
    { name: "Settings", href: "#" },
    { name: "Earnings", href: "#" },
    { name: "Sign out", href: "#" },
  ];

  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    navigate("/");
  }
  return (
    <nav className="bg-white border-gray-200 w-full shadow-sm z-40">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-normal whitespace-nowrap">
            Career App
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul className="flex flex-col items-center font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            {navItems.map((item, index) => (
              <li key={index}>
                {item.dropdown ? (
                  <>
                    <button
                      id="dropdownNavbarLink"
                      data-dropdown-toggle="dropdownNavbar"
                      className={`flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-cyan-700 md:p-0 md:w-auto ${
                        item.current
                          ? "bg-cyan-700 text-white md:bg-transparent md:text-cyan-700"
                          : ""
                      }`}
                    >
                      {item.name}
                      <svg
                        className="w-2.5 h-2.5 ms-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </button>
                    <div
                      id="dropdownNavbar"
                      className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
                    >
                      <ul className="py-2 text-sm text-gray-700">
                        {dropdownItems
                          .slice(0, 3)
                          .map((dropdownItem, index) => (
                            <li key={index}>
                              <a
                                href={dropdownItem.href}
                                className="block px-4 py-2 hover:bg-gray-100"
                              >
                                {dropdownItem.name}
                              </a>
                            </li>
                          ))}
                      </ul>
                      <div className="py-1">
                        <a
                          href={dropdownItems[3].href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {dropdownItems[3].name}
                        </a>
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-cyan-700 md:p-0 ${
                      item.current
                        ? "bg-cyan-700 text-white md:bg-transparent md:text-cyan-700"
                        : "text-gray-900"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
            {isAuthenticated() ? (
              <>
                {isAdmin() && (
                  <button
                    onClick={() => navigate("/admin/create-blog")}
                    type="button"
                    className="text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:ring-lime-300 font-medium rounded-lg text-sm px-2.5 py-1  dark:bg-lime-600 dark:hover:bg-lime-700 focus:outline-none dark:focus:ring-lime-800"
                  >
                    Create Guide
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  type="button"
                  className="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-cyan-600 dark:hover:bg-cyan-700 focus:outline-none dark:focus:ring-cyan-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                type="button"
                className="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-cyan-600 dark:hover:bg-cyan-700 focus:outline-none dark:focus:ring-cyan-800"
              >
                Login
              </button>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
