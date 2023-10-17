import React, { useState, useEffect } from "react";
import { getNordicColor } from "../../utils/helper";


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

  return (
    <div
      className={`flex sm:flex-col justify-start items-center gap-6 sm:gap-8 category-stats-slider rounded-l-full rounded-r-lg px-2 py-4 sm:px-0 md:w-[640px] lg:w-[640px] sm:w-full h-52 w-[50vw] shadow-shade sm:shadow-0 z-0 text-tecruitSecondary`}
    >
      <div
        className={`w-60 h-60 sm:w-32 sm:h-32 sm:py-2 rounded-full flex justify-center items-center text-6xl sm:text-3xl border-2 bg-tecruitPrimary`}
      >
        {currentCategory.totalJobs}
      </div>
      <div
        className={`flex-grow sm:w-full h-full flex flex-col justify-center items-center py-2 sm:py-4 bg-tecruitSecondary rounded-sm`}
        style={{ color: txt }}
      >
        <h1 className="text-4xl sm:text-2xl font-thin truncate text-center text-black">
          {currentCategory.title}
        </h1>
        <p className="block mt-2 mb-1 text-sm text-tecruitPrimary">Jobs In</p>
        {country === "Norway" && (
          <p
            className="text-lg  px-4 py-2 font-bold "
            style={{ backgroundColor: bgc }}
          >
            <span className="text-white">{country.slice(0, 3)}</span>
            <span style={{ color: txt }}>{country.slice(3, 6)}</span>
          </p>
        )}

        {country !== "Norway" && (
          <p
            className="text-lg  px-4 py-2 font-bold "
            style={{ backgroundColor: bgc, color: txt }}
          >
            {country}
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryStatsSlider;
