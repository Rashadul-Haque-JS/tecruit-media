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
  const backgroundColor = getNordicColor(country);

  return (
    <div
      className={`flex justify-start items-center gap-6 category-stats-slider sm:hidden rounded-l-full rounded-r-lg px-0 py-4 md:w-[640px] lg:w-[640px] h-52 w-[50vw] shadow-shade`}
    >
      <div className={`w-60 h-60 rounded-full flex justify-center items-center text-7xl border-2`} style={{ backgroundColor }}>
        {currentCategory.totalJobs}
      </div>
      <div className={`flex-grow h-full text-white flex justify-center items-center py-4`} style={{ backgroundColor }}>
        <h1 className="text-4xl font-semibold truncate text-center">
          {currentCategory.title} <span className="block mt-2 text-xl">Jobs In</span>
          <span className="text-lg">{country}</span>
        </h1>
      </div>
    </div>
  );
};

export default CategoryStatsSlider;
