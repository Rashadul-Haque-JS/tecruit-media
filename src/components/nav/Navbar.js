import React, { useState } from "react";
import NavMenu from "./NavDropDown";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const links = [
  {
    id: 1,
    path: "/home",
    icon: (
      <i className="fa fa-home" aria-hidden="true">
        🏡
      </i>
    ),
    text: "Get Started",
  },
  {
    id: 2,
    path: "/about",
    icon: (
      <i className="fa fa-info" aria-hidden="true">
        ℹ️
      </i>
    ),
    text: "Be Hired",
  },
];

const Navbar = () => {
  const [openDropDownDrawer, setDropDownDrawer] = useState(false);

  const toggleDrawer = () => {
    setDropDownDrawer(!openDropDownDrawer);
  };

  return (
    <div
      className="relative flex justify-between items-center gap-2 py-4 px-6 text-white bg-black "
      style={{
        borderBottom: "1px solid #4A5568",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="flex justify-start items-center w-2/4 gap-5">
        <Link to="/" className="text-3xl px-5 border-r-2 border-gray-700 logo">
          Tecruit
        </Link>
        <div className="flex justify-between items-center gap-1 nav-font sm:hidden md:hidden">
          <Link to="/post-job">Companies</Link>
          <NavMenu title="Developer" links={links} />
          <NavMenu title="Resources" links={links} />
        </div>
      </div>
      <div className="flex justify-center items-center gap-4">
        <Link className="border-r-2 px-4 py-1 sm:hidden  border-gray-700 mt-2 font-damion">
          My Job
        </Link>
        <Link className=" px-2 py-1 sm:hidden rounded border-gray-700 mt-2 font-damion">
          Join Us Now
        </Link>
        <div className=" hidden sm:flex md:block items-center text-xl">
          <Link className="px-4 flex justify-center items-center border-gray-700 logo">
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="md:hidden"
            />
          </Link>
          <button
            className={`flex md:flex w-8 h-8 rounded-full px-2 shadow-2xl justify-center items-center${
              openDropDownDrawer ? "bg-gray-400 transform rotate-90" : ""
            }`}
            style={{ transition: "transform 0.3s ease" }}
            onClick={toggleDrawer}
          >
            {openDropDownDrawer ? (
              <FontAwesomeIcon icon={faXmark} />
            ) : (
              <FontAwesomeIcon icon={faBars} className="text-[#db0045]" />
            )}
          </button>
        </div>
      </div>
      {openDropDownDrawer && (
        <div
          className="absolute bottom-[-80px] left-0 w-full nav-font z-30 flex md:justify-center justify-evenly items-center px-4 pt-2 pb-8 md:gap-4"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            transition: "transform 0.3s ease",
          }}
        >
          <Link to="/post-job" className="sm:text-center">Companies</Link>
          <NavMenu title="Developer" links={links} />
          <NavMenu title="Resources" links={links} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
