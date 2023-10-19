import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import skyDreamImg from "../assets/media/sky-dream.jpg";
import Select from "react-select";
import { postNewJob } from "../api/api";
import {
  workTime,
  position,
  jobTypes,
  countries,
  cities,
  applicationOptions,
} from "../data/mock/jobs";
import { selectStyles, getCurrentDate } from "../utils/helper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateJob = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    company: "Top Tech",
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
  const [jobTypeInfo, setJobTypeInfo] = useState("");
  const [selectedDate, setSelectedDate] = useState();

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
      setMessage(err.response.data.message);
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
    if (message) {
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  }, [message]);

  return (
    <div>
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
      <div className="bg-gray-100 min-h-screen flex sm:flex-wrap-reverse md:flex-wrap-reverse justify-center gap-8 px-8 sm:px-2">
        <div className="w-1/2 sm:w-full md:w-full flex-shrink-0 my-4">
          <img
            src={skyDreamImg}
            alt="Jobs"
            className="object-cover w-full h-full sm:h-auto md:auto rounded-md"
          />
        </div>
        <div className="w-1/2 sm:w-full md:w-full my-4 p-12 sm:p-6 bg-tecruitSecondary rounded-lg shadow-lg">
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
                apiKey="YOUR_API_KEY"
                value={formData.description}
                init={{
                  height: 300,
                  menubar: true,
                  plugins: [
                    "advlist autolink lists link image",
                    "charmap print preview anchor",
                    "searchreplace visualblocks code",
                    "insertdatetime media table paste code help wordcount",
                  ],
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

            <button
              type="submit"
              className="bg-tecruitPrimary text-tecruitSecondary hover:bg-gray-700 py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              Publish Job
            </button>
          </form>
          <p className="py-4 text-xs text-tecruitSpecial">
            All the fields marked with (*) are required
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;

const requiredSpan = () => {
  return <span className="pl-1  text-md">*</span>;
};
