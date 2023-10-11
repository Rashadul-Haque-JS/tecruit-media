import React, { useState } from "react";
import LoginComponent from "../components/auth/Login";
import SignupComponent from "../components/auth/Signup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshake } from "@fortawesome/free-solid-svg-icons";
const AuthView = () => {
  const [signup, setSignup] = useState(false);

  return (
    <div className="flex flex-col justify-start items-center  pb-24 mx-2 min-h-screen">
      <div className="flex justify-center items-center p-16 w-16 h-16 rounded-full border-2 mt-16 mb-8 border-[#279b37]">
      <FontAwesomeIcon icon={faHandshake} className="text-center text-6xl text-[#279b37]" />
      </div>
      {!signup && <LoginComponent setSignup={setSignup} />}
      {signup && <SignupComponent setSignup={setSignup} />}
    </div>
  );
};

export default AuthView;