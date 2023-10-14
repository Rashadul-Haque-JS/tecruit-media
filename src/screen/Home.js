import React from "react";
import Carousel from "../components/home/Carousel";
import FeaturedJobs from "../components/home/FeaturedJobs";
import SmartCard from "../components/home/SmartCard";
import smartCardData from "../data/mock/smartCard";
import LearningsCard from "../components/home/Learnings";


const Home = () => {
  return (
    <div className="min-h-screen">
      <div className="pb-10 sm:w-full sm:px-0 h-full flex justify-center items-center bg-cover bg-center relative w-full ">
        <Carousel />
      </div>
      <FeaturedJobs />
      <div className=" bg-gray-100 w-full pt-10 pb-20">
        <h2 className="text-2xl font-semibold mb-6 text-center">Why Us?</h2>
        <div className="grid grid-cols-3 sm:grid-cols-1 gap-6 sm:gap-16 mx-20 sm:mx-4 md:mx-4 sm:px-4 py-12">
          {smartCardData.map((card) => (
            <SmartCard
              key={card.id}
              title={card.title}
              description={card.description}
              link={card.link}
              buttonText={card.buttonText}
              buttonTextColor={"#279b37"}
            />
          ))}
        </div>
      </div>
      <div className="bg-tecruitSecondary w-full py-4 ">
        <h2 className="text-2xl font-semibold mt-4 mb-2 text-center">Learnings Path</h2>
        <div className=" mx-20 sm:mx-4 md:mx-4 sm:px-4 py-10">
          <LearningsCard />
        </div>
        </div>
    </div>
  );
};

export default Home;
