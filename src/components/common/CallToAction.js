import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";

const ApplyNowArrow = ({ customstyles }) => {
  return (
    <div
      className="flex justify-center items-center gap-2 w-fit cta-button text-md sm:tracking-tighter tracking-normal z-10 sm:mt-0 mt-8 "
      style={customstyles}
    >
      <FontAwesomeIcon icon={faArrowUpFromBracket} className="sm:animate-none sm:border-none sm:px-0 sm:py-0 animate-pulse border-2 border-tecruitPrimary px-2 py-1 rounded-sm"/>
      <span className="w-fit"> CV Match-Jobs</span>
    </div>
  );
};

export default ApplyNowArrow;
