import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addLocation } from "../../store/features/commonState";
import { useLocation } from "react-router-dom";

const CurrentLocation = () => {
  const { location } = useSelector((state) => state.common);
  const modiFiedLocation = location.toLowerCase();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const handleLocationChange = () => {
    dispatch(addLocation("Nordic"));
  };
  return (
    <div className="justify-center items-center gap-2 absolute right-3 top-16 z-40" 
    style={{display: pathname === "/" ? "none" : "flex"}}
    >
      <img
        src="/watching.svg"
        alt="watching"
        className="w-[22px] text-white cursor-pointer"
        onClick={handleLocationChange}
      />
      <img
        src={`/${modiFiedLocation}.svg`}
        alt={location}
        className="w-[20px]"
      />
    </div>
  );
};
export default CurrentLocation;


