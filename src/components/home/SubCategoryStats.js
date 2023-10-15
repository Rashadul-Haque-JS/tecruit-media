import React, { useState, useEffect } from "react";

const CategoryStatsSlider = ({ categories }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [categories]);

  const currentCategory = categories[currentIndex];

  return (
    <div
      className={` flex justify-start items-center gap-6 category-stats-slider sm:hidden bg-tecruitSecondary rounded-l-full rounded-r-lg px-0 py-4 md:w-[640px] lg:w-[640px] h-52 w-[50vw] border-l-8  ${bgDisplay(
        currentCategory.totalJobs,
        "border"
      )} shadow-shade`}
    >
     
        <div className="w-60 h-60  bg-tecruitSpecial rounded-full flex justify-center items-center text-tecruitSecondary text-7xl">
          {currentCategory.totalJobs}
        </div>
        <div
          className={`flex-grow h-full text-white flex justify-center items-center py-4  ${bgDisplay(
            currentCategory.totalJobs,
            ""
          )}`}
        >
          <h1 className="text-4xl font-semibold truncate">
            {currentCategory.title} <span className="block mt-2 text-center text-xl">Jobs</span>
          </h1>
        </div>
     
    </div>
  );
};

export default CategoryStatsSlider;

const bgDisplay = (totalJobs, part) => {
  if (totalJobs < 60) {
    if (part === "border") {
      return "border-l-tecruitRedish";
    } else {
      return "bg-tecruitRedish";
    }
  } else if (totalJobs < 90) {
    if (part === "border") {
      return "border-l-yellow-400";
    } else {
      return "bg-yellow-400";
    }
  } else {
    if (part === "border") {
      return "border-l-tecruitPrimary";
    } else {
      return "bg-tecruitPrimary";
    }
  }
};
