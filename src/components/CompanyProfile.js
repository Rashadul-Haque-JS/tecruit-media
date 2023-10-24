import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addAuthToken,
  addAuthType,

} from "../store/features/commonState";
import { deleteApplicant, deleteCompany,removeToken,getJobByCraetor} from "../api/api";

const CompanyProfile = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [ads, setAds] = useState([]); // State to store the list of company ads
  const email = useSelector((state) => state.common.authEmail);
  const type = useSelector((state) => state.common.authType);
  const {company} = useSelector((state) => state.company);
  const picture = ""; // Placeholder for company's picture
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoLetter = company?.companyName?.split(" ")[0].slice(0, 1);
  useEffect(() => {
    if (email) {
      fetchCompanyAds();
    }
  }, [email]);

  const fetchCompanyAds = async () => {
    try {
      const response = await getJobByCraetor();
      setAds(response?.data.jobList); 
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleDeleteAccount = async () => {
    setShowDeleteModal(true);
  };

  const confirmDeleteAccount = async () => {
    try {
      if (type === "applicant") {
        await deleteApplicant();
      } else {
        await deleteCompany();
      }

      dispatch(addAuthToken(""));
      dispatch(addAuthType(""));
      removeToken();
      navigate("/auth");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const closeModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="w-full min-h-screen relative">
      {email ? (
        <div
          className="text-center pt-8 pb-20"
          style={{ opacity: showDeleteModal ? 0.5 : 1 }}
        >
          <div className="flex flex-wrap justify-evenly items-center mt-8 gap-8">
            <div className="flex justify-center items-center">
              {picture && (
                <img
                  src={picture} // Set the company's picture source
                  alt="Companyprofile"
                  className="rounded-md"
                />
              )}
              {!picture && (
                <div
                  className="w-[300px] h-[300px] rounded-md border p-4 flex justify-center items-center shadow-md sm:shadow-none"
                >
                 <div className="w-full h-full rounded-full bg-tecruitSpecial flex justify-center items-center">
                    <h1 className="company-logo text-9xl sm:text-8xl font-extrabold text-center">{logoLetter}</h1>
                </div>
                </div>
              )}
            </div>
            <div className="bg-white px-8 py-12 rounded-lg shadow-md w-full max-w-lg">
              <div className="mb-4 text-xl font-bold">
                <strong>Name:</strong>  <strong>{company?.companyName}</strong>
              </div>
              <div className="mb-4">
                <strong>Email:</strong> {company?.email}
              </div>
              <div className="mb-1 capitalize">
                <span>{company?.street}</span>, <span>{company?.post}</span>
              </div>
              <div className="mb-6 capitalize">
                <span>{company?.city}</span>, <span>{company?.country}</span>
              </div>
             
              <div className="w-full bg-tecruitSpecial hover:bg-tecruitPrimary text-white rounded-lg py-2 font-semibold">
                <button
                  onClick={() => navigate("/Companyprofile/edit")}
                  className="w-full transition duration-300"
                >
                  Edit CompanyProfile
                </button>
              </div>
              <button
                onClick={handleDeleteAccount}
                className="w-full mt-4 bg-tecruitRedish text-white rounded-lg py-2 font-semibold hover:bg-red-600 transition duration-300"
              >
                Delete Account
              </button>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold p-4">Ads by Company</h2>
            {ads.length > 0 && (
                <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">Job Title</th>
                    <th className="border border-gray-300 p-2">Published On</th>
                    <th className="border border-gray-300 p-2">Job Id</th>
                    <th className="border border-gray-300 p-2">Edit</th>
                    <th className="border border-gray-300 p-2">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {ads.map((ad) => (
                    <tr key={ad.id}>
                      <td className="border border-gray-300 p-2">{ad.jobTitle}</td>
                      <td className="border border-gray-300 p-2">{ad._id}</td>
                      <td className="border border-gray-300 p-2">{ad.published_on}</td>
                      <td className="border border-gray-300 p-2">
                        <button >Edit</button>
                      </td>
                      <td className="border border-gray-300 p-2">
                        <button >Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {ads.length === 0 && (
                <p className="text-center py-10 ">No ads published yet.</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center py-10">Loading user data...</p>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="modal fixed inset-1/3 sm:inset-4 md:inset-6 shadow-lg p-8 bg-gray-400 text-white rounded">
          <div className="modal-content">
            <h3 className="text-xl font-semibold text-black py-5">Confirm Deletion</h3>
            <p>
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            <div className="modal-buttons py-5">
              <button
                onClick={confirmDeleteAccount}
                className="bg-tecruitRedish text-white rounded-lg py-2 px-4 font-semibold hover:bg-red-600 transition duration-300"
              >
                Confirm
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white rounded-lg py-2 px-4 ml-4 font-semibold hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;
