import React from "react";
import Carousel from "../components/home/Carousel";
import FeaturedJobs from "../components/home/FeaturedJobs";
import SearchComponent from "../components/home/SearchComponent";

const Home = () => {
  return (
    <div className="bg-black min-h-screen">
      <div className="pt-10 sm:w-full sm:px-2 h-full flex justify-center items-center bg-cover bg-center relative w-full pb-10">
        <Carousel />
      </div>
      <FeaturedJobs />
    </div>
  );
};

export default Home;
