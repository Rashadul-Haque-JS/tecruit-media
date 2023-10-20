import React from "react";
import { Link } from "react-router-dom";

const CardImgBackground = ({ img, headline, text, label, link }) => {
  const customStyles = {
    backgroundImage: `url(${img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="p-2 rounded-md w-full ">
      <div className="w-full h-auto py-32 relative" style={customStyles}>
        <div className="flex flex-col justify-center items-center gap-2 w-full text-md sm:tracking-tighter tracking-normal sm:mt-0 mt-8 py-4 px-10">
          <h1 className="text-2xl text-tecruitSecondary text-start font-medium tracking-tight z-10">{headline}</h1>
          <p className="tracking-wide text-tecruitSecondary pb-2 z-10">{text}</p>
          <Link to={link} className="bg-tecruitPrimary font-bold cursor-pointer rounded-sm px-2 py-1 text-tecruitSecondary z-10">
            {label}
          </Link>
        </div>
        <div className="absolute inset-0 bg-tecruitSpecial opacity-20 w-full h-full z-0 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default CardImgBackground;
