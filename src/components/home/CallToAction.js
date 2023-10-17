import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";

const ApplyNowArrow = ({ customstyles }) => {
  return (
    <div
      className="flex justify-center items-center gap-3 w-fit cta-button text-md tracking-tighter z-10"
      style={customstyles}
    >
      <FontAwesomeIcon icon={faArrowUpFromBracket} />
      <span className="w-fit"> CV Match-Jobs</span>
    </div>
  );
};

export default ApplyNowArrow;
