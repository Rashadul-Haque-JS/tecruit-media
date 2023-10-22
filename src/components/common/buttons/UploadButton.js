import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";

const UploadButton = ({label}) => {
  return (
    <div
      className="relative flex items-center justify-center gap-2 px-4 py-2 rounded-md border cursor-pointer hover:bg-gray-100 focus:outline-none z-10"
    >
      <FontAwesomeIcon
        icon={faArrowUpFromBracket}
        className={`text-sm ${label?.includes('CV')?'animate-pulse':'animate-none'} p-1`}
      />
      <span className="text-sm">{label}</span>
    </div>
  );
};

export default UploadButton;
