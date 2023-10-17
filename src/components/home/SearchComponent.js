import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { countries, cities, jobList } from "../../data/mock/jobs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { selectStylesHome } from "../../utils/helper";

const SearchComponent = () => {
  const [queryData, setQueryData] = useState({
    query: "",
    country: null,
    city: null,
  });

  const [info, setInfo] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setQueryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedOption, field) => {
    setQueryData((prevData) => ({
      ...prevData,
      [field]: selectedOption.value,
    }));
  };

  const handleSearch = () => {
    if (queryData.query.trim() === "") {
      setInfo(true);
      return;
    }
    const queryString = `?query=${encodeURIComponent(
      queryData.query
    )}&country=${encodeURIComponent(
      queryData.country
    )}&city=${encodeURIComponent(queryData.city)}`;
    navigate(`/jobs${queryString}`);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full px-4 pt-6 pb-20 sm:pt-1 sm:pb-4 md:py-2 shadow-shade relative home-search-bg">
      <p className="text-sm text-green-500 sm:pb-2 md:pt-2 pb-0 pt-0 w-fit">
        {/* + 429 will be removed on prod env */}
        <span className="font-bold text-md text-gray-300">{jobList?.length + 429}</span> jobs
        available right now
      </p>
      <div className="flex justify-center items-center flex-wrap w-5/6 sm:w-full lg:gap-0 xl:gap-1">
        <input
          type="text"
          name="query"
          placeholder="Job Title, Skills, or Keywords"
          value={queryData.query}
          onChange={handleInputChange}
          required
          className={`border ${
            info ? "border-red-400" : "border-tecruitPrimary"
          } outline-none pl-2 py-3 w-96 sm:w-full rounded md:w-1/2 apps-input`}
          autoFocus
        />
        <Select
          options={countries}
          value={countries.find((c) => c.value === queryData.country)}
          onChange={(selectedOption) =>
            handleSelectChange(selectedOption, "country")
          }
          placeholder="Country"
          className="w-1/4 sm:w-full py-4 md:w-1/2"
          styles={selectStylesHome}
        />
        <Select
          options={
            cities
              .find((c) => c.name === queryData.country)
              ?.mainCities.map((city) => ({
                value: city.value,
                label: city.label,
              })) || []
          }
          value={cities.find((c) => c.name === queryData.city)}
          onChange={(selectedOption) =>
            handleSelectChange(selectedOption, "city")
          }
          placeholder="City"
          className="w-1/4 sm:w-full md:w-1/2"
          styles={selectStylesHome}
        />
        <button
          onClick={handleSearch}
          className="bg-tecruitPrimary text-tecruitSecondary px-3 py-3 rounded-r-md md:rounded-l-md xl:rounded-md hover:bg-green-600 sm:w-full sm:rounded-md sm:mt-4 md:w-1/2 lg:rounded-md  border border-tecruitPrimary"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} /> Search
        </button>
      </div>
    </div>
  );
};

export default SearchComponent;
