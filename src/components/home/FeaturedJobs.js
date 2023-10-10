import React, { useState, useEffect } from "react";
import featuredJob from "../../data/featuredJobs";

const FeaturedJobs = () => {
  const [featuredJobs, setFeaturedJobs] = useState(featuredJob);

  return (
    <section className="py-12 flex justify-center items-center bg-gray-200">
      <div className="container mx-auto sm:px-4 w-4/5 sm:w-full mt-20 sm:mt-32">
        <h2 className="text-2xl font-semibold mb-6">
          Featured Job Listings
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-1 gap-6">
          {featuredJobs?.map((job) => (
            <div
              key={job.id}
              className="bg-card shadow-lg rounded-lg p-4 relative h-60"
            >
              <h3 className="text-xl font-semibold mb-2 text-blue-600">
                {job.title}
              </h3> 
              <div className="absolute inset-0 flex flex-col justify-center items-center text-blue-400">
                <p className="mb-2">{job.companyName}</p>
                <p className="mb-2">{job.city}</p>
              </div>
              <a
                href={job.companyWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-3 bottom-3 block bg-blue-600 hover:bg-blue-700 text-white text-center py-1 px-2 rounded-md transition duration-300 w-fit"
              >
                Apply Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
