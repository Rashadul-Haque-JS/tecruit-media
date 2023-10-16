import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";

const ApplyNowArrow = () => {
  return (
    <div className="hidden sm:flex justify-center items-center absolute left-0 right-0 bottom-[362px]">
      <button className="w-fit cta-button text-lg uppercase tracking-tight rounded-3xl ">
       <FontAwesomeIcon icon={faArrowUpFromBracket}/> CV & Match Jobs
      </button>
    </div>
  );
};

export default ApplyNowArrow;
