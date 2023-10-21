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
    padding: window.innerWidth < 1023 ? window.innerWidth > 767 ? ".5rem 1rem" : '' : "1rem 1.5rem",
    borderRadius: "10px",
    flexDirection: "column",
    background: "#279b37",
    color: "#ffffff",
    fontWeight: "bolder",
    width: window.innerWidth > 1535 ? window.innerWidth < 1920 ? '120%' : '140%' : '',
    height: window.innerWidth > 1535 ? '80%' : ''
  };

  return (
    <div
      className={`flex sm:flex-col justify-start items-center gap-6 sm:gap-8 category-stats-slider rounded-l-full rounded-r-lg px-2 py-4 sm:px-0 sm:w-full md:w-[84vw] lg:w-[75vw]  h-52 w-[60vw] shadow-shade sm:shadow-0 z-0 text-tecruitSecondary`}

    >
      <div
        className={`w-72 h-72 xl:w-60 xl:h-60 lg:w-60 lg:h-60 md:w-48 md:h-48 sm:w-32 sm:h-32 sm:py-2 rounded-full flex justify-center items-center text-6xl sm:rounded-md sm:text-3xl border-2 border-tecruitSecondary sm:border-none text-tecruitSpecial bg-tecruitSpecial`}
      >
        <div className=" sm:hidden relative flex justify-center items-center flex-col gap-3  bg-tecruitSecondary p-2 sm:w-fit md:min-w-fit w-1/2 h-1/2 rounded-lg text-center ">
          <FontAwesomeIcon icon={faBriefcase} className="absolute -top-[22px] text-tecruitPrimary text-4.5xl" />
          <span className="text-tight md:text-5xl">{currentCategory?.totalJobs}</span>
        </div>
        <div className="hidden sm:flex justify-center items-center gap-2 w-full h-fit text-center font-medium">
          <FontAwesomeIcon icon={faBriefcase} className="text-tecruitPrimary text-3xl" />
          <span className="text-tight text-4xl w-1/2 text-center text-tecruitSecondary">
            {currentCategory?.totalJobs}
          </span>
        </div>

      </div>
      <div
        className={`sm:flex-grow md:flex-grow lg:flex-grow xl:flex-grow w-2/3 sm:w-[94vw] h-full md:h-[80%] 2xl:h-[110%] 3xl:h-[110%] 4xl:h-[110%] flex sm:justify-center justify-evenly items-center py-2 sm:py-4 bg-tecruitSecondary sm:rounded-sm rounded-lg`}
        style={{ color: txt }}
      >
        <div className="flex flex-col justify-center items-center w-1/3">
          <h1
            className="text-5xl xl:text-4.5xl lg:text-4.5xl sm:text-3xl md:text-3xl truncate text-center text-black min-w-full font-extralight"
          >
            {currentCategory?.title}
          </h1>
          <p className="block mt-2 mb-1 text-sm 2xl:text-md 3xl:text-md 4xl:text-md text-tecruitPrimary">Jobs In</p>
          {country === "norway" && (
            <p
              className="text-lg 2xl:text-xl 3xl:text-xl 4xl:text-xl  px-4 py-2 font-bold rounded-sm shadow-none capitalize"
              style={{ backgroundColor: bgc }}
            >
              <span className="text-white">{country.slice(0, 3)}</span>
              <span style={{ color: txt }}>{country.slice(3, 6)}</span>
            </p>
          )}

          {country !== "norway" && (
            <p
              className="text-lg px-4 py-2 font-bold rounded-sm shadow-none capitalize"
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
