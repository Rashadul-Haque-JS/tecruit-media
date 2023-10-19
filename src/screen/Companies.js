import React, { useState, useEffect } from "react";
import Select from "react-select"; // Import the react-select component
import companies from "../data/mock/companies";
import CompanyCard from "../components/companies/CompanyCard";
import { selectStyles } from "../utils/helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { locationLock } from "../utils/helper";

const CompanyList = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRotated, setIsRotated] = useState(false);
  const { location } = useSelector((state) => state.common);
  

  // Define options for the view dropdown
  const viewOptions = [
    { value: 10, label: "View 10" },
    { value: 20, label: "View 20" },
    { value: 50, label: "View 50" },
  ];

  // Filter companies by selected country and search query
  const filteredCompanies = companies.filter((company) => {
    const byCountry =
      !selectedCountry || company.country === selectedCountry.value;
    const byName = company.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return byCountry && byName;
  });

  // Apply pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Handle search input change
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const clearFilters = () => {
    setSelectedCountry(null);
    setSearchQuery(""); 
    setPageSize(10);
    handleCountryLock(location);
  };

  useEffect(() => {
    if (isRotated) {
      setTimeout(() => {
        setIsRotated(false);
      }, 1000);
    }
  }, [isRotated]);

  const handleCountryLock = (land) => {
    if (land) {
      setSelectedCountry({ value: land, label: land });
    }
    if(land === 'Nordic'){
      setSelectedCountry(null);
    }
  }

  useEffect(() => {
    handleCountryLock(location);
  }, [location]);

  return (
    <div className="sm:px-0 pb-10 min-h-screen">
      <div className="flex flex-col pb-6 border-b border-gray-200">
        <h1 className="text-2xl 2xl:text-4xl 3xl:text-4xl 4xl:text-5xl font-semibold mb-2 text-center py-8 text-tecruitSecondary bg-tecruitPrimary">
          IT-Companies List
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-4 pt-6 sm:pt-4 pb-2">
          <input
            className="w-1/3 sm:w-5/6 outline-none text-sm text-gray-700 pr-2 shadow-inner p-3 rounded-full border border-tecruitPrimary apps-input"
            type="text"
            id="search"
            placeholder="Search by company name ..."
            onChange={handleSearch}
            value={searchQuery}
          />
          <div className="flex justify-center items-center gap-3">
            <Select
              options={[
                { value: "Sweden", label: "Sweden" },
                { value: "Denmark", label: "Denmark" },
                { value: "Norway", label: "Norway" },
                { value: "Finland", label: "Finland" },
              ]}
              value={selectedCountry}
              onChange={setSelectedCountry}
              placeholder="Filter by Country"
              styles={selectStyles}
              isDisabled={locationLock(location, selectedCountry)}

            />

            {/* View options */}
            <Select
              options={viewOptions}
              value={viewOptions.find((option) => option.value === pageSize)}
              onChange={(selectedOption) => setPageSize(selectedOption.value)}
              placeholder="View Options"
              styles={selectStyles}
            />
            <FontAwesomeIcon
              icon={faArrowsRotate}
              onClick={() => {
                if (!selectedCountry && !searchQuery && pageSize === 10) {
                  return;
                }
                setIsRotated(!isRotated);
                clearFilters();
              }}
              className={`transition-transform ease-in-out duration-300 cursor-pointer ${
                isRotated ? "rotate-180" : ""
              } ${
                !selectedCountry && !searchQuery && pageSize === 10
                  ? "text-tecruitPrimary"
                  : "text-green-600"
              } w-6 h-6`}
              style={{
                transform: isRotated ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 1s ease", fontWeight: "lighter",
              }}
            />
          </div>
        </div>
      </div>

      {paginatedCompanies.length === 0 && (
        <h2 className="w-full text-gray-500 text-center py-12 px-8">
          No Companies Found For{" "}
          <span className="block py-2 text-sm font-semibold uppercase">
            {selectedCountry ? selectedCountry.label : "All Countries"}
          </span>
        </h2>
      )}
      {paginatedCompanies.length > 0 && (
        <div className="px-8 sm:px-2">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 grid-cols-5 gap-4 py-12 sm:py-8 px-8 max-h-screen overflow-y-auto">
            {paginatedCompanies.map((company) => (
              <CompanyCard key={company.name} company={company} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center my-4 text-tecruitPrimary">
            <button
              className="mr-2 sm:px-2 px-4 py-2 border rounded hover:bg-gray-200"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous Page
            </button>
            <span className="px-4 py-2 text-gray-600">
              Page {currentPage}/
              {Math.ceil(filteredCompanies.length / pageSize)}
            </span>
            <button
              className="sm:px-2 px-4 py-2 border rounded hover:bg-gray-200"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={endIndex >= filteredCompanies.length}
            >
              Next Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyList;
