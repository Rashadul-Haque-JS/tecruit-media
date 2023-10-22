import React, { useState,useEffect } from "react";
import { signupApplicant } from "../../../api/api";
import { useDispatch } from "react-redux";
import { addAuthToken,addAuthType } from "../../../store/features/commonState";
const initialFormState = {
  email: "",
  password: "",
  confirmPassword: "",
  type: "applicant",
};
const SignupCard = ({setError}) => {
  const [formState, setFormState] = useState(initialFormState);
  const [rememberMe, setRememberMe] = useState(false);
  const [validation, setValidation] = useState("");

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formState.password !== formState.confirmPassword) {
      setValidation("Password mismatch");
      return;
    }
    try {
      const response = await signupApplicant(formState);
      dispatch(addAuthToken(response.data.token));
      dispatch(addAuthType(response.data.type));
      setFormState(initialFormState);
      setRememberMe(false);
    } catch (error) {
      setError(error.response.data.message);
      console.error("An error occurred:", error);
    }
    // Reset the form fields after submission
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
      <div className="flex flex-col gap-4">
        <div className="relative">
          <label
            htmlFor="email"
            className="text-lg text-tecruitSecondary sm:text-gray-800"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-3 border border-gray-300  rounded-lg focus:outline-none outline-none"
            onChange={handleChange}
            value={formState.email}
            required
          />
        </div>
        <div className="relative">
          <label
            htmlFor="password"
            className="text-lg text-tecruitSecondary sm:text-gray-800"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none outline-none"
            onChange={handleChange}
            value={formState.password}
            required
          />
        </div>
        <div className="relative">
          <label
            htmlFor="confirmPassword"
            className="text-lg text-tecruitSecondary sm:text-gray-800"
          >
            Confirm Password
          </label>
          {validation && <p className="text-xs text-tecruitRedish">{validation}</p>}
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none outline-none"
            onChange={handleChange}
            value={formState.confirmPassword}
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remember"
            name="rememberMe"
            checked={rememberMe}
            className="text-green-500 border border-gray-300  rounded-md"
            onChange={handleChange}
          />
          <label
            htmlFor="remember"
            className="text-base text-tecruitSecondary sm:text-gray-800"
          >
            Remember Me
          </label>
        </div>
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

export default SignupCard;
