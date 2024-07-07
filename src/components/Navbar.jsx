import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Logo from './../assets/logo.png'

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
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
          <a className="mr-5 hover:text-gray-900">Home</a>
          <a className="mr-5 hover:text-gray-900">About</a>
          <a className="mr-5 hover:text-gray-900">Contact</a>
          <a className="hover:text-gray-900">Career</a>
        </nav>
        <a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
          <img src={Logo} alt="logo" width='200px' />
          {/* <span className="ml-3 text-xl">ACS</span> */}
        </a>
        <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
          <a
            className="inline-block rounded bg-primary px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring"
            href="#"
          >
            Sign up
          </a>


          <a
            className="inline-block rounded border border-current ml-5 px-8 py-3 text-sm font-medium text-primary transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring"
            href="#"
          >
            Login
          </a>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
