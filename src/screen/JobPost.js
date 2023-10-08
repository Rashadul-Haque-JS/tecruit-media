import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import skyDreamImg from "../assets/media/sky-dream.jpg";
import Select from "react-select";
import { workTime, position, jobTypes, countries, cities } from "../data/jobs";

const CreateJob = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    category: "data/IT",
    company: "",
    country: "",
    city: "",
    description: "",
    position: "",
    workTime: "",
    type: [],
    published_on: "",
    last_date: "",
    email_applications: false,
    email_to_applications: "",
    application_url: "",
  });

  const [jobTypeInfo, setJobTypeInfo] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send formData to your backend or handle it as needed
    console.log(formData);
  };

  useEffect(() => {
    if (formData?.type?.length > 1 && formData?.type?.includes("remote")) {
      setFormData((prevData) => ({
        ...prevData,
        type: [],
      }));
      setJobTypeInfo("Type 'remote' cannot be selected with other types");
    }

    if(jobTypeInfo === "Type 'remote' cannot be selected with other types") {
      setTimeout(() => {
        setJobTypeInfo("");
      }, 5000);
    }
  }, [formData.type, jobTypeInfo]);

  return (
    <div className="px-8">
      <h1 className="text-2xl font-semibold mb-2 text-center py-8">
        Post A Job
      </h1>
      <div className="bg-gray-100 min-h-screen flex sm:flex-wrap-reverse md:flex-wrap-reverse justify-center gap-8 px-4">
        <div className="w-1/3 sm:w-full md:w-full flex-shrink-0 my-4">
          <img
            src={skyDreamImg}
            alt="Job Image"
            className="object-cover w-full h-full sm:h-auto md:auto rounded-md"
          />
        </div>
        <div className="w-2/3 sm:w-full md:w-full my-4 p-12 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold mb-4">Create Job Posting</h1>
          <form onSubmit={handleSubmit} className="py-6">
            <div className="mb-4">
              <label
                htmlFor="jobTitle"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Job Title
              </label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="position"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Position
              </label>
              <Select
                options={position}
                value={position.find((p) => p.value === formData.position)} // Select the matching option
                onChange={(selectedOption) =>
                  handleSelectChange(selectedOption, "position")
                }
                placeholder="Select a position"
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="workTime"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Work Time
              </label>
              <Select
                options={workTime}
                value={workTime.find((wt) => wt.value === formData.workTime)} // Select the matching option
                onChange={(selectedOption) =>
                  handleSelectChange(selectedOption, "workTime")
                }
                placeholder="Select work time"
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Type
              </label>
              {jobTypeInfo && (<span className="text-blue-600 text-xs my-3" style={{transition: 'all 1s ease'}}>{jobTypeInfo}</span>)}
              <Select
                options={jobTypes}
                isMulti
                value={jobTypes.filter((jt) =>
                  formData.type.includes(jt.value)
                )} // Select the matching options
                onChange={handleSelectType}
                placeholder="Select type(s)"
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="country"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Country
              </label>
              <Select
                options={countries}
                value={countries.find((c) => c.value === formData.country)}
                onChange={(selectedOption) =>
                  handleSelectChange(selectedOption, "country")
                }
                placeholder="Select a country"
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="city"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                City
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
                    : "Select a city"
                }
                className="w-full z-40"
                isDisabled={formData.country === ""}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Description
              </label>
              <Editor
                apiKey="YOUR_API_KEY"
                value={formData.description}
                init={{
                  height: 300,
                  menubar: false,
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
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              Publish Job
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
