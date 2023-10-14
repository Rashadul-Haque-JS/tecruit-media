import React from "react";
import { learning } from "../../assets";

const LearningsCard = () => {
  return (
    <div className="w-full flex justify-center items-center sm:flex-col gap-6">
      <div className="w-4/5 sm:w-full rounded-l-none overflow-hidden">
        <img
          src={learning}
          alt="learnings_card"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="mb-4 uppercase text-gray text-sm text-tecruitPrimary">startups</div>
        <h4 className="text-blue-gray text-xl font-semibold mb-2">
          Lyft launching cross-platform service this week
        </h4>
        <p className="text-gray text-sm font-normal mb-8">
          Like so many organizations these days, Autodesk is a company in
          transition. It was until recently a traditional boxed software company
          selling licenses. Yet its own business model disruption is only part
          of the story
        </p>
        <a href="www.example.com" className="inline-block">
          <button className="flex items-center gap-2 border border-tecruitPrimary px-3 py-2">
            Learn More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </a>
      </div>
    </div>
  );
};

export default LearningsCard;
