import React from "react";
import { Link } from "react-router-dom";

const Card = ({
  title,
  description,
  buttonText,
  buttonTextColor,
  bgColor,
  textColor,
  link,
}) => {
  // Define default background and text colors
  const defaultBgColor = "white";
  const defaultTextColor = "gray-700";
  const defaultButtonTextColor = "#FFFFFF";
  
  const customStyles = {
    boxShadow: "0px 0px 5px 0px rgba(151, 145, 145, 0.75)",
    borderRadius: "15px",
    padding: "10px 6px",
    backgroundColor: bgColor ? bgColor : defaultBgColor,
    color: textColor ? textColor : defaultTextColor,
  };

  return (
    <div
      className="flex flex-col rounded-xl bg-clip-border shadow-md h-64 md:h-72 relative md:pb-8 "
      style={customStyles}
    >
      <div className="py-6 px-4 flex flex-col h-full">
        <h5 className="pt-6 mb-2 block font-sans text-xl text-center font-semibold leading-snug tracking-normal antialiased">
          {title}
        </h5>
        <p className="flex-grow block font-sans text-base font-light leading-relaxed text-inherit antialiased overflow-ellipsis">
          {description}
        </p>
        <div className="mt-4">
          <Link
            to={link}
            className="select-none rounded-lg bg-none py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase shadow-md transition-all hover:shadow-lg focus:opacity-85 focus:shadow-none active:opacity-85 active:shadow-none disabled:pointer-events-none disabled:opacity-50"
            style={{
              color: buttonTextColor ? buttonTextColor : defaultButtonTextColor,
            }}
          >
            {buttonText} &rarr;
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center w-20 h-20 rounded-full absolute top-[-40px] left-1/2 transform -translate-x-1/2 text-4xl" style={{background:buttonTextColor}}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
        >
          <path
            d="M345 39.1L472.8 168.4c52.4 53 52.4 138.2 0 191.2L360.8 472.9c-9.3 9.4-24.5 9.5-33.9 .2s-9.5-24.5-.2-33.9L438.6 325.9c33.9-34.3 33.9-89.4 0-123.7L310.9 72.9c-9.3-9.4-9.2-24.6 .2-33.9s24.6-9.2 33.9 .2zM0 229.5V80C0 53.5 21.5 32 48 32H197.5c17 0 33.3 6.7 45.3 18.7l168 168c25 25 25 65.5 0 90.5L277.3 442.7c-25 25-65.5 25-90.5 0l-168-168C6.7 262.7 0 246.5 0 229.5zM144 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
            fill="#fff"
          />
        </svg>
      </div>
    </div>
  );
};

export default Card;
