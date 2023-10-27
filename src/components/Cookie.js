// CookieBanner.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCookieState } from "../store/features/commonState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function CookieBanner() {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const cookiesAccepted = document.cookie
      .split("; ")
      .find((row) => row.startsWith("cookiesAccepted"));
    const cookiesDeclined = document.cookie
      .split("; ")
      .find((row) => row.startsWith("cookiesDeclined"));
    if (
      (cookiesAccepted && cookiesAccepted.split("=")[1] === "true") ||
      (cookiesDeclined && cookiesDeclined.split("=")[1] === "true")
    ) {
      setIsAccepted(true);
      dispatch(addCookieState(true));
      setIsModalOpen(false);
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [dispatch]);

  const acceptCookies = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    document.cookie = `cookiesAccepted=true; expires=${date.toUTCString()}; path=/`;
    document.body.style.overflow = "Scroll";
    setIsAccepted(true);
    dispatch(addCookieState(true));
    setIsModalOpen(false);
  };

  const declineCookies = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);  
    document.cookie = `cookiesDeclined=true; expires=${date.toUTCString()}; path=/`;
    document.body.style.overflow = "Scroll";
    setIsAccepted(true);
    dispatch(addCookieState(true));
    setIsModalOpen(false);
  };

  return (
    <>
      {!isAccepted && !isModalOpen && (
        <div className="fixed bottom-0 w-full bg-[#e0e0e0] text-black text-center p-10 sm:px-3 z-50 shadow-top">
          <p className="text-sm">
            This platform uses cookies to ensure a seamless user experience. By
            clicking "Accept", you agree to our use of cookies.
            <span className="block sm:inline sm:px-1">
              Alternatively, you can choose to decline cookies. For more
              information, read our
              <span
                className="cursor-pointer font-bold underline px-1"
                onClick={() => setIsModalOpen(true)}
              >
                cookie policy
              </span>
              .
            </span>
          </p>

          <div className="flex justify-center items-center gap-6 py-6">
            <button
              className="px-16 sm:px-14 py-2 bg-black text-tecruitSecondary rounded-full cursor-pointer"
              onClick={acceptCookies}
            >
              Accept
            </button>
            <button
              className="px-16 sm:px-14 py-2 border border-black rounded-full cursor-pointer"
              onClick={declineCookies}
            >
              Decline
            </button>
          </div>
        </div>
      )}
      {!isAccepted && isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-[#e0e0e0] p-10 rounded-sm w-1/2 sm:w-[95%] md:w-3/4 lg:w-3/4 xl:w-3/4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Cookie Policy</h2>
              <FontAwesomeIcon
                icon={faXmark}
                className="text-xl cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              />
            </div>
            <p>
              This is currently a hobby project and does not store any personal
              information through cookies. The cookies used are only for
              enhancing user experience such as maintaining session states
              across page loads. There are no other functionalities implemented
              to store user data. By clicking "Accept", you agree to the use of
              these cookies.
            </p>
            <div className="flex justify-center items-center gap-6 py-6">
              <button
                className="px-16 sm:px-14 py-2 bg-black text-tecruitSecondary rounded-full cursor-pointer"
                onClick={acceptCookies}
              >
                Accept
              </button>
              <button
                className="px-16 sm:px-14 py-2 border border-black rounded-full cursor-pointer"
                onClick={declineCookies}
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CookieBanner;
