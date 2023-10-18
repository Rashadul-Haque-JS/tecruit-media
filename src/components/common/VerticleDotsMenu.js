import React, { useState } from 'react';

const VerticalDotsMenu = ({ options }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="absolute w-fit right-2 top-2 text-xl" onMouseEnter={openMenu} onMouseLeave={closeMenu} onTouchStart={openMenu} onTouchEnd={closeMenu}>
      <button className="text-2xl" onClick={openMenu}>
        &#8942;
      </button>
      {isMenuOpen && (
        <div className="absolute right-0 top-1 w-24 p-3 text-xs bg-tecruitSpecial border rounded shadow-md z-10" onMouseEnter={openMenu} onMouseLeave={closeMenu} onTouchStart={openMenu} onTouchEnd={closeMenu}>
          <ul className='flex flex-col justify-center items-center gap-3'>
            {options.map((option, index) => (
              <li
                key={index}
                onClick={!option.isDisabled ? option.action : undefined}
                className={`w-full py-1 text-center text-tecruitSecondary cursor-pointer hover:bg-gray-700 ${option.isDisabled ? 'cursor-not-allowed' : ''}`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VerticalDotsMenu;
