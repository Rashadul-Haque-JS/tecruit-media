import React, { useState, useEffect } from "react";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {
  jobList,
  countries,
  cities,
  jobTypes,
  published_date,
  position,
  workTime,
} from "../data/jobs.js";

const JobSearch = () => {
  const [jobs, setJobs] = useState(jobList);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedWorkTime, setSelectedWorkTime] = useState(null);
  const [selectedType, setSelectedType] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDate, setSelectedDate] = useState({
    label: "Newest",
    value: "new",
  });

  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 767 ? true : false
  );

  const [currentView, setCurrentView] = useState(
    isMobile ? null : jobs && jobs[0]
  );

  // Declare filteredJobs state variable
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const filteredJobs = jobList.filter(
      (job) => job.last_date > new Date().toISOString().slice(0, 10)
    );
    setJobs(filteredJobs);
    // Set filteredJobs initially
    setFilteredJobs(filteredJobs);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentView(null);
  };

  const handleTypeChange = (selectedOptions) => {
    setSelectedType(selectedOptions);
    setCurrentView(null);
  };

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setSelectedCity(null);
    setCurrentView(null);
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    setCurrentView(null);
  };

  const handlePublishedDate = (selectedOption) => {
    setSelectedDate(selectedOption);
    setCurrentView(filteredJobs[0]);
  };

  const handleCurrentView = (job) => {
    setCurrentView(job);
  };

  const handleCPositionChange = (selectedOption) => {
    setSelectedPosition(selectedOption);
    setCurrentView(null);
  };
  const handleCWTChange = (selectedOption) => {
    setSelectedWorkTime(selectedOption);
    setCurrentView(null);
  };

  const handleSaveJob = (jobId) => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    if (!savedJobs.includes(jobId)) {
      localStorage.setItem("savedJobs", JSON.stringify([...savedJobs, jobId]));
    }

    setSavedJobs([...savedJobs, jobId]);
  };

  const handleUnSaveJob = (jobId) => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    const newSavedJobs = savedJobs.filter((job) => job !== jobId);
    localStorage.setItem("savedJobs", JSON.stringify(newSavedJobs));
    setSavedJobs(newSavedJobs);
  };

  const clearFilters = () => {
    setSelectedType([]);
    setSelectedCountry(null);
    setSelectedCity(null);
    setSelectedPosition(null);
    setSelectedWorkTime(null);
    setCurrentView(isMobile ? null : jobs && jobs[0]);
  };

  const handleViewSaveJobs = () => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    const newFilteredJobs = jobs?.filter((job) =>
      savedJobs.includes(job.jobId)
    );
    setFilteredJobs(newFilteredJobs);
    setCurrentView(isMobile ? null : newFilteredJobs && newFilteredJobs[0]);
  };

  useEffect(() => {
    if (selectedDate.value === "new") {
      setJobs((jobs) =>
        jobs
          .slice()
          .sort((a, b) => new Date(b.published_on) - new Date(a.published_on))
      );
    } else {
      setJobs((jobs) =>
        jobs
          .slice()
          .sort((a, b) => new Date(a.published_on) - new Date(b.published_on))
      );
    }
  }, [selectedDate]);

  // Update filteredJobs after sorting jobs
  useEffect(() => {
    const newFilteredJobs = jobs?.filter(
      (job) =>
        job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!selectedPosition || job.position === selectedPosition.value) &&
        (!selectedWorkTime || job.workTime === selectedWorkTime.value) &&
        (!selectedType.length ||
          selectedType.every((type) => job.type.includes(type.value))) &&
        (!selectedCountry || job.country === selectedCountry.value) &&
        (!selectedCity || job.city === selectedCity.value)
    );
    setFilteredJobs(newFilteredJobs);
  }, [
    searchTerm,
    selectedPosition,
    selectedType,
    selectedCountry,
    selectedCity,
    selectedWorkTime,
    jobs,
  ]);

  useEffect(() => {
    setSavedJobs(JSON.parse(localStorage.getItem("savedJobs")) || []);
  }, []);

  return (
    <div className="relative bg-black">
      <div className="w-full text-white">
        <h1 className="text-3xl font-semibold mb-2 text-center pt-8">
          Find Your Dream Job
        </h1>

        <div className="flex justify-center items-center pb-3 text-center hover:text-blue-400">
          <a
            href="#mySavedJobs"
            onClick={handleViewSaveJobs}
            className={`pb-3 text-center hover:text-blue-400 pr-2 w-fit cursor-pointer  ${
              savedJobs?.length > 0 ? "text-gray-400" : "text-gray-500"
            }`}
            style={{ pointerEvents: savedJobs?.length > 0 ? "auto" : "none" }}
          >
            {savedJobs?.length > 0 ? (
              <FontAwesomeIcon icon={faEye} className="pr-2" />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} className="pr-2" />
            )}
            Saved Job-{savedJobs?.length}
          </a>
        </div>
      </div>
      <div className="px-10 sm:px-4 bg-white sm:mx-4 mx-10 py-12">
        <div className="flex justify-center items-center pb-8">
          <div className="relative flex items-center sm:w-full w-2/3 h-12 rounded-lg overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-300 mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              className="h-full w-full outline-none text-sm text-gray-700 pr-2 shadow-inner px-4 rounded-full border"
              type="text"
              id="search"
              placeholder="Search by job title ..."
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="flex justify-center items-center flex-wrap sm:gap-4 gap-2 mb-4 border-b border-gray-200 pb-6">
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
                  value: city.value,
                  label: city.label,
                }))}
              value={selectedCity}
              onChange={handleCityChange}
              placeholder="Search by city"
              className="w-fit sm:w-full"
            />
          )}
          <Select
            options={jobTypes}
            isMulti
            value={selectedType}
            onChange={handleTypeChange}
            placeholder="Search by type(s)"
            className="w-fit sm:w-full"
          />

          <Select
            options={position}
            value={selectedPosition}
            onChange={handleCPositionChange}
            placeholder="Search by position"
            className="w-fit sm:w-full"
          />
          <Select
            options={workTime}
            value={selectedWorkTime}
            onChange={handleCWTChange}
            placeholder="Search by work time"
            className="w-fit sm:w-full"
          />

          <Select
            options={published_date}
            value={selectedDate}
            onChange={handlePublishedDate}
            className="w-fit sm:w-full"
          />
          <button
            onClick={clearFilters}
            className="px-4 py-[6px] bg-[#db0045] hover:bg-pink-700 text-white rounded-lg"
          >
            Clear Filters
          </button>
        </div>
        <div className="flex justify-start gap-4">
          <ul
            className={`${
              filteredJobs.length === 0 ? "w-full" : "w-1/3"
            } sm:w-full min-h-screen max-h-screen overflow-y-auto`}
          >
            {filteredJobs.length === 0 && (
              <p className="text-center w-full font-semibold py-4">
                No Job Found
              </p>
            )}

            {filteredJobs?.map((job) => (
              <div
                id="mySavedJobs"
                key={job.jobId}
                className="border p-4 my-2 rounded-lg"
                style={{
                  backgroundColor:
                    currentView?.jobId === job.jobId ? "#E5E7EB" : "",
                }}
              >
                <li key={job.jobId}>
                  <h2 className="text-xl font-semibold mb-2 text-[#db0045]">
                    {job.jobTitle}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    <span className="capitalize">{currentView.company}</span>,{" "}
                    <span className="capitalize">{currentView.city}</span>,{" "}
                    <span className="capitalize">{currentView.country}</span>
                  </p>
                  <p className="text-gray-500">
                    <span className="pr-1">{job.category}</span>■
                    {job.type?.map((t) => (
                      <span className="px-1" key={uuidv4()}>
                        {t}
                      </span>
                    ))}
                  </p>
                  <p className="text-gray-500">
                    <span>{job.position}</span> ■
                    <span className="px-1">{job.workTime} time</span>
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Published on: {job.published_on}
                    <span className="block">Last date: {job.last_date}</span>
                  </p>
                </li>
                <div className="flex justify-start items-center gap-2 pt-4 text-sm">
                  <span
                    className="bg-black hover:bg-gray-700 cursor-pointer text-white border px-4 py-1 rounded"
                    onClick={() => handleCurrentView(job)}
                  >
                    Details
                  </span>
                  {savedJobs.includes(job.jobId) ? (
                    <button
                      className="px-4 bg-white hover:bg-gray-100 py-1 rounded border cursor-pointer"
                      onClick={() => handleUnSaveJob(job.jobId)}
                    >
                      Unsave
                    </button>
                  ) : (
                    <button
                      className="px-4 bg-white hover:bg-gray-100 py-1 rounded border cursor-pointer"
                      onClick={() => handleSaveJob(job.jobId)}
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
            ))}
          </ul>

          {currentView && (
            <div className="py-4 rounded-lg sm:hidden bg-white border w-full my-2 px-16 max-h-screen overflow-auto">
              <h2 className="pb-3 text-xl">About This Job</h2>
              <h2 className="text-xl font-semibold mb-2 text-[#db0045]">
                {currentView.jobTitle}
              </h2>
              <p className="text-gray-600 pt-1">
                <span className="capitalize">{currentView.company}</span>,{" "}
                <span className="capitalize">{currentView.city}</span>,{" "}
                <span className="capitalize">{currentView.country}</span>{" "}
              </p>
              <p className="text-gray-500 pb-1">
                <span className="pr-1 capitalize">
                  {currentView.category} Job
                </span>
                ■
                {currentView.type?.map((t) => (
                  <span className="px-1" key={uuidv4()}>
                    {t}
                  </span>
                ))}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Published on: {currentView.published_on}
                <br />
                Last date: {currentView.last_date}
              </p>
              {/* Display apply ui if application_url provided */}
              {currentView.application_url && (
                <p className="text-white  bg-black hover:bg-gray-700 w-fit px-4 py-2 cursor-pointer rounded-md my-4">
                  <a
                    href={currentView.application_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Apply Now
                  </a>
                </p>
              )}
              {/* Display email application option*/}
              {currentView.email_applications && (
                <p className=" w-fit py-2 my-1 text-black">
                  Send application to:{" "}
                  <a
                    href={`mailto:${currentView.email_to_applications}`}
                    className=" text-blue-400"
                  >
                    {currentView.email_to_applications}
                  </a>
                </p>
              )}
              <p
                className={`${
                  currentView.application_url ||
                  currentView.email_to_applications
                    ? "pt-1"
                    : "pt-4"
                }`}
              >
                Description:
              </p>
              <p className="text-gray-500 py-2">{currentView.description}</p>
            </div>
          )}
          {currentView && (
            <div className="p-4 hidden sm:block fixed inset-0 border-t bg-white border">
              <h2 className="text-2xl pt-2 pb-1 border-b border-gray-200">
                <span className="logo font-semibold ">Tecruit</span>{" "}
                <span className="text-xs px-2">Presents</span>
              </h2>
              <div className="flex justify-between items-center text-xl my-6">
                <h2>About This Job</h2>
                <span
                  className="px-2 font-damion"
                  onClick={() => setCurrentView(null)}
                >
                  X
                </span>
              </div>
              <h2 className="text-xl font-semibold mb-2 text-[#db0045]">
                {" "}
                {currentView.jobTitle}
              </h2>
              <p className="text-gray-600 pt-1">
                <span className="capitalize">{currentView.company}</span>,{" "}
                <span className="capitalize">{currentView.city}</span>,{" "}
                <span className="capitalize">{currentView.country}</span>
              </p>
              <p className="text-gray-500 pb-1">
                <span className="pr-1 capitalize">
                  {currentView.category} Job
                </span>
                ■
                {currentView.type?.map((t) => (
                  <span className="px-1" key={uuidv4()}>
                    {t}
                  </span>
                ))}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Published on: {currentView.published_on}
                <br />
                Last date: {currentView.last_date}
              </p>
              {/* Display apply ui if application_url provided */}
              {currentView.application_url && (
                <p className="text-white  bg-black hover:bg-gray-700 w-fit px-4 py-2 rounded-md my-4">
                  <a
                    href={currentView.application_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Apply Now
                  </a>
                </p>
              )}
              {/* Display email application option*/}
              {currentView.email_applications && (
                <p className=" w-fit py-2 my-1 text-black">
                  Send application to:{" "}
                  <a
                    href={`mailto:${currentView.email_to_applications}`}
                    className=" text-blue-400"
                  >
                    {currentView.email_to_applications}
                  </a>
                </p>
              )}
              <p
                className={`${
                  currentView.application_url ||
                  currentView.email_to_applications
                    ? "pt-1"
                    : "pt-4"
                }`}
              >
                Description:
              </p>
              <p className="text-gray-500 py-2">{currentView.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
