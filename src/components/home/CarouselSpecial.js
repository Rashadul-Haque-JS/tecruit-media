import React from "react";
const CarouselSpecial = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 z-0 bg-tecruitSpecial opacity-60 overflow-hidden "></div>
      <div className="relative z-10">
        <div className="px-8 sm:px-4 4xl:px-16 4xl:py-4 ">
          <div className="w-1/2 sm:w-full">
            <div className="sm:pt-4 sm:pb-6 pt-5 pb-3 lg:py-12 text-tecruitSecondary">
              <h2 className="text-2.5xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl 4xl:text-6xl font-bold leading-tigh sm:leading-8 capitalize">
                Find the best <span className="text-tecruitPrimary">IT</span>{" "}
                jobs &amp; <span className="block">internships <span className="hidden sm:inline-block">arround the</span> <span className="text-tecruitPrimary hidden sm:block">Nordic <span className="text-tecruitSecondary">countries</span></span></span>{" "} 
              </h2>
              <p className="text-lg lg:text-xl xl:text-xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl mt-2 leading-4 font-thin sm:hidden" style={{lineHeight:'1.25'}}>
                Tecruit is the best place to find and list remote jobs
                <span className="block sm:inline md:inline">
                  available in the most innovative companies around
                </span>{" "}
                <span className="block sm:inline md:inline">
                  the <span className="text-tecruitPrimary">Nordic </span>
                  countries.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselSpecial;
