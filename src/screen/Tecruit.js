import React from 'react';

const AboutTecruit = () => {
  return (
    <div className="bg-tecruitSecondary text-[#333]">
      <h2 className="text-2xl 2xl:text-4xl 3xl:text-4xl 4xl:text-5xl font-semibold mb-2 text-center py-8 text-tecruitSecondary bg-tecruitPrimary">
         What is Tecruit?
        </h2>
        <div className='py-8 px-32 sm:px-6 text-lg leading-7'>
        <p >
          Tecruit is your premier destination for finding IT jobs in the Nordic countries. We provide a platform where job seekers can search for the latest job openings, optimize their CVs, and access various development programs to boost their careers.
        </p>
        <p className=" mt-4">
          For companies, Tecruit offers smart recruitment AI tools and the ability to post job openings. Our platform also features tech-related articles and resources to stay updated in the ever-evolving IT industry.
        </p>
        <p className="mt-4">
          Whether you are a job seeker or a company, Tecruit is your one-stop solution for all your IT job needs.
        </p>
        </div>
    </div>
  );
};

export default AboutTecruit;
