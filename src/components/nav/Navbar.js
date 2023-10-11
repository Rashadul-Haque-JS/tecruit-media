import React, { useState } from "react";
import NavMenu from "./NavDropDown";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { linksOne,linksTwo } from "../../data/jobs";

const Navbar = () => {
  const [openDropDownDrawer, setDropDownDrawer] = useState(false);

  const toggleDrawer = () => {
    setDropDownDrawer(!openDropDownDrawer);
  };

  return (
    <div
      className="relative flex justify-between items-center gap-2 py-4 px-6 text-[#279b37] bg-[#fff] z-50"
      style={{
        borderBottom: "none",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="flex justify-start items-center w-2/4 gap-5">
        <Link to="/" className="text-3xl px-5 border-r-2 border-gray-300 logo">
          Tecruit
        </Link>
        <div className="flex justify-between items-center gap-1  sm:hidden md:hidden">
          <Link to="/post-job">Companies</Link>
          <NavMenu title="Applicants" links={linksOne} />
          <NavMenu title="Resources" links={linksTwo} />
        </div>
      </div>
      <div className="flex justify-center items-center gap-4">
        <Link to="/auth" className="border-r-2 px-4 py-1 sm:hidden rounded  border-gray-300 mt-2">
          Login
        </Link>
        <Link className=" px-2 py-1 sm:hidden rounded border-gray-700 mt-2">
          Join Us
        </Link>
        <div className=" hidden sm:flex md:block items-center text-xl">
          <Link to="/auth" className="px-4 flex justify-center items-center border-gray-300">
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="md:hidden border border-gray-300 px-2 py-1"
            />
          </Link>
          <button
            className={`flex md:flex w-8 h-8 rounded-full px-2 shadow-2xl justify-center items-center${
              openDropDownDrawer ? "bg-gray-400 transform rotate-90" : ""
            }`}
            style={{ transition: "transform 0.3s ease"}}
            onClick={toggleDrawer}
          >
            {openDropDownDrawer ? (
              <FontAwesomeIcon icon={faXmark} className="border border-gray-300 px-2 py-1 md:border-none" />
            ) : (
              <FontAwesomeIcon icon={faBars} className="border border-gray-300 px-2 py-1 md:border-none" />
            )}
          </button>
        </div>
      </div>
      {openDropDownDrawer && (
        <div
          className="absolute bottom-[-72px] left-0 w-full z-30 flex md:justify-center justify-evenly items-center px-4 pt-2 pb-8 md:gap-4"
          style={{
            background: "#279b39",
            color: "#fff",
            transition: "transform 0.3s ease",
          }}
        >
          <Link to="/post-job" className="sm:text-center ">Companies</Link>
          <NavMenu title="Applicants" links={linksOne} />
          <NavMenu title="Resources" links={linksTwo} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
