import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { toggleStateDrawer } from "../../store/features/commonState";

const NavMenu = ({ title, links }) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const dispatch = useDispatch();

  const toggleDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const toggleDrawerState = () => {
    dispatch(toggleStateDrawer());
  };

  return (
    <div className="relative" onMouseLeave={closeDrawer}>
      <div
        className="flex justify-center items-center gap-2 px-2 py-1 cursor-pointer"
        onMouseOver={toggleDrawer}
      >
        <h1>{title}</h1>
        <div className="flex justify-end">
          <button
            style={{
              transform: isDrawerOpen ? "rotate(0deg)" : "rotate(90deg)",
              transition: "transform 0.3s ease",
            }}
          >
            <FontAwesomeIcon icon={faAngleDown} />
          </button>
        </div>
      </div>

      {isDrawerOpen && (
        <div className="absolute top-full right-0 w-[200px] text-tecruitPrimary bg-gray-100 rounded-md z-40">
          <div className="h-full px-4 py-3 rounded-md">
            {links?.map((link) => (
              <Link
                key={link.id}
                to={link.path}
                onClick={toggleDrawerState}
              >
                <div className="flex items-center gap-2 p-2 hover:bg-tecruitPrimary hover:text-tecruitSecondary rounded">
                  <p>{link.icon}</p>
                  <p>{link.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavMenu;
