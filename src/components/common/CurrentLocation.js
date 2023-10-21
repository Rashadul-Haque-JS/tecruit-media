import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addLocation } from "../../store/features/commonState";
import { useLocation } from "react-router-dom";

const CurrentLocation = () => {
  const { location } = useSelector((state) => state.common);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const handleLocationChange = () => {
    dispatch(addLocation("nordic"));
  };
  return (
    <div className=" flex justify-center items-center gap-2 absolute right-4 2xl:top-28 3xl:top-28 4xl:top-28 2xl:right-6 3xl:right-6 4xl:right-6 top-16 z-40 w-fit" 
    >
      <img
        src="/media/watching.svg"
        alt="watching"
        className="w-[22px] text-white cursor-pointer"
        onClick={handleLocationChange}
        style={{display: pathname === "/" ? "none" : "block"}}
      />
      <img
        src={`/media/${location}.svg`}
        alt={location}
        className="w-[20px] h-[20px]"
      />
    </div>
  );
};
export default CurrentLocation;


