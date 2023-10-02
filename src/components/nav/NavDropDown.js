import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faRotate } from "@fortawesome/free-solid-svg-icons";

const NavMenu = ({ title, links }) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="relative" onMouseLeave={closeDrawer}>
      <div className="flex justify-center items-center gap-2 px-2 py-1">
        <h1>{title}</h1>
        <div className="flex justify-end">
        <button onClick={toggleDrawer} style={{ transform: isDrawerOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>
            <FontAwesomeIcon icon={faAngleDown} /> {/* Dropdown icon */}
          </button>
        </div>
      </div>

      {isDrawerOpen && (
        <div className="absolute bottom-[-4opx] left-0 w-[200px] bg-gray-500 rounded-md">
          <div className="h-full px-4 py-3 rounded-md">
            {links?.map((link) => (
              <Link key={link.id} to={link.path}>
                <div className="flex items-center gap-2 p-2">
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
