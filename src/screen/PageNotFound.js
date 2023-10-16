import React from "react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 sm:px-4">
      <div className="text-center">
        <h1 className="text-4xl sm:text-3xl font-bold text-tecruitSpecial">404 - Page Not Found</h1>
        <p className="mt-4 text-md text-tecruitRedish">
          Oops! The page you are looking for not built yet.
        </p>
        <p className="mt-4 text-md text-tecruitRedish">
          Option to go back the home page.
        </p>
        <button
          className="mt-8 px-4 py-2 bg-tecruitSpecial hover:bg-gray-700 text-white rounded-lg focus:outline-none"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;