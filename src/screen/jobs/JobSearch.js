import React, { useState, useEffect } from "react";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { selectStyles, formatDate } from "../../utils/helper.js";
import JobDescription from "../../components/JobDescConvert.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  countries,
  cities,
  jobTypes,
  published_date,
  position,
  workTime,
} from "../../data/mock/jobs.js";
//import { getAllJob } from "../api/api.js";
import PreLoader from "../../components/PreLoader.js";
import { locationLock } from "../../utils/helper.js";
import { getJobsList } from "../../api/api.js";

const JobSearch = () => {
  const [jobs, setJobs] = useState([]);
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

  const [isMobile, setIsMobile] = useState(false);

  const [currentView, setCurrentView] = useState(
    isMobile ? null : jobs && jobs[0]
  );

  const [filteredJobs, setFilteredJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const nordicLocation = useSelector((state) => state.common.location);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobsList();
        setJobs(response.data.jobs);
      } catch (error) {
        if (error.response) {
          console.error('Server responded with an error:', error.response.data);
        } else if (error.request) {
          console.error('No response received. There might be a network issue.');
        } else {
          console.error('Error in setting up the request:', error.message);
        }
      }
    };
    fetchJobs();
  }, []);
  
  
 
  useEffect(() => {
    setLoading(jobs.length > 0 ? false : true);
    if (jobs.length > 0) {
      setCurrentView(
        isMobile ? null : filteredJobs.length > 0 ? filteredJobs[0] : null
      );
    }
  }, [jobs.length, isMobile, filteredJobs]);
  

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
    setCurrentView(isMobile ? null : jobs && jobs[0]);
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

  const handleSaveJob = (_id) => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    if (!savedJobs.includes(_id)) {
      localStorage.setItem("savedJobs", JSON.stringify([...savedJobs, _id]));
    }

    setSavedJobs([...savedJobs, _id]);
  };

  const handleUnSaveJob = (_id) => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    const newSavedJobs = savedJobs.filter((job) => job !== _id);
    localStorage.setItem("savedJobs", JSON.stringify(newSavedJobs));
    setSavedJobs(newSavedJobs);
  };

  const clearFilters = () => {
    setSelectedType([]);
    setSelectedCountry(null);
    setSelectedCity(null);
    setSelectedPosition(null);
    setSelectedWorkTime(null);
    setCurrentView(isMobile ? null : jobs[0]);
    setSearchTerm("");
    navigate(`/${nordicLocation}/jobs`);
    handleLocationLock(nordicLocation);
  };

  const updateParamsFilter = () => {
    setSelectedType([]);
    setSelectedCountry(null);
    setSelectedCity(null);
    setSelectedPosition(null);
    setSelectedWorkTime(null);
  };

  const handleViewSaveJobs = () => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    const newFilteredJobs = jobs?.filter((job) => savedJobs.includes(job._id));
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
    location.search,
  ]);

  useEffect(() => {
    setSavedJobs(JSON.parse(localStorage.getItem("savedJobs")) || []);
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryParam = searchParams.get("query");
    const countryParam = searchParams.get("country");
    const cityParam = searchParams.get("city");

    if (queryParam) {
      setSearchTerm(queryParam);
    }

    if (countryParam) {
      setSelectedCountry(countryParam);
    }

    if (cityParam) {
      setSelectedCity(cityParam);
    }
    updateParamsFilter();
  }, [location.search]);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 767 ? true : false);
  }, []);

  const handleLocationLock = (land) => {
    if(land!== 'nordic'){
      const updatedLocation = {
        label: land,
        value: land,
      };
      setSelectedCountry(updatedLocation);
    }else{
      setSelectedCountry(null);
    }
  }

  useEffect(() => {
    handleLocationLock(nordicLocation);
  },[nordicLocation])

  return (
    <div className="relative">
      <div className="w-full text-tecruitSecondary bg-tecruitPrimary">
        <h1 className="text-2xl 2xl:text-4xl 3xl:text-4xl 4xl:text-5xl font-semibold mb-2 text-center pt-8">
          Find Your Dream Job
        </h1>

        <div className="flex justify-center items-center pb-3 text-center hover:text-blue-400">
          <a
            href="#mySavedJobs"
            onClick={handleViewSaveJobs}
            className={`pb-3 text-center hover:text-blue-400 pr-2 w-fit cursor-pointer  ${
              savedJobs?.length > 0 ? "text-tecruitSpecial" : "text-gray-600"
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
      <div className="px-10 sm:px-4 bg-tecruitSecondary sm:mx-4 md:mx-4 mx-10 py-12">
        <div className="flex justify-center items-center pb-8">
          <div className="relative flex items-center sm:w-full w-2/3 h-12 rounded-lg overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-300 mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#279b37"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="none"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              className="h-full w-full outline-none text-sm text-gray-700 pr-2 shadow-inner px-4 sm:px-6 rounded-full border border-tecruitPrimary apps-input"
              type="text"
              id="search"
              placeholder="Search By Job Title, ... Job Category ..."
              onChange={handleSearch}
            />
          </div>
          <div className="px-1">
            {!isFilter && (
              <svg
                className="w-10 h-8 cursor-pointer"
                onClick={() => setIsFilter(!isFilter)}
                viewBox="0 0 24 24"
                fill="none"
              
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                  strokeWidth="none"
                  stroke="#279b37"
                    d="M9 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM6.17 5a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 0 1 0-2h1.17zM15 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2h7.17zM9 17a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2h1.17z"
                    fill="none"
                  ></path>
                </g>
              </svg>
            )}
            {isFilter && (
              <svg
                className="w-8 h-7 cursor-pointer"
                onClick={() => setIsFilter(!isFilter)}
                viewBox="0 0 24 24"
                fill="none"
               
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M15 15L21 21M21 15L15 21M10 21V14.6627C10 14.4182 10 14.2959 9.97237 14.1808C9.94787 14.0787 9.90747 13.9812 9.85264 13.8917C9.7908 13.7908 9.70432 13.7043 9.53137 13.5314L3.46863 7.46863C3.29568 7.29568 3.2092 7.2092 3.14736 7.10828C3.09253 7.01881 3.05213 6.92127 3.02763 6.81923C3 6.70414 3 6.58185 3 6.33726V4.6C3 4.03995 3 3.75992 3.10899 3.54601C3.20487 3.35785 3.35785 3.20487 3.54601 3.10899C3.75992 3 4.03995 3 4.6 3H19.4C19.9601 3 20.2401 3 20.454 3.10899C20.6422 3.20487 20.7951 3.35785 20.891 3.54601C21 3.75992 21 4.03995 21 4.6V6.33726C21 6.58185 21 6.70414 20.9724 6.81923C20.9479 6.92127 20.9075 7.01881 20.8526 7.10828C20.7908 7.2092 20.7043 7.29568 20.5314 7.46863L17 11"
                    stroke="#279b37"
                    strokeWidth="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            )}
          </div>
        </div>
        <div
          className={`mb-4 border-b border-gray-200 ${
            isFilter ? "pb-6" : "pb-3"
          }`}
        >
          {isFilter && (
            <div className="flex justify-center items-center flex-wrap sm:gap-4 gap-2">
              <Select
                options={countries}
                value={selectedCountry}
                onChange={handleCountryChange}
                placeholder="Search by country"
                className="w-fit sm:w-full"
                styles={selectStyles}
                isDisabled={locationLock(nordicLocation,selectedCountry)}

              />
              {selectedCountry && (
                <Select
                  options={cities
                    .find((c) => c.name === selectedCountry.value)
                    ?.mainCities.map((city) => ({
                      value: city.value,
                      label: city.label,
                    }))}
                  value={selectedCity}
                  onChange={handleCityChange}
                  placeholder="Search by city"
                  className="w-fit sm:w-full"
                  styles={selectStyles}
                />
              )}
              <Select
                options={jobTypes}
                isMulti
                value={selectedType}
                onChange={handleTypeChange}
                placeholder="Search by type(s)"
                className="w-fit sm:w-full"
                styles={selectStyles}
              />

              <Select
                options={position}
                value={selectedPosition}
                onChange={handleCPositionChange}
                placeholder="Search by position"
                className="w-fit sm:w-full"
                styles={selectStyles}
              />
              <Select
                options={workTime}
                value={selectedWorkTime}
                onChange={handleCWTChange}
                placeholder="Search by work time"
                className="w-fit sm:w-full"
                styles={selectStyles}
              />

              <Select
                options={published_date}
                value={selectedDate}
                onChange={handlePublishedDate}
                className="w-fit sm:w-full"
                styles={selectStyles}
              />
              <button
                onClick={clearFilters}
                className="px-4 py-[6px] bg-tecruitPrimary hover:bg-green-600 text-tecruitSecondary rounded-lg"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
        <div className="flex justify-start gap-4">
          {loading && <PreLoader />}
          {!loading && (
            <ul
              className={`${
                filteredJobs.length === 0 ? "w-full" : "w-1/3"
              } sm:w-full md:w-4/5 lg:w-4/5 min-h-screen max-h-screen overflow-y-scroll`}
            >
              {filteredJobs.length === 0 && (
                <p className="text-center w-full font-semibold py-4">
                  No Job Found
                </p>
              )}

              {filteredJobs?.map((job) => (
                <div
                  id="mySavedJobs"
                  key={job._id}
                  className="border p-4 my-2 rounded-lg"
                  style={{
                    backgroundColor:
                      currentView?._id === job._id ? "#f3f4f6" : "",
                  }}
                >
                  <li key={job._id}>
                    <h2 className="text-xl font-semibold mb-2 text-tecruitPrimary">
                      {job.jobTitle}
                    </h2>
                    <p className="text-gray-600 mb-2">
                      <span className="capitalize">{job.company}</span>,{" "}
                      <span className="capitalize">{job.city}</span>,{" "}
                      <span className="capitalize">{job.country}</span>
                    </p>
                    <p className="text-gray-500">
                      <span className="pr-1">{job.subCategory}</span>■
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
                      Published on: {formatDate(job.published_on)}
                      <span className="block">
                        Last date: {formatDate(job.last_date)}
                      </span>
                    </p>
                  </li>
                  <div className="flex justify-start items-center gap-2 pt-4 text-sm">
                    <span
                      className="bg-tecruitSpecial hover:bg-gray-700 cursor-pointer text-tecruitSecondary border px-4 py-1 rounded"
                      onClick={() => handleCurrentView(job)}
                    >
                      Details
                    </span>
                    {savedJobs.includes(job._id) ? (
                      <button
                        className="px-4 bg-tecruitSecondary hover:bg-gray-100 py-1 rounded border cursor-pointer"
                        onClick={() => handleUnSaveJob(job._id)}
                      >
                        Unsave
                      </button>
                    ) : (
                      <button
                        className="px-4 bg-tecruitSecondary hover:bg-gray-100 py-1 rounded border cursor-pointer"
                        onClick={() => handleSaveJob(job._id)}
                      >
                        Save
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </ul>
          )}

          {currentView && (
            <div className="py-4 rounded-lg sm:hidden bg-tecruitSecondary border w-full my-2 px-16 md:px-8 lg:px-8 max-h-screen overflow-auto">
              <h2 className="pb-3 text-xl">About This Job</h2>
              <h2 className="text-xl font-semibold mb-2 text-tecruitPrimary">
                {currentView.jobTitle}
              </h2>
              <p className="text-gray-600 pt-1">
                <span className="capitalize">{currentView.company}</span>,{" "}
                <span className="capitalize">{currentView.city}</span>,{" "}
                <span className="capitalize">{currentView.country}</span>{" "}
              </p>
              <p className="text-gray-500 pb-1">
                <span className="pr-1 capitalize">
                  {currentView.subCategory} Job
                </span>
                ■
                {currentView.type?.map((t) => (
                  <span className="px-1" key={uuidv4()}>
                    {t}
                  </span>
                ))}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Published on: {formatDate(currentView.published_on)}
                <span className="block">
                  Last date: {formatDate(currentView.last_date)}
                </span>
              </p>
              {/* Display apply ui if application_url provided */}
              {currentView.application_url && (
                <p className="text-tecruitSecondary  bg-tecruitSpecial hover:bg-gray-700 w-fit px-4 py-2 cursor-pointer rounded-md my-4">
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
              {currentView.email_to_applications && (
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
              <JobDescription description={currentView.description} />
            </div>
          )}
          {currentView && (
            <div className="p-4 hidden sm:block fixed inset-0 border-t bg-tecruitSecondary border overflow-y-auto">
              <h2 className="text-2xl pt-2 pb-1 border-b border-gray-200">
                <span className="logo font-semibold ">Tecruit</span>{" "}
                <span className="text-xs px-2">Presents</span>
              </h2>
              <div className="flex justify-between items-center text-xl my-6 ">
                <h2>About This Job</h2>
                <span
                  className="px-2 font-damion"
                  onClick={() => setCurrentView(null)}
                >
                  X
                </span>
              </div>
              <h2 className="text-xl font-semibold mb-2 text-tecruitPrimary">
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
                  {currentView.subCategory} Job
                </span>
                ■
                {currentView.type?.map((t) => (
                  <span className="px-1" key={uuidv4()}>
                    {t}
                  </span>
                ))}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Published on: {formatDate(currentView.published_on)}
                <span className="block">
                  Last date: {formatDate(currentView.last_date)}
                </span>
              </p>
              {/* Display apply ui if application_url provided */}
              {currentView.application_url && (
                <p className="text-tecruitSecondary  bg-tecruitSpecial hover:bg-gray-700 w-fit px-4 py-2 rounded-md my-4">
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
              {currentView.email_to_applications && (
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
              <JobDescription description={currentView.description} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSearch;

