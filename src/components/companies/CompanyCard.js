import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";
const CompanyCard = ({ company }) => {
  const { name, website, country } = company;

  const cardStyle = {
    backgroundColor: "#fff",
  };

  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden shadow-shade"
      style={cardStyle}
    >
      <div className="bg-gradient-to-b from-transparent to-[#279b37] h-40 flex justify-center items-center text-[#db0045] text-[2rem] font-bold">
        {name}
      </div>
      <div className="p-6 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">{country}</p>
        </div>
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black flex items-center"
        >
          <span className="px-2">Visit</span>
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </a>
      </div>
    </div>
  );
};

export default CompanyCard;

