import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addLocation } from "../../store/features/commonState";
import { useLocation,useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock,faLockOpen} from "@fortawesome/free-solid-svg-icons";


const CurrentLocation = () => {
  const { location } = useSelector((state) => state.common);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleLocationChange = () => {
    dispatch(addLocation("nordic"));
  };
  return (
    <div className=" flex justify-center items-center gap-3 absolute right-4 top-[4.5rem] sm:top-[4rem] 2xl:top-28 3xl:top-28 4xl:top-28 2xl:right-6 3xl:right-6 4xl:right-6  z-40 w-fit" 
    >
      {location === "nordic" && (
        <FontAwesomeIcon icon={faLockOpen} className="text-tecruitSecondary text-md sm:text-sm cursor-pointer" style={{display: pathname === "/" ? "none" : "block"}}
        onClick={()=>navigate("/")}
        />
      )}
      {location !== "nordic" && (
        <FontAwesomeIcon icon={faLock} className="text-tecruitSecondary text-md sm:text-sm cursor-pointer" onClick={handleLocationChange}  style={{display: pathname === "/" ? "none" : "block"}}
        />
      )}
      <img
        src={`/media/${location}.svg`}
        alt={location}
        className="w-[20px] h-[20px]"
      />
      
    </div>
  );
};
export default CurrentLocation;


