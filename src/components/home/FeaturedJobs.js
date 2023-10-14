import React from "react";
import featuredJob from "../../data/mock/featuredJobs";

const FeaturedJobs = () => {
  

  return (
    <div className="p-2 sm:px-0 flex justify-center items-center bg-tecruitSecondary">
      <div className="sm:px-4 w-full mt-8 sm:mt-8 sm:mx-0 md:mx-0 mx-10">
        <h2 className="text-2xl font-semibold mb-10 text-center">Featured Job Listings</h2>
        <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-6 sm:h-96 md:h-[400px] overflow-y-auto">
          {featuredJob?.map((job) => (
            <div
              key={job.id}
              className="bg-card bg-tecruitSpecial shadow-lg rounded-lg p-4 relative h-60 "
            >
              <div className="font-semibold mb-2 text-tecruitSecondary">
                <p className="mb-2">{job.companyName}</p>
                <p className="mb-2">{job.city}</p>
              </div>
              <h3 className="text-3xl font-bold absolute inset-0 flex justify-center items-center text-htpink">
                {job.title}
              </h3>

              <a
                href={job.companyWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-3 bottom-3 block bg-gray-700 text-tecruitSecondary text-center py-1 px-2 rounded-md transition duration-300 w-fit"
              >
                Apply Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedJobs;
