import React from "react";
import Carousel from "../components/home/Carousel";
import FeaturedJobs from "../components/home/FeaturedJobs";
import SmartCard from "../components/home/SmartCard";
import smartCardData from "../data/mock/smartCard";
import LearningsCard from "../components/home/Learnings";
import mockTechArticles from "../data/mock/articles";
import TechArticleCard from "../components/home/TechArticleCard";
import SubHeadline from "../components/home/SubHeader";
import AppStateCard from "../components/home/AppStateCard";
import appStats from "../data/mock/appStats";

const Home = () => {
  return (
    <div className="min-h-screen">
      <div className="pb-10 sm:w-full sm:px-0 h-full flex justify-center items-center bg-cover bg-center relative w-full ">
        <Carousel />
      </div>
      <div className="bg-tecruitSecondary w-full py-4"> 
        <SubHeadline
          title="App Stats"
          color="#000"
          bgColor="tecruitSecondary"
        />
        <div className="grid grid-cols-3 sm:grid-cols-1 gap-6 sm:py-4 py-12 bg-gray-100">
          {appStats.map((stat) => (
            <AppStateCard
              key={stat.id}
              number={stat.number}
              text={stat.text}
            />
          ))}
        </div>
      
      </div>
      <div className="p-2 sm:px-0 flex justify-center items-center bg-tecruitSecondary">
        <div className="sm:px-4 w-full mt-2 sm:mx-0 md:mx-0 mx-10">
          <SubHeadline
            title="Featured Jobs"
            color="#000"
            bgColor="tecruitSecondary"/>
          <FeaturedJobs />
        </div>
      </div>
      <div className=" bg-gray-100 w-full pt-10 pb-20">
        <SubHeadline
          title="Smart Solutions"
          color="#000"
          bgColor="tecruitSecondary"
        />
        <div className="grid grid-cols-3 sm:grid-cols-1 gap-6 sm:gap-16 mx-20 sm:mx-4 md:mx-4 sm:px-4 py-12">
          {smartCardData.map((card) => (
            <SmartCard
              key={card.id}
              title={card.title}
              description={card.description}
              link={card.link}
              buttonText={card.buttonText}
              buttonTextColor={"#279b37"}
              icon={card.icon}
              flipIcon={card.flipIcon}
            />
          ))}
        </div>
      </div>
      <div className="bg-tecruitSecondary w-full py-4 ">
        <SubHeadline
          title="Learnings Path"
          color="#000"
          bgColor="tecruitSecondary"
        />
        <div className=" mx-20 sm:mx-4 md:mx-4 sm:px-4 pb-10">
          <LearningsCard />
        </div>
      </div>
      <div className=" mx-20 sm:mx-0 md:mx-4 sm:px-0 py-10 flex flex-col justify-center items-center">
        <SubHeadline
          title="Tech Articles"
          color="tecruitSecondary"
          bgColor="tecruitSpecial"
        />
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 w-full">
          {mockTechArticles.map((article, index) => (
            <TechArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
