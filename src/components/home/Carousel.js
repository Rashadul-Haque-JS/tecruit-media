import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import slides from "../../data/static/heroImages";
import SearchComponent from "./SearchComponent";
import CarouselSpecial from "./CarouselSpecial";

export default function Carousel() {
  const [curr, setCurr] = useState(0);

  const prev = () => {
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  };

  const next = () => {
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  };

  return (
    <div className="relative h-[100vh] w-full md:h-[80vh] sm:h-[100vh]">
      <div className="w-full h-full relative overflow-x-hidden">
        {slides.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className="w-full h-full cursor-pointer object-cover absolute top-0 left-0 transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(${100 * (index - curr)}%)`,
              filter: "brightness(0.99)",
            }}
          />
        ))}
        <CarouselSpecial />
        <div className="flex justify-center items-center absolute right-0 left-0 bottom-0 w-full">
          <SearchComponent />
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="p-1 rounded-full shadow bg-gray-900 text-gray-300 hover:bg-tecruitSecondary"
          disabled={curr === 0}
          style={{ transition: "transform 0.3s ease",cursor: curr === 0 ? "not-allowed" : "pointer" }}
        >
          <ChevronLeft size={20} className="text-tecruitPrimary" />
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full shadow bg-gray-900 text-gray-300 hover-bg-tecruitSecondary"
          disabled={curr === slides.length - 1}
          style={{ transition: "transform 0.3s ease",cursor: curr === slides.length - 1? "not-allowed" : "pointer"}}
        >
          <ChevronRight size={20} className="text-tecruitPrimary" />
        </button>
      </div>

      <div className="absolute bottom-[220px] md:bottom-[192px] sm:bottom-[328px] right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`
                transition-all w-2 h-2 bg-tecruitSecondary rounded-full
                ${curr === i ? "p-1" : "bg-opacity-50"}
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
