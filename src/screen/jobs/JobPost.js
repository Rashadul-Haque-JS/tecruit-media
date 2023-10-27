import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Select from "react-select";
import { Link } from "react-router-dom";
import {
  workTime,
  position,
  jobTypes,
  countries,
  cities,
  applicationOptions,
} from "../../data/mock/jobs";
import { selectStyles, getCurrentDate } from "../../utils/helper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import ProgramCard from "../../components/common/ProgramCard";
import { postNewJob } from "../../api/api";
import subCategories from "../../data/static/subCategories";

const CreateJob = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    category: "data/IT",
    subCategory: "",
    company: "",
    country: "",
    city: "",
    description: "",
    position: "",
    workTime: "",
    type: [],
    published_on: getCurrentDate(),
    last_date: null,
    application_options: "onlineForm",
    email_to_applications: "",
    application_url: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [jobTypeInfo, setJobTypeInfo] = useState("");
  const [selectedDate, setSelectedDate] = useState();

  const { authType } = useSelector((state) => state.common);
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? e.target.checked : value,
    }));
  };

  const handleSelectChange = (selectedOption, name) => {
    const value = selectedOption.value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectType = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormData((prevData) => ({
      ...prevData,
      type: formData.type.includes("remote")
        ? selectedValues.filter((v) => v !== "onsite" && v !== "hybrid")
        : selectedValues,
    }));
  };

  const handleEditorChange = (content, editor) => {
    setFormData((prevData) => ({
      ...prevData,
      description: content,
    }));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date?.toISOString().split("T")[0];
    setFormData((prevData) => ({
      ...prevData,
      last_date: formattedDate,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await postNewJob(formData);
      setMessage(res.data.message);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  useEffect(() => {
    if (formData?.type?.length > 1 && formData?.type?.includes("remote")) {
      setFormData((prevData) => ({
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
  }, [formData.type, jobTypeInfo]);

  useEffect(() => {
    if (message || error) {
      setTimeout(() => {
        setMessage("");
        setError("");
      }, 5000);
    }
  }, [message, error]);

  return (
    <div className="pb-20">
      <h1 className="text-2xl 2xl:text-4xl 3xl:text-4xl 4xl:text-5xl font-semibold mb-2 text-center py-8 bg-tecruitPrimary text-tecruitSecondary">
        Job Post{" "}
        {message && (
          <span
            className="block text-sm font-normal py-2 text-green-600"
            style={{ display: "block", transition: "transform 3s ease-out" }}
          >
            {message}
          </span>
        )}
      </h1>
      <div className="bg-gray-100 min-h-screen flex sm:flex-wrap-reverse md:flex-wrap-reverse justify-center gap-8 lg:gap-3 px-8 lg:px-4 sm:px-2">
        <div className="w-1/2 sm:w-full md:w-full flex-shrink-0 my-4">
        <ProgramCard
          img="/media/tools.jpg"
          headline="Recruitment automation tools"
          text=" Lorem ipsum do lor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"
          label="Try it now"
          link="/recruitment-automation"
          
          />
           <ProgramCard
          img="/media/woman.jpg"
          headline="Meet the best candidates"
          text=" Lorem ipsum do lor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"
          label="Meet point"
          link="/candidates"
          
          />
          <ProgramCard
            img="/media/planning-job.jpg"
            headline="Effective Planning with Tecruit"
            text="Tecruit is a platform that helps you to find the best candidate. We have a wide range of candidates from different countries and different backgrounds. We are here to help you to find the best candidate for your company."
            label="Find Out More"
            link="/planning-recruitment"
          />
         
         
        </div>
        <div className="w-1/2 sm:w-full md:w-full my-4 p-12 lg:px-6 sm:p-6 bg-tecruitSecondary rounded-lg shadow-lg relative">
          <h1 className="text-2xl text-tecruitSpecial font-semibold mb-4">Create Job Posting</h1>
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
                value={formData.jobTitle}
                onChange={handleInputChange}
                required
                placeholder="Insert job title"
                className="apps-input appearance-none border border-tecruitPrimary  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                value={position.find((p) => p.value === formData.position)} // Select the matching option
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
                value={subCategories.find((sc) => sc.value === formData.subCategory)} 
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
                value={workTime.find((wt) => wt.value === formData.workTime)} // Select the matching option
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
                  formData.type.includes(jt.value)
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
                value={countries.find((c) => c.value === formData.country)}
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
                  .find((c) => c.name === formData.country)
                  ?.mainCities.map((city) => ({
                    value: city.value,
                    label: city.label,
                  }))}
                value={cities.find((c) => c.name === formData.city)}
                onChange={(selectedOption) =>
                  handleSelectChange(selectedOption, "city")
                }
                placeholder={
                  formData.country === ""
                    ? "Select a country first"
                    : "Select job's city"
                }
                className="w-full"
                isDisabled={formData.country === ""}
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
                  (ea) => ea.value === formData.application_options
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

            {formData.application_options === "email" ? (
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
                  value={formData.email_to_applications}
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
                  value={formData.application_url}
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
                value={formData.description}
                init={{
                  height: 300,
                  menubar: true,
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
                  <input
                    className="appearance-none border border-tecruitPrimary w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                }
              />
            </div>
            {message && (
                  <span
                    className="capitalize block text-md font-normal py-2 text-tecruitPrimary"
                    style={{
                      display: "block",
                      transition: "transform 3s ease-out",
                    }}
                  >
                    {message}
                  </span>
                )}
            {error && (
                  <span
                    className="capitalize block text-md font-normal py-2 text-tecruitRedish"
                    style={{
                      display: "block",
                      transition: "transform 3s ease-out",
                    }}
                  >
                    {error}
                  </span>
                )}
            <button
              type="submit"
              className="bg-tecruitPrimary text-tecruitSecondary hover:bg-gray-700 py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
            >
              Publish Job
            </button>
          </form>
          <p className="py-4 text-xs text-tecruitSpecial">
            All the fields marked with (*) are required
          </p>
          {authType !== 'company' && (
            <div className="flex justify-end items-start pt-10 pl-3 pr-12 sm:pt-16 sm:pr-6 md:pt-14 md:pr-12 lg:pt-14 lg:pl-0 lg:pr-6 bg-transparent absolute w-full h-full inset-0">
              <div className="flex flex-col justify-center items-start gap-1 bg-tecruitSecondary text-xs w-fit py-3 px-4 sm:py-1 rounded-sm z-20 shadow-inner">
                <p className="py-1 sm:py-0 w-fit ">Company login required</p>
                <Link to="/auth" className="bg-tecruitSpecial text-tecruitSecondary px-2 py-1 sm:py-1 rounded-sm">
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

export default CreateJob;

const requiredSpan = () => {
  return <span className="pl-1  text-md">*</span>;
};
