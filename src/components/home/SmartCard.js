import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card = ({
  title,
  description,
  buttonText,
  buttonTextColor,
  bgColor,
  textColor,
  link,
  icon,
  flipIcon,
}) => {
  // Define default background and text colors
  const defaultBgColor = "tecruitSecondary";
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
      className="flex flex-col rounded-xl bg-clip-border shadow-md h-64 md:h-80 relative md:pb-8 "
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
        <FontAwesomeIcon icon={icon} className="text-tecruitSecondary" flip={flipIcon}/>
      </div>
    </div>
  );
};

export default Card;
