import React, { useState, useEffect } from "react";
import featuredJob from "../../data/featuredJobs";

const FeaturedJobs = () => {
  const [featuredJobs, setFeaturedJobs] = useState(featuredJob);

  return (
    <section className="py-12 flex justify-center items-center bg-white">
      <div className="container mx-auto sm:px-4 w-5/6 sm:w-full mt-20 sm:mt-32">
        <h2 className="text-2xl font-semibold mb-6">Featured Job Listings</h2>
        <div className="grid grid-cols-3 sm:grid-cols-1 gap-6">
          {featuredJobs?.map((job) => (
            <div
              key={job.id}
              className="bg-card bg-gray-800 shadow-lg rounded-lg p-4 relative h-60"
            >
              <div className="font-semibold mb-2 text-blue-600">
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
