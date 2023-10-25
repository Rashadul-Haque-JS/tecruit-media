import React, { useState ,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faOtter } from "@fortawesome/free-solid-svg-icons";
import { addSubscriber } from '../../api/api';

const SubscribeForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const { pathname } = location;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = async(e) => {
    e.preventDefault();
    try {
     const response = await addSubscriber(email);
      setEmail('');
      setMessage(response.data.message);
      setError('');
    }catch (error) {
      setMessage('');
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    if (message || error){
      setTimeout(() => {
        setMessage('');
        setError('');
      }, 5000);
    }
  },[ message, error])

  return (
    <div className="mx-auto px-6 pt-6 pb-12 bg-gray-200 rounded-lg shadow-lg sm:grid sm:grid-cols-1 sm:gap-2" style={{ display: pathname === '/' ? 'block' : 'none' }}>
      <div className='flex justify-center items-center py-4'>
        <FontAwesomeIcon icon={faOtter} className="text-tecruitPrimary text-5xl mx-auto w-fit" />
      </div>
      <h2 className="text-2xl text-tecruitPrimary font-semibold text-center mb-4">Subscribe to Our Newsletter</h2>
      {message && <p className="text-tecruitPrimary text-center py-4">{message}</p>}
      {error && <p className="text-red-600 text-center py-4">{error}</p>}
      <form onSubmit={handleSubscribe} className="flex justify-center flex-wrap sm:flex-row sm:items-center sm:gap-2">
        <input
          type="email"
          className="w-2/5 sm:w-full p-3 border border-gray-300 rounded-r-none sm:rounded-r-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
        />
        <button
          type="submit"
          className="sm:w-full bg-tecruitPrimary text-tecruitSecondary px-4 py-3 rounded-l-none sm:rounded-l-lg rounded-lg transition-colors hover:bg-gray-900 focus:outline-none"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default SubscribeForm;
