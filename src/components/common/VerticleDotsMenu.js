import React, { useState } from 'react';

const VerticalDotsMenu = ({ options }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="absolute w-fit right-2 top-2 text-xl">
      <button className="text-2xl" onClick={toggleMenu}>
        &#8942;
      </button>
      {isMenuOpen && (
        <div className="absolute right-4 top-1 w-24 p-3 text-xs border rounded shadow-md z-10">
          <ul className='flex flex-col justify-center items-center gap-3'>
            {options.map((option, index) => (
              <li
                key={index}
                onClick={!option.isDisabled ? option.action : undefined}
                className={`w-full py-1 text-center cursor-pointer bg-tecruitSecondary hover:bg-gray-200 ${option.isDisabled ? 'cursor-not-allowed' : 'pointer'}`}
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
