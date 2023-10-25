import React, { useState, useEffect } from "react";
import LoginComponent from "../../components/auth/Login";
import SignupIndex from "../../components/auth/signup/SignupIndex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshake } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const AuthView = () => {
  const [signup, setSignup] = useState(false);
  const {authToken,authType} =useSelector((state) => state.common);
  const navigate = useNavigate();

  useEffect(() => {
    if(authToken && authType){
      navigate('/')
    }
  }, [authToken,authType,navigate])

  return (
    <div className="flex flex-col justify-start items-center  pb-24 mx-2 min-h-screen auth-bg">
      <div className="flex justify-center items-center p-16 w-16 h-16 2xl:w-20 2xl:h-20 3xl:w-24 3xl:h-24 4xl:w-28 4xl:h-28 rounded-full border-2 mt-16 2xl:mt-28 3xl:mt-32 4xl:mt-40 mb-8 border-tecruitPrimary">
      <FontAwesomeIcon icon={faHandshake} className="text-center text-6xl text-tecruitPrimary" />
      </div>
      {!signup && <LoginComponent setSignup={setSignup} />}
      {signup && <SignupIndex setSignup={setSignup} />}
    </div>
  );
};

export default AuthView;
