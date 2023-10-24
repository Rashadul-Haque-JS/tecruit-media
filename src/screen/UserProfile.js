import React,{useEffect} from "react";
import ApplicantProfile from "../components/Profile";
import CompanyProfile from "../components/CompanyProfile";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const UserProfiles = () => {
    const {authType} = useSelector((state) => state.common);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authType) {
            navigate("/auth");
        }
    }, [authType,navigate]) 

    return (
        <div className="min-h-screen pb-20">
          <h2 className="text-2xl 2xl:text-4xl 3xl:text-4xl 4xl:text-5xl font-semibold mb-2 text-center py-6 text-tecruitSecondary bg-tecruitPrimary">
            Profile
        </h2>  
        {authType ==="applicant" && <ApplicantProfile />}
        {authType ==="company" && <CompanyProfile />}
        </div>
    );
}

export default UserProfiles;