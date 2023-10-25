import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { addAuthToken, addAuthType} from "../../store/features/commonState";
import { deleteApplicant, deleteCompany,removeToken } from "../../api/api";

const Profile = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const email = useSelector((state) => state.common.authEmail);
  const type = useSelector((state) => state.common.authType);
  const picture = "";
  const navigate = useNavigate();
    const dispatch = useDispatch();

  const handleDeleteAccount = async () => {
    setShowDeleteModal(true);
  };

  const confirmDeleteAccount = async () => {
    try {
     type === 'applicant'? await deleteApplicant(): await deleteCompany();
      setShowDeleteModal(false);
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
    <div className="w-full min-h-screen relative ">
      {email ? (
        <div
          className="text-center pt-8 pb-20"
          style={{ opacity: showDeleteModal ? 0.5 : 1 }}
        >
          <div className="flex flex-col justify-evenly items-center mt-8 gap-16">
            <div className="flex justify-center items-center w-full p-4 shadow-sm">
              {picture && (
                <img
                  src="https://via.placeholder.com/300"
                  alt="profile"
                  className="rounded-md"
                />
              )}
              {!picture && (
                <svg
                  className="w-[300px] h-[300px] rounded-md border p-4"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                </svg>
              )}
            </div>
            <div className="bg-white px-8 py-12 rounded-lg shadow-md w-full max-w-lg">
              <div className="mb-4">
                <strong>Name:</strong> Applicant
              </div>
              <div className="mb-4">
                <strong>Email:</strong> {email}
              </div>
              <div className="w-full bg-tecruitSpecial hover:bg-tecruitPrimary  text-white rounded-lg py-2 font-semibold">
                <button
                  onClick={() => navigate("/profile/edit")}
                  className="w-full transition duration-300"
                >
                  Edit Profile
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
        </div>
      ) : (
        <p className="text-center py-10">Loading user data...</p>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="modal fixed inset-1/3 sm:inset-4 md:inset-6 shadow-lg p-8 bg-gray-400 text-white rounded">
          <div className="modal-content">
            <h3 className="text-xl font-semibold text-black py-5">
              Confirm Deletion
            </h3>
            <p>
              Are you sure you want to delete your account? This action cannot
              be undone.
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

export default Profile;
