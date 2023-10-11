import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const NavMenu = ({ title, links }) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="relative" onMouseLeave={closeDrawer}>
      <div className="flex justify-center items-center gap-2 px-2 py-1 cursor-pointer" onMouseOver={toggleDrawer}>
        <h1>{title}</h1>
        <div className="flex justify-end">
        <button  style={{ transform: isDrawerOpen ? 'rotate(90deg)' : 'rotate(0deg)',transition: 'transform 0.3s ease' }}>
            <FontAwesomeIcon icon={faAngleDown} /> {/* Dropdown icon */}
          </button>
        </div>
      </div>

      {isDrawerOpen && (
        <div className="absolute bottom-[-100px] right-0 w-[200px] text-[#279b37] bg-gray-100 rounded-md z-40">
          <div className="h-full px-4 py-3 rounded-md">
            {links?.map((link) => (
              <Link key={link.id} to={link.path}>
                <div className="flex items-center gap-2 p-2 hover:bg-[#279b37] hover:text-white rounded">
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
