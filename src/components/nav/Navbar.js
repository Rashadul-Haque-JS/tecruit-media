import React, { useState, useEffect,useCallback } from "react";
import jwt_decode from 'jwt-decode';
import NavMenu from "./NavDropDown";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { getLinksOne, getLinksTwo } from "../../routes/routes";
import tecruitLogo from "../../assets/media/tecruit-logo.png";
import { useSelector, useDispatch } from "react-redux";
import { toggleStateDrawer } from "../../store/features/commonState";
import { addCompany } from "../../store/features/company";
import {
  saveHeaderToken,
  getAuthapplicant,
  removeToken,
  getAuthCompany,
} from "../../api/api";
import { addAuthToken, addAuthType,addAuthEmail } from "../../store/features/commonState";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);
  const openDropDownDrawer = useSelector((state) => state.common.isDrawerOpen);
  const { location, authToken, authType} = useSelector(
    (state) => state.common
  );
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleDrawer = () => {
    dispatch(toggleStateDrawer());
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (authType === "applicant") {
          response = await getAuthapplicant();
        } else {
          response = await getAuthCompany();
        }
        const username = response.data.email?.split("@")[0].slice(0, 2);
        const companyName = response.data.companyName.split(" ")[0].slice(0, 2);
        setUser(username);
        setCompany(companyName);
        dispatch(addAuthType(response.data.type));
        dispatch(addAuthEmail(response.data.email));
        dispatch(addCompany(response.data));
      } catch (error) {
        if (error.response) {
          console.log("API request error:", error.response.data);
        } else if (error.request) {
          console.log("API request error: No response received");
        } else {
          console.error("Other API request error:", error.message);
        }
      }
    };
  
    if (authToken) {
      saveHeaderToken(authToken);
      fetchData();
    }
  }, [authToken, authType, dispatch]);
  

 const handleLogout = () => {
    dispatch(addAuthToken(""));
    dispatch(addAuthType(""));
    dispatch(toggleStateDrawer());
    removeToken();
    navigate("/auth");
  };

  const handleAutoLogout = useCallback(() => {
    dispatch(addAuthToken(""));
    dispatch(addAuthType(""));
    dispatch(toggleStateDrawer());
    removeToken();
    navigate("/auth")
  }, [dispatch,navigate]);

  useEffect(() => {
    if (authToken) {
      const decodedToken = jwt_decode(authToken);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        handleAutoLogout();
      }
    }
  }, [authToken, handleAutoLogout, dispatch]);
  
  return (
    <div
      className="relative flex justify-between items-center gap-2 py-5 sm:py-3 md:py-3 lg:py-3 xl:py-2 px-6 sm:pl-0 md:pr-4 md:pl-0 sm:pr-4 text-tecruitPrimary bg-[#fff] z-50"
      style={{
        borderBottom: "none",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="flex justify-start items-center w-2/4 gap-5">
        <Link to="/" className="px-2 border-r-2 border-gray-300">
          <img
            src={tecruitLogo}
            alt="Tecruit logo"
            className="w-fit h-8 2xl:h-12"
          />
        </Link>
        <div className="flex justify-between items-center gap-1 2xl:text-xl sm:hidden md:hidden">
          <Link to={`/${location}/post-job`}>Companies</Link>
          <NavMenu title="Applicants" links={getLinksOne(location)} />
          <NavMenu title="Resources" links={getLinksTwo(location)} />
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 2xl:text-xl">
        {!authToken && (
          <>
            <Link
              to="/auth"
              className="border-r-2 px-4 py-1 sm:hidden border-gray-300 "
            >
              Login
            </Link>
            <Link to="/tecruit" className=" px-2 py-1 sm:hidden rounded border-gray-700 ">
              Know Us
            </Link>
          </>
        )}
        {authToken && (
          <>
            {authType === "applicant" && (
              <Link
              to="/profile"
              className="border-r-2 px-4 py-1 sm:hidden border-gray-300 uppercase cursor-pointer "
            >
              {user}
            </Link>
            )}
            {authType === "company" && (
              <Link
              to="/profile"
              className="border-r-2 px-4 py-1 sm:hidden border-gray-300 uppercase cursor-pointer "
            >
              {company}
            </Link>
            )}
            <button onClick={handleLogout} className=" sm:hidden">
              Logout
            </button>
          </>
        )}
        <div className=" hidden sm:flex md:block items-center text-xl">
          {!authToken && (
            <Link
              to="/auth"
              className="px-4 flex justify-center items-center border-gray-300"
            >
              <FontAwesomeIcon
                icon={faArrowRightToBracket}
                className="md:hidden border border-tecruitPrimary rounded px-2 py-1"
              />
            </Link>
          )}
          {authToken && authType === "applicant" && (
            <Link
              to="/profile"
              className="px-4 flex justify-center items-center border-gray-300 uppercase"
            >
              <span className="md:hidden border border-tecruitPrimary rounded px-1 text-center">
                {user}
              </span>
            </Link>
          )}
          {authToken && authType === "company" && (
            <Link
              to="/profile"
              className="px-4 flex justify-center items-center border-gray-300 uppercase"
            >
              <span className="md:hidden border border-tecruitPrimary rounded px-1 text-center">
                {company}
              </span>
            </Link>
          )}
          <button
            className={`flex md:flex w-8 h-8 rounded-full px-2 shadow-2xl justify-center items-center${
              openDropDownDrawer ? "bg-gray-400 transform rotate-90" : ""
            }`}
            style={{ transition: "transform 0.3s ease" }}
            onClick={toggleDrawer}
          >
            {openDropDownDrawer ? (
              <FontAwesomeIcon
                icon={faXmark}
                className="border border-tecruitPrimary rounded px-[.4rem] py-2 md:border-none"
              />
            ) : (
              <FontAwesomeIcon
                icon={faBars}
                className="border border-tecruitPrimary rounded px-2 py-1 md:border-none"
              />
            )}
          </button>
        </div>
      </div>
      {openDropDownDrawer && (
        <div
          className="hidden absolute bottom-[-72px] left-0 w-full z-30 sm:flex md:flex md:justify-center justify-evenly items-center px-4 pt-2 pb-8 md:gap-4"
          style={{
            background: "#279b39",
            color: "#fff",
            transition: "transform 0.3s ease",
          }}
        >
          <Link
            to={`/${location}/post-job`}
            className="sm:text-center "
            onClick={toggleDrawer}
          >
            Companies
          </Link>
          <NavMenu title="Applicants" links={getLinksOne(location)} />
          <NavMenu title="Resources" links={getLinksTwo(location)} />
          {authToken && (
            <button onClick={handleLogout} className="hidden sm:flex p-0">
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
