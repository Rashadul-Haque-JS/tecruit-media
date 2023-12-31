import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Select from "react-select";
import { Link, useParams } from "react-router-dom";
import {
  workTime,
  position,
  jobTypes,
  countries,
  cities,
  applicationOptions,
} from "../../data/mock/jobs";
import { selectStyles } from "../../utils/helper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { getJobById, updateJobAds } from "../../api/api";
import subCategories from "../../data/static/subCategories";
import PreLoader from "../../components/PreLoader";
import { getFormatedDate } from "../../utils/helper";

const EditJob = () => {
  const [job, setJob] = useState({});
  const [message, setMessage] = useState("");
  const [jobTypeInfo, setJobTypeInfo] = useState("");
  const [loader, setLoader] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const { authType, authToken } = useSelector((state) => state.common);
  const { companyName } = useSelector((state) => state.company.company);
  const { id } = useParams();

  //Get job information by id
  useEffect(() => {
    setLoader(true);
    if (!authToken || !companyName) {
      return;
    }
    const fetchJob = async () => {
      try {
        const response = await getJobById(id);
        setJob(response.data);
        console.log(response);
        setSelectedDate(new Date(response.data?.last_date));
        setLoader(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJob();
  }, [authToken, companyName, id]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setJob((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? e.target.checked : value,
    }));
  };

  const handleSelectChange = (selectedOption, name) => {
    const value = selectedOption.value;
    setJob((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectType = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setJob((prevData) => ({
      ...prevData,
      type: job?.type?.includes("remote")
        ? selectedValues.filter((v) => v !== "onsite" && v !== "hybrid")
        : selectedValues,
    }));
  };

  const handleEditorChange = (content, editor) => {
    setJob((prevData) => ({
      ...prevData,
      description: content,
    }));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date?.toISOString().split("T")[0];
    setJob((prevData) => ({
      ...prevData,
      last_date: formattedDate,
    }));
  };

  //Submit updated jobs
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateJobAds(id, job);
      setMessage(res.data.message);
    } catch (err) {
      console.log(err);
      setMessage(err.response.data.message);
    }
  };

  useEffect(() => {
    if (job?.type?.length > 1 && job?.type?.includes("remote")) {
      setJob((prevData) => ({
        ...prevData,
        type: [],
      }));
      setJobTypeInfo("Type 'remote' cannot be selected with other types");
    }

    if (jobTypeInfo === "Type 'remote' cannot be selected with other types") {
      setTimeout(() => {
        setJobTypeInfo("");
      }, 5000);
    }
  }, [job?.type, jobTypeInfo]);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  }, [message]);

  return (
    <div className="pb-20">
      <h1 className="text-2xl 2xl:text-4xl 3xl:text-4xl 4xl:text-5xl font-semibold mb-2 text-center py-8 bg-tecruitPrimary text-tecruitSecondary">
        Edit Job
      </h1>
      <div className="bg-gray-100 min-h-screen flex sm:flex-wrap-reverse md:flex-wrap-reverse justify-center gap-8 lg:gap-3 px-8 lg:px-4 sm:px-2">
        <div className="w-1/2 sm:w-full md:w-full flex-shrink-0 my-4">
          <img
            src="/media/editsite.png"
            alt="Jobs"
            className="object-cover w-full h-full sm:h-auto md:auto rounded-md"
          />
        </div>
        <div className="w-1/2 sm:w-full md:w-full my-4 p-12 lg:px-6 sm:p-6 bg-tecruitSecondary rounded-lg shadow-lg relative">
          {loader && <PreLoader />}
          {!loader && (
            <>
              <div className=" text-tecruitSpecial font-semibold mb-4">
                <p className="text-2xl">{job?.jobTitle}</p>
                <p className=" text-sm text-gray-500 ">
                  {" "}
                  Published: {getFormatedDate(job?.published_on)}
                </p>
              </div>
              <form onSubmit={handleSubmit} className="py-6">
                <div className="mb-4">
                  <label
                    htmlFor="jobTitle"
                    className="block text-sm font-bold mb-2 px-3"
                  >
                    Job Title{requiredSpan()}
                  </label>
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    value={job?.jobTitle}
                    onChange={handleInputChange}
                    required
                    placeholder="Insert job title"
                    className=" appearance-none border border-tecruitPrimary  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="position"
                    className="block text-sm font-bold mb-2 px-3"
                  >
                    Position{requiredSpan()}
                  </label>
                  <Select
                    options={position}
                    value={position.find((p) => p.value === job?.position)} 
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, "position")
                    }
                    placeholder="Select a position"
                    className="w-full"
                    styles={selectStyles}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="subCategory"
                    className="block text-sm font-bold mb-2 px-3"
                  >
                    Sub Category{requiredSpan()}
                  </label>
                  <Select
                    options={subCategories}
                    value={subCategories.find(
                      (sc) => sc.value === job?.subCategory
                    )}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, "subCategory")
                    }
                    placeholder="Select sub-category"
                    className="w-full"
                    styles={selectStyles}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="workTime"
                    className="block  text-sm font-bold mb-2 px-3"
                  >
                    Contract Type{requiredSpan()}
                  </label>
                  <Select
                    options={workTime}
                    value={workTime.find((wt) => wt.value === job?.workTime)} // Select the matching option
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, "workTime")
                    }
                    placeholder="Select work time"
                    className="w-full"
                    styles={selectStyles}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="type"
                    className="block  text-sm font-bold mb-2 px-3"
                  >
                    Location Type{requiredSpan()}
                  </label>
                  {jobTypeInfo && (
                    <span
                      className="text-black-600 text-xs my-3"
                      style={{ transition: "all 1s ease" }}
                    >
                      {jobTypeInfo}
                    </span>
                  )}
                  <Select
                    options={jobTypes}
                    isMulti
                    value={jobTypes.filter((jt) =>
                      job?.type?.includes(jt.value)
                    )}
                    onChange={handleSelectType}
                    placeholder="Select type(s)"
                    className="w-full"
                    styles={selectStyles}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="country"
                    className="block text-sm font-bold mb-2 px-3"
                  >
                    Country{requiredSpan()}
                  </label>
                  <Select
                    options={countries}
                    value={countries.find((c) => c.value === job?.country)}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, "country")
                    }
                    placeholder="Select job's country"
                    className="w-full"
                    styles={selectStyles}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="city"
                    className="block  text-sm font-bold mb-2 px-3"
                  >
                    City{requiredSpan()}
                  </label>
                  <Select
                    options={cities
                      .find((c) => c.name === job?.country)
                      ?.mainCities.map((city) => ({
                        value: city.value,
                        label: city.label,
                      }))}
                    value={cities
                      .find((c) => c.name === job?.country)
                      ?.mainCities.find((city) => city.value === job?.city)}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, "city")
                    }
                    placeholder={
                      job?.country === ""
                        ? "Select a country first"
                        : "Select job's city"
                    }
                    className="w-full"
                    isDisabled={job?.country === ""}
                    styles={selectStyles}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="applicationOptions"
                    className="block  text-sm font-bold mb-2 px-3"
                  >
                    Application Options{requiredSpan()}
                  </label>
                  <Select
                    options={applicationOptions}
                    value={applicationOptions.find(
                      (ea) => ea.value === job?.application_options
                    )} // Select the matching option
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, "application_options")
                    }
                    placeholder="Select application option"
                    className="w-full"
                    styles={selectStyles}
                    required
                  />
                </div>

                {job?.application_options === "email" ? (
                  <div className="mb-4">
                    <label
                      htmlFor="email_to_applications"
                      className="block text-sm font-bold mb-2 px-3"
                    >
                      Email To Applications{requiredSpan()}
                    </label>
                    <input
                      type="email"
                      id="email_to_applications"
                      name="email_to_applications"
                      value={job?.email_to_applications}
                      onChange={handleInputChange}
                      required
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Insert email address"
                    />
                  </div>
                ) : (
                  <div className="mb-4">
                    <label
                      htmlFor="application_url"
                      className="block text-sm font-bold mb-2 px-3"
                    >
                      Application Link{requiredSpan()}
                    </label>
                    <input
                      type="url"
                      id="application_url"
                      name="application_url"
                      value={job?.application_url}
                      onChange={handleInputChange}
                      required
                      className="appearance-none  border border-tecruitPrimary rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Insert application link"
                    />
                  </div>
                )}

                <div className="my-6">
                  <label
                    htmlFor="description"
                    className="block  text-sm font-bold mb-2 px-3"
                  >
                    Description{requiredSpan()}
                  </label>
                  <Editor
                    apiKey={process.env.REACT_APP_TINY_API_KEY}
                    value={job?.description}
                    init={{
                      height: 300,
                      menubar: true,
                      paste_block_drop: false,
                      toolbar:
                        "undo redo | formatselect | " +
                        "bold italic backcolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | image | help",
                    }}
                    onEditorChange={handleEditorChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="last_date"
                    className="block text-sm font-bold mb-2 px-3"
                  >
                    Applications Deadline{requiredSpan()}
                  </label>
                  <DatePicker
                    selected={selectedDate - 1}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    className="appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border"
                    placeholderText="Select date"
                    required
                    customInput={
                      <input className="appearance-none border border-tecruitPrimary w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    }
                  />
                </div>
                {message && (
                  <span
                    className="capitalize block text-md font-normal py-2 text-green-600"
                    style={{
                      display: "block",
                      transition: "transform 3s ease-out",
                    }}
                  >
                    {message}
                  </span>
                )}
                <button
                  type="submit"
                  className="bg-tecruitPrimary text-tecruitSecondary hover:bg-gray-700 py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                >
                  Update Job
                </button>
              </form>
            </>
          )}

          <p className="py-4 text-xs text-tecruitSpecial">
            All the fields marked with (*) are required
          </p>
          {authType !== "company" && (
            <div className="flex justify-end items-start pt-10 pl-3 pr-12 sm:pt-16 sm:pr-6 md:pt-14 md:pr-12 lg:pt-14 lg:pl-0 lg:pr-6 bg-transparent absolute w-full h-full inset-0">
              <div className="flex flex-col justify-center items-start gap-1 bg-tecruitSecondary text-xs w-fit py-3 px-4 sm:py-1 rounded-sm z-20 shadow-inner">
                <p className="py-1 sm:py-0 w-fit ">Company login required</p>
                <Link
                  to="/auth"
                  className="bg-tecruitSpecial text-tecruitSecondary px-2 py-1 sm:py-1 rounded-sm"
                >
                  Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditJob;

const requiredSpan = () => {
  return <span className="pl-1  text-md">*</span>;
};
