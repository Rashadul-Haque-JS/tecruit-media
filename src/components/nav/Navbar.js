import React from "react";
import NavMenu from "./NavDropDown";
import { Link } from "react-router-dom";
const links = [
  {
    id: 1,
    path: "/home",
    icon: <i class="fa fa-home" aria-hidden="true">🏡</i>,
    text: "Get Started",
  },
  {
    id: 2,
    path: "/about",
    icon: <i className="fa fa-info">ℹ️</i>,
    text: "Be hired ",
  },
];

const Navbar = () => {
  return (
    <div
      className="flex justify-between items-center gap-2 py-8 px-6 text-white bg-black"
      style={{
        borderBottom: "1px solid gray",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="flex justify-start items-center w-2/4 gap-5">
        <h1 className="text-3xl px-5 border-r-2 border-gray-500 logo">Face Media</h1>
        <div className="flex justify-between items-center gap-1 nav-font">
          <Link>For Companies</Link>
          <NavMenu title="For Developer" links={links} />
          <NavMenu title="Resources" links={links} />
        </div>
      </div>
      <div className="flex justify-center items-center gap-4">
        <Link>Log In</Link>
        <Link className="button ">
          Join Us Now
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
