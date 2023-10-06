import React, { useState, useEffect } from "react";
import Select from "react-select";
import jobList from "../data/jobs.js";

const jobCategories = [
  { value: "it", label: "Data/IT" },
  { value: "finance", label: "Finance" },
  { value: "marketing", label: "Marketing" },
  // Add more job categories here
];

const jobTypes = [
  { value: "onsite", label: "Onsite" },
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
];

const countries = [
  { countryId: 1, value: "sweden", label: "Sweden" },
  { countryId: 2, value: "denmark", label: "Denmark" },
  { countryId: 3, value: "norway", label: "Norway" },
  { countryId: 4, value: "finland", label: "Finland" },
];

const cities = [
  { countryId: 1, mainCities: ["Stockholm", "Gothenburg", "Malmö", "Uppsala"] },
  { countryId: 2, mainCities: ["Copenhagen", "Aarhus", "Odense", "Aalborg"] },
  { countryId: 3, mainCities: ["Oslo", "Bergen", "Trondheim", "Stavanger"] },
  { countryId: 4, mainCities: ["Helsinki", "Espoo", "Tampere", "Vantaa"] },
];

const JobSearch = () => {
  const [jobs, setJobs] = useState(jobList);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [currentView, setCurrentView] = useState(jobs[0]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentView(null); // Reset the current view when searching
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
    setCurrentView(null); // Reset the current view when changing category
  };

  const handleTypeChange = (selectedOption) => {
    setSelectedType(selectedOption);
    setCurrentView(null); // Reset the current view when changing job type
  };

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setSelectedCity(null); // Reset the selected city when changing country
    setCurrentView(null); // Reset the current view when changing country
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    setCurrentView(null); // Reset the current view when changing city
  };

  const handleCurrentView = (job) => {
    setCurrentView(job);
  };

  useEffect(() => {
    const jobs = jobList.filter((job) => job.last_date > new Date().toISOString().slice(0, 10));
    setJobs(jobs);
  },[])

  // Filtering logic for jobs based on search term, category, type, country, and city
  const filteredJobs = jobs?.filter(
    (job) =>
      job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedCategory || job.category === selectedCategory.value) &&
      (!selectedType || job.type.includes(selectedType.value)) &&
      (!selectedCountry || job.country === selectedCountry.value) &&
      (!selectedCity || job.city === selectedCity.value)
  );

  return (
    <div className="relative bg-black">
      <div className="w-full text-white">
        <h1 className="text-3xl font-semibold mb-6 text-center py-8">
          Find Your Dream Job
        </h1>
      </div>
      <div className="px-10 sm:px-4 bg-white sm:mx-4 mx-10 py-12 ">
        <div className="flex justify-center items-center pb-8">
          <input
            type="text"
            placeholder="Search by job title"
            className="w-1/2 sm:w-full border border-gray-400 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="flex justify-center items-center flex-wrap gap-4 mb-4 border-b border-gray-200 pb-6">
          <Select
            options={jobCategories}
            value={selectedCategory}
            onChange={handleCategoryChange}
            placeholder="Search by category"
            className="w-fit sm:w-full"
          />
          <Select
            options={jobTypes}
            isMulti
            value={selectedType}
            onChange={handleTypeChange}
            placeholder="Search by type(s)"
            className="w-fit sm:w-full"
          />

          <Select
            options={countries}
            value={selectedCountry}
            onChange={handleCountryChange}
            placeholder="Search by country"
            className="w-fit sm:w-full"
          />
          {selectedCountry && (
            <Select
              options={cities
                .find((c) => c.countryId === selectedCountry.countryId)
                ?.mainCities.map((city) => ({
                  value: city,
                  label: city,
                }))}
              value={selectedCity}
              onChange={handleCityChange}
              placeholder="Search by city"
              className="w-fit sm:w-full"
            />
          )}
        </div>

        <div className="flex justify-start gap-4">
          <ul className={`${filteredJobs.length === 0 ? 'w-full':'w-fit'} sm:w-full min-h-screen`}>
            {filteredJobs.length === 0 && (<p className="text-center w-full font-semibold py-4">No Job Found</p>)}
            {filteredJobs?.map((job) => (
              <li
                key={job.jobId}
                className="border p-4 my-2 rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => handleCurrentView(job)} style={{ backgroundColor: currentView?.jobId === job.jobId ? '#e9fce9' : '' }}
              >
                <h2 className="text-xl font-semibold mb-2">{job.jobTitle}</h2>
                <p className="text-gray-600 mb-2">
                  {job.company}, {job.city}, {job.country}
                </p>
                <p className="text-gray-500">
                  <span className="px-1">{job.category}</span>■
                  {job.type.map((t) => (
                    <span className="px-1">{t}</span>
                  ))}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Published on: {job.published_on}
                  <span className="block">Last date: {job.last_date}</span>
                </p>
              </li>
            ))}
          </ul>
          {currentView && (
            <div className="py-4 rounded-lg sm:hidden bg-[#e9fce9] w-full my-2 px-16">
              <h2 className="pb-6 text-2xl"> About This Job</h2>
              <h3 className="text-xl font-semibold mb-2">
                {currentView.jobTitle}
              </h3>
              <p className="text-gray-600 pt-1">
                {currentView.company}, {currentView.city}, {currentView.country}
              </p>
              <p className="text-gray-500 pb-1">
                <span className="pr-1">{currentView.category} Job</span>■
                {currentView.type.map((t) => (
                  <span className="px-1">{t}</span>
                ))}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Published on: {currentView.published_on}
                <br />
                Last date: {currentView.last_date}
              </p>
              <p className="text-gray-500 py-4">{currentView.description}</p>
            </div>
          )}
          {currentView && (
            <div className="p-4 rounded-lg hidden sm:block absolute top-[-4px] w-full left-0 bottom-0 border-t bg-[#e9fce9]">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold mb-2">
                  {currentView.jobTitle}
                </h2>
                <span
                  className="text-xl font-semibold"
                  onClick={() => setCurrentView(null)}
                >
                  X
                </span>
              </div>
              <p className="text-gray-600 mb-2">
                {currentView.company}, {currentView.city}, {currentView.country}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Published on: {currentView.published_on}
                <br />
                Last date: {currentView.last_date}
              </p>
              <p className="text-gray-500">
                <span className="px-1">{currentView.category}</span>■
                {currentView.type.map((t) => (
                  <span className="px-1">{t}</span>
                ))}
              </p>
              <p className="text-gray-500 py-6">{currentView.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
