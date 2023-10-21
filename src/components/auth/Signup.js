import React, { useState } from "react";
import { signup} from "../../api/api";
import { useDispatch } from "react-redux";
import { addAuthToken } from "../../store/features/commonState";
import { useNavigate } from 'react-router-dom';

const SignupCard = ({ setSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [type, setType] = useState('applicant');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setRememberMe(checked);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      console.log("Password and confirm password do not match");
      return;
    }
    try {
      const response = await signup({ email, password,type });
      dispatch(addAuthToken(response.data.token));
      console.log(response.data.message);
      navigate('/');
    } catch (error) {
      console.error('An error occurred:', error);
    }
  // Reset the form fields after submission
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setRememberMe(false);
  };
  
  return (
    <div className="md:w-[400px] lg:w-[400px] xl:w-[400px] w-1/4 sm:w-full shadow-shade mt-6 px-8 py-6 sm:px-4 sm:mx-0 bg-tecruitSecondary rounded-sm">
      <div className=" flex justify-center items-center mb-2 gap-3">
          <div>
            <input
              type="radio"
              id="applicant"
              value="applicant"
              checked={type === 'applicant'}
              onChange={(e) => setType(e.target.value)}
            />
            <label className="mx-1">Applicant</label>
          </div>
          <div>
            <input
              className="mx-1"
              type="radio"
              id="company"
              value="company"
              checked={type === 'company'}
              onChange={(e) => setType(e.target.value)}
            />
            <label>Company</label>
          </div>
        </div>
      <form onSubmit={handleSubmit}>
        <div className="bg-tecruitPrimary mb-4 grid h-28 place-items-center text-tecruitSecondary rounded shadow-shade">
          <h3 className="text-3xl">Sign Up</h3>
        </div>
        <div className="flex flex-col gap-4">
          <div className="relative">
            <label htmlFor="email" className="text-gray-700 text-lg">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              onChange={handleChange}
              value={email}
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="text-gray-700 text-lg">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              onChange={handleChange}
              value={password}
            />
          </div>
          <div className="relative">
            <label htmlFor="confirmPassword" className="text-gray-700 text-lg">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              onChange={handleChange}
              value={confirmPassword}
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              name="rememberMe"
              checked={rememberMe}
              className="text-green-500 border rounded-md"
              onChange={handleChange}
            />
            <label htmlFor="remember" className="text-gray-700 text-base">
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
          <div className="mt-6 flex justify-center text-gray-700 text-base">
            Already have an account?{" "}
            <span
              onClick={() => setSignup(false)}
              href="#signup"
              className="ml-1 font-bold text-blue-gray text-base cursor-pointer"
            >
              Sign In
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupCard;

