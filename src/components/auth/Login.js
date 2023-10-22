import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { addAuthToken, addAuthType } from "../../store/features/commonState";
import { login } from "../../api/api";

const LoginCard = ({ setSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login({ email, password });
      console.log(" response", response.data);
      dispatch(addAuthToken(response.data.token));
      dispatch(addAuthType(response.data.type));
      setEmail("");
      setPassword("");
      setRememberMe(false);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    if(error){
      setTimeout(() => {
        setError('')
      }, 5000);
    }
  }, [error]);

  return (
    <div className="md:w-[400px] lg:w-[400px] xl:w-[440px] w-1/4 sm:w-full shadow-shade mt-6 px-8 pt-10 pb-6 sm:px-4 sm:mx-0 bg-tecruitSpecial sm:bg-tecruitSecondary rounded-lg sm:rounded-sm">
      <div className="bg-tecruitPrimary mb-4 grid h-28 place-items-center text-tecruitSecondary rounded shadow-shade">
        <h3 className="text-3xl">Sign In</h3>
      </div>
      {error && (
        <p className="text-tecruitRedish text-center w-full">{error}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="relative">
            <label
              htmlFor="email"
              className=" text-lg text-tecruitSecondary sm:text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border border-gray-300  rounded-lg outline-none"
              onChange={handleEmailChange}
              value={email}
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className=" text-lg text-tecruitSecondary sm:text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 border border-gray-300  rounded-lg outline-none"
              onChange={handlePasswordChange}
              value={password}
              required
            />
          </div>
          <div className="flex items-center gap-2 pb-1">
            <input
              type="checkbox"
              id="remember"
              className="text-green-500 border rounded-md"
              onChange={handleRememberMeChange}
              checked={rememberMe}
            />
            <label
              htmlFor="remember"
              className=" text-base text-tecruitSecondary sm:text-gray-800"
            >
              Remember Me
            </label>
          </div>
        </div>
        <div className="pt-0">
          <button className="w-full py-3 text-tecruitSecondary bg-gradient-to-r from-green-500 to-green-700 rounded-lg focus:outline-none">
            Sign In
          </button>
          <div className="mt-6 flex justify-center text-tecruitPrimary  text-base">
            Don't have an account?{" "}
            <span
              onClick={() => setSignup(true)}
              href="#signup"
              className="ml-1 font-bold sm:text-gray-800 text-gray-200 text-base cursor-pointer"
            >
              Sign up
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginCard;
