import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faOtter } from "@fortawesome/free-solid-svg-icons";

const SubscribeForm = () => {
  const [email, setEmail] = useState('');
  const location = useLocation();
  const { pathname } = location;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = () => {
    // Implement your subscribe logic here
    console.log(`Subscribed with email: ${email}`);
  };

  return (
    <div className="mx-auto px-6 pt-6 pb-12 bg-gray-200 rounded-lg shadow-lg sm:grid sm:grid-cols-1 sm:gap-2" style={{ display: pathname === '/' ? 'block' : 'none' }}>
      <div className='flex justify-center items-center py-4'>
        <FontAwesomeIcon icon={faOtter} className="text-tecruitPrimary text-5xl mx-auto w-fit" />
      </div>
      <h2 className="text-2xl text-tecruitPrimary font-semibold text-center mb-4">Subscribe to Our Newsletter</h2>
      <div className="flex justify-center flex-wrap sm:flex-row sm:items-center sm:gap-2">
        <input
          type="email"
          className="w-2/5 sm:w-full p-3 border border-gray-300 rounded-r-none sm:rounded-r-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
        />
        <button
          className="sm:w-full bg-tecruitPrimary text-tecruitSecondary px-4 py-3 rounded-l-none sm:rounded-l-lg rounded-lg transition-colors hover:bg-gray-900 focus:outline-none"
          onClick={handleSubscribe}
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default SubscribeForm;
