import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { countries, cities, jobList } from "../../data/jobs";

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
    // Here is option to try later like 1st div w-5/6 and 2nd div w-full
    <div className="flex flex-col justify-center items-center w-full px-4 py-6 md:py-2 rounded-lg shadow-shade relative">
      {/* Input field */}
      <div className="flex justify-center items-center flex-wrap z-40 w-5/6 sm:w-full">
        <input
          type="text"
          name="query"
          placeholder="Job Title, Skills, or Keywords"
          value={queryData.query}
          onChange={handleInputChange}
          required
          className={`border-b ${
            info ? "border-red-400" : "border-gray-300"
          } outline-none px-1 py-2 w-96 sm:w-full rounded`}
          autoFocus
        />

        {/* Country Select */}
        <Select
          options={countries}
          value={countries.find((c) => c.value === queryData.country)}
          onChange={(selectedOption) =>
            handleSelectChange(selectedOption, "country")
          }
          placeholder="Country"
          className="w-1/4 sm:w-full py-4"
          styles={{
            control: (provided, state) => ({
              ...provided,
              border: "none",
              borderBottom: "1px solid #ccc", // Gray border
              outline: "none", // Remove outline
            }),
          }}
        />

        {/* City Select */}
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
          className="w-1/4 sm:w-full md:w-1/2 ml-1"
          styles={{
            control: (provided, state) => ({
              ...provided,
              border: "none",
              borderBottom: "1px solid #ccc",
              outline: "none",
            }),
          }}
        />

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 sm:w-full sm:rounded-md"
        >
          Search
        </button>

        {/* Background Overlay */}
        <div className="absolute inset-0 backdrop-blur-md bg-white opacity-100 -z-10 rounded-lg"></div>
      </div>

      {/* Job Count */}
      <p className="text-sm py-2 w-fit z-40">
        <span className="text-blue-500">{jobList?.length}</span> jobs available
        right now
      </p>
    </div>
  );
};

export default SearchComponent;
