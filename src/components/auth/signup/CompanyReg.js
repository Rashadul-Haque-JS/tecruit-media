import React, { useState, useEffect } from "react";
import { signupCompany } from "../../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { addAuthToken, addAuthType } from "../../../store/features/commonState";
import Select from "react-select";
import { countries } from "../../../data/mock/jobs";
import { cities } from "../../../data/mock/jobs";

const initialData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  street: "",
  post: "",
  city: "",
  country: "",
  type: "company",
};

const CompanyRegitration = ({setError}) => {
  const [formData, setFormData] = useState(initialData);
  const [rememberMe, setRememberMe] = useState(false);
  const [validation, setValidation] = useState("");
  const location = useSelector((state) => state.location);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectChange = (event, name) => {
    setFormData({
      ...formData,
      [name]: event.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setValidation("Password mismatch");
      return;
    }
    try {
      const response = await signupCompany(formData);
      dispatch(addAuthToken(response.data.token));
      dispatch(addAuthType(response.data.type));
      console.log(response.data.message);
      setFormData(initialData);
      setRememberMe(false);
    } catch (error) {
      setError(error.response.data.message);
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    if(validation){
      setTimeout(() => {
        setValidation('')
      }, 5000);
    }
  }, [validation]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative py-3">
        <label
          htmlFor="name"
          className=" text-lg text-tecruitSecondary sm:text-gray-800"
        >
          Company Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none"
          onChange={handleChange}
          value={formData.name}
          required
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <label
              htmlFor="email"
              className=" text-lg text-tecruitSecondary sm:text-gray-800"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className=" text-lg text-tecruitSecondary sm:text-gray-800"
            >
              Password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-3  border border-gray-300 rounded-lg outline-none"
              onChange={handleChange}
              value={formData.password}
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className=" text-lg text-tecruitSecondary sm:text-gray-800"
            >
              Confirm Password *
            </label>
            {validation && <p className="text-xs text-tecruitRedish">{validation}</p>}
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none"
              onChange={handleChange}
              value={formData.confirmPassword}
              required
            />
          </div>
        </div>
        <div className="flex flex-col  gap-4">
          <div className="relative">
            <label
              htmlFor="post"
              className=" text-lg text-tecruitSecondary sm:text-gray-800"
            >
              Street Name *
            </label>
            <input
              type="text"
              id="street"
              name="street"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none"
              onChange={handleChange}
              value={formData.street}
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="post"
              className=" text-lg text-tecruitSecondary sm:text-gray-800"
            >
              Post Code *
            </label>
            <input
              type="text"
              id="post"
              name="post"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none"
              onChange={handleChange}
              value={formData.post}
              required
            />
          </div>

          <div className="relative">
            <label
              htmlFor="city"
              className=" text-lg text-tecruitSecondary sm:text-gray-800"
            >
              Country *
            </label>
            <Select
              options={countries}
              value={countries.find((c) => c.value === location)}
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, "country")
              }
              placeholder="Country"
              className="w-full"
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  border: "1px solid #CBD5E0",
                  padding: "6px 0px",
                  outline: "none",
                }),
              }}
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="city"
              className=" text-lg text-tecruitSecondary sm:text-gray-800"
            >
              City *
            </label>
            <Select
              options={
                cities
                  .find((c) => c.name === formData.country)
                  ?.mainCities.map((city) => ({
                    value: city.value,
                    label: city.label,
                  })) || []
              }
              value={cities.find((c) => c.name === formData.city)}
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, "city")
              }
              placeholder="City"
              className="w-full "
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  border: "1px solid #CBD5E0",
                  padding: "6px 0px",
                  outline: "none",
                }),
              }}
              required
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 pt-3 p">
        <input
          type="checkbox"
          id="remember"
          name="rememberMe"
          checked={rememberMe}
          className="text-green-500 border rounded-md"
          onChange={handleChange}
        />
        <label
          htmlFor="remember"
          className=" text-base text-tecruitSecondary sm:text-gray-800"
        >
          Remember Me
        </label>
      </div>
      <div className="pt-0">
        <button
          type="submit"
          className="w-full py-3 text-tecruitSecondary bg-gradient-to-r from-green-500 to-green-700 rounded-lg focus:outline-none"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default CompanyRegitration;
