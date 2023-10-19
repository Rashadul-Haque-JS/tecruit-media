import React, { useState, useEffect } from "react";
import { getNordicColor } from "../../utils/helper";
import FileUploadAndPdf from "../common/FileUploaderPdf";
import ApplyNowArrow from "../common/CallToAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

const CategoryStatsSlider = ({ categories, country }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [categories]);

  const currentCategory = categories[currentIndex];
  const nordicColors = getNordicColor(country);
  const txt = nordicColors.txt;
  const bgc = nordicColors.bgc;

  const customstyles = {
    padding: window.innerWidth < 1023 ? window.innerWidth > 767  ? ".5rem 1rem":'' : "1rem 1.5rem",
    borderRadius: "10px",
    flexDirection: "column",
    background: "#279b37",
    color: "#ffffff",
    fontWeight: "bolder", 
  };

  return (
    <div
      className={`flex sm:flex-col justify-start items-center gap-6 sm:gap-8 category-stats-slider rounded-l-full rounded-r-lg px-2 py-4 sm:px-0 md:w-[84vw] lg:w-[75vw] sm:w-full h-52 w-[60vw] shadow-shade sm:shadow-0 z-0 text-tecruitSecondary`}
    >
      <div
        className={`w-60 h-60 md:w-48 md:h-48 sm:w-32 sm:h-32 sm:py-2 sm:rounded-sm rounded-full flex justify-center items-center text-6xl  sm:text-3xl border-2 border-tecruitSecondary sm:border-none text-tecruitSpecial bg-tecruitSpecial sm:text-tecruitPrimary`}
      >
        <div className=" relative flex justify-center items-center flex-col gap-3 sm:p-0 sm:rounded-none sm:bg-transparent bg-tecruitSecondary p-2 sm:w-fit md:min-w-fit w-1/2 sm:h-fit h-1/2 rounded-lg text-center sm:font-medium ">
          <FontAwesomeIcon icon={faBriefcase} className="absolute -top-[22px] sm:hidden text-tecruitPrimary text-4.5xl"/>
          <span className="text-tight md:text-5xl">{currentCategory?.totalJobs}</span>
        </div>
        
      </div>
      <div
        className={`flex-grow sm:w-[94vw] h-full md:h-[80%] flex sm:justify-center justify-evenly items-center py-2 sm:py-4 bg-tecruitSecondary sm:rounded-sm rounded-lg`}
        style={{ color: txt }}
      >
        <div className="flex flex-col justify-center items-center w-1/2">
          <h1
            className="text-4.5xl sm:text-2.5xl md:text-3xl truncate text-center text-black min-w-full font-extralight"
          >
            {currentCategory?.title}
          </h1>
          <p className="block mt-2 mb-1 text-sm text-tecruitPrimary">Jobs In</p>
          {country === "Norway" && (
            <p
              className="text-lg  px-4 py-2 font-bold rounded-sm shadow-none"
              style={{ backgroundColor: bgc }}
            >
              <span className="text-white">{country.slice(0, 3)}</span>
              <span style={{ color: txt }}>{country.slice(3, 6)}</span>
            </p>
          )}

          {country !== "Norway" && (
            <p
              className="text-lg px-4 py-2 font-bold rounded-sm shadow-none"
              style={{ backgroundColor: bgc, color: txt }}
            >
              {country}
            </p>
          )}
        </div>
        <FileUploadAndPdf
          screen="all-home"
          children={<ApplyNowArrow customstyles={customstyles} />}
        />
      </div>
    </div>
  );
};

export default CategoryStatsSlider;
