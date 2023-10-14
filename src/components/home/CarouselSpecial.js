import React from "react";
const CarouselSpecial = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 z-0 bg-tecruitSpecial opacity-60 overflow-hidden "></div>
      <div className="relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
              <div className="py-6 lg:py-12">
                <h2 className="text-2xl lg:text-3xl xl:text-4xl font-semibold leading-tight text-white">
                  Find the best <span className="text-tecruitRedish">IT</span>{" "}
                  jobs &amp; internships
                </h2>
                <p
                  className="text-lg lg:text-xl xl:text-2xl text"
                  style={{ color: "#fff" }}
                >
                  Tecruit is the best place to find and list remote jobs
                  available in the most innovative companies around the <span className="text-tecruitRedish">Nordic</span> countries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselSpecial;
