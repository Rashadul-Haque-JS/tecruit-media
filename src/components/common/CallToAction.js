import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faCloudArrowUp} from "@fortawesome/free-solid-svg-icons";

const ApplyNowArrow = ({ customstyles }) => {
  return (
    <div
      className="flex justify-center items-center gap-2 w-fit cta-button text-md sm:tracking-tighter tracking-normal z-10 sm:mt-0 mt-8 "
      style={customstyles}
    >
      <FontAwesomeIcon icon={faCloudArrowUp} size="lg" className="sm:text-xl md:text-xl text-3xl sm:animate-none sm:border-none sm:px-0 sm:py-0 md:px-1 animate-pulse border-2 border-tecruitPrimary px-2 py-1 rounded-sm"/>
      <span className="w-fit uppercase md:font-norma"> CV Matches Jobs</span>
    </div>
  );
};

export default ApplyNowArrow;
