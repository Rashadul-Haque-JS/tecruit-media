import React from "react";
import Carousel from "../components/home/Carousel";

const Home = () => {
  return (
    <div className="bg-black min-h-screen">
      <div className="bg-black pt-20 sm:w-full sm:px-4 h-full flex justify-center items-center">
        <div className="bg-cover bg-center relative w-4/5 sm:w-full pb-10">
          <Carousel />
        </div>
      </div>
    </div>
  );
};

export default Home;
