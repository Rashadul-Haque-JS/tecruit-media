import React from "react";

const Home = () => {
  return (
    <div className="bg-black min-h-screen flex justify-center">
      <div className="bg-black py-20 w-4/5 sm:w-full sm:px-4 h-full flex justify-center items-center">
        <div className="hero-container w-full h-96 bg-cover bg-center relative">
          <div className="relative z-10 text-white text-center">
            <h1 className="text-4xl sm:text-6xl font-bold">Welcome to Our Website</h1>
            <p className="text-lg sm:text-xl mt-4">Discover amazing things here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;


