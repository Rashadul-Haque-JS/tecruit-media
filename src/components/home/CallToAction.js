import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";

const ApplyNowArrow = ({customstyles}) => {
  
  return (
   
      <div  className={`w-fit cta-button text-md tracking-tighter rounded-3xl z-10 ${customstyles}`}>
       <FontAwesomeIcon icon={faArrowUpFromBracket}/> CV Match-Jobs
      </div>
    
  );
};

export default ApplyNowArrow;
