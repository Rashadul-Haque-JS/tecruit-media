import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import slides from "../../data/heroImages.json";
import { Link } from "react-router-dom";
import SearchComponent from "./SearchComponent";

export default function Carousel() {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  return (
    <div className="relative h-[100vh] w-full md:h-[80vh] sm:h-[100vh]">
      <div className="w-full h-full relative">
      {/* <div className="absolute inset-0 bg-black opacity-20"></div> */}
        <img
          src={slides[curr].src}
          alt={slides[curr].alt}
          className="w-full h-full cursor-pointer object-cover"
          onClick={next}
        />
        <div className="flex justify-center items-center absolute right-0 left-0 bottom-0 w-full ">
          <SearchComponent />
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="p-1 rounded-full shadow bg-gray-900 text-gray-300 hover:bg-white"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full shadow bg-gray-900 text-gray-300 hover:bg-white"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="absolute bottom-[224px] right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`
                transition-all w-2 h-2 bg-white rounded-full
                ${curr === i ? "p-1" : "bg-opacity-50"}
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
