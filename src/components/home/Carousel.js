import React, { useEffect, useState } from "react";
import slides from "../../data/static/heroImages";
import SearchComponent from "./SearchComponent";
import CarouselSpecial from "./CarouselSpecial";
import SubCategoryStats from "./SubCategoryStats.js";
import subCategoryData from "../../data/mock/subCategory";
import { useDispatch } from "react-redux";
import { addLocation } from "../../store/features/commonState";
import { ChevronRight, ChevronLeft } from "react-feather";
import ApplyNowArrow from "./CallToAction";
import FileUploadPdf from "../common/FileUploaderPdf";

const Carousel = () => {
  const [curr, setCurr] = useState(0);
  const [iconSize, setIconSize] = useState(60);
  const [strokeWidth, setStrokeWidth] = useState(0.5);
  const dispatch = useDispatch();

  const prev = () => {
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
    const alt = slides[curr === 0 ? slides.length - 1 : curr - 1].alt;
    dispatch(addLocation(alt));
  };

  const next = () => {
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
    const alt = slides[curr === slides.length - 1 ? 0 : curr + 1].alt;
    dispatch(addLocation(alt));
  };

  useEffect(() => {
    let newSize, newStrokeWidth;
  
    if (window.innerWidth < 767) {
      newSize = 60;
      newStrokeWidth = 0.5;
    } else if (window.innerWidth < 1023) {
      newSize = 30;
      newStrokeWidth = 2;
    } else {
      newSize = 80;
      newStrokeWidth = 0.5;
    }
  
    setIconSize(newSize);
    setStrokeWidth(newStrokeWidth);
  }, []);

  const customstylesSmall = {
    padding: ".8rem 2rem",
    borderRadius: "30px"
  };



  return (
    <div className="relative w-full sm:h-[120vh] lg:h-[90vh] xl:h-[100vh] md:h-[80vh] h-[70vh]">
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
        <div className="absolute inset-0 sm:w-full sm:left-0 sm:right-0 sm:top-[6%] sm:bottom-[20%] flex items-center justify-between px-0 z-10">
          <button
            onClick={prev}
            className="px-0 bg-none text-tecruitPrimary sm:text-base text-lg"
            disabled={curr === 0}
            style={{
              transition: "transform 0.3s ease",
              cursor: curr === 0 ? "not-allowed" : "pointer",
            }}
          >
            <ChevronLeft
              size={iconSize}
              strokeWidth={strokeWidth}
              className="text-tecruitPrimary inline-block "
            />
            <span>
              {curr !== 0 && (
                <span className="p-0 inline-block">
                  {slides[curr - 1].alt.slice(0, 2).toLowerCase()}
                </span>
              )}
            </span>
          </button>
          <button
            onClick={next}
            className="px-0 bg-none text-tecruitPrimary sm:text-base text-lg"
            disabled={curr === slides.length - 1}
            style={{
              transition: "transform 0.3s ease",
              cursor: curr === slides.length - 1 ? "not-allowed" : "pointer",
            }}
          >
            <span>
              {curr !== slides.length - 1 && (
                <span className="p-0 inline-block">
                  {slides[curr + 1].alt.slice(0, 2).toLowerCase()}
                </span>
              )}
              <ChevronRight
                size={iconSize}
                strokeWidth={strokeWidth}
                className="text-tecruitPrimary inline-block"
              />
            </span>
          </button>
        </div>
      </div>
      <div className="absolute bottom-[220px] md:bottom-[192px] sm:bottom-[310px] right-0 left-0">
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
      <SubCategoryStats
        categories={subCategoryData}
        country={slides[curr].alt}
      />
      <FileUploadPdf
        screen="sm"
        children={<ApplyNowArrow customstyles={customstylesSmall} />}
      />

      <div className="flex justify-center items-center absolute right-0 left-0 bottom-0 w-full z-10">
        <SearchComponent />
      </div>
    </div>
  );
};

export default Carousel;
