import React, { useState, useEffect } from "react";
import SignupCard from "./Signup";
import CompanyRegitration from "./CompanyReg";

const SignupIndex = ({ setSignup }) => {
  const [type, setType] = useState("applicant");
  const [error, setError] = useState("");

  useEffect(() => {
    if(error){
      setTimeout(() => {
        setError('')
      }, 5000);
    }
  }, [error]);

  return (
    <div className={`${type === "applicant"?"md:w-[400px] lg:w-[400px] xl:w-[440px] w-1/4":"w-fit 2xl:w-[40vw] 3xl:w-[40vw] 4xl:w-[40vw]"} sm:w-full shadow-shade mt-6 px-8 pt-10 pb-6 sm:px-4 sm:mx-0 bg-tecruitSpecial sm:bg-tecruitSecondary rounded-lg sm:rounded-sm`}>
      <div className="bg-tecruitPrimary mb-4 grid h-28 place-items-center text-tecruitSecondary rounded shadow-shade">
        <h3 className="text-3xl">Sign Up</h3>
      </div>
      
      <div className=" flex justify-center items-center mb-2 gap-6 text-tecruitSecondary">
        <div className="text-tecruitSecondary sm:text-gray-800">
          <input
            type="radio"
            id="applicant"
            value="applicant"
            checked={type === "applicant"}
            onChange={(e) => setType(e.target.value)}
          />
          <label className="mx-1">Applicant</label>
        </div>
        <div className="text-tecruitSecondary sm:text-gray-800">
          <input
            className="mx-1"
            type="radio"
            id="company"
            value="company"
            checked={type === "company"}
            onChange={(e) => setType(e.target.value)}
          />
          <label>Company</label>
        </div>
      </div>
      {error && (
        <p className="text-tecruitRedish text-center w-full">{error}</p>
      )}
      {type === "applicant" && (<SignupCard  type={type}  setError={setError}/>)}
      {type === "company" && (<CompanyRegitration setError={setError} />)}
      <div className="mt-6 flex justify-center text-tecruitPrimary text-base">
            Already have an account?{" "}
            <span
              onClick={() => setSignup(false)}
              href="#signup"
              className="ml-1 font-bold sm:text-gray-800 text-gray-200 text-base cursor-pointer"
            >
              Sign In
            </span>
          </div>
    </div>
  );
};

export default SignupIndex;
