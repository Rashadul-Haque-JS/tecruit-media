import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; //noted
import { addAuthToken } from '../../store/features/commonState'; //noted
import { login} from '../../api/api';
import { useNavigate } from 'react-router-dom';


const LoginCard = ({setSignup}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await login({ email, password });
      dispatch(addAuthToken(response.data.token));
      navigate('/');
    } catch (error) {
      console.error('An error occurred:', error);
      
    }
    
    setEmail('');
    setPassword('');
    setRememberMe(false);
  };


  return (
    <div className="md:w-[400px] lg:w-[400px] xl:w-[400px] w-1/4 sm:w-full shadow-shade mt-6 px-8 py-6 sm:px-4 sm:mx-0 bg-tecruitSecondary rounded-sm">
      <form onSubmit={handleSubmit}>
        <div className="bg-tecruitPrimary mb-4 grid h-28 place-items-center text-tecruitSecondary rounded shadow-shade">
          <h3 className="text-3xl">Sign In</h3>
        </div>
        <div className="flex flex-col gap-4">
          <div className="relative">
            <label htmlFor="email" className="text-gray-700 text-lg">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              onChange={handleEmailChange}
              value={email}
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="text-gray-700 text-lg">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              onChange={handlePasswordChange}
              value={password}
            />
          </div>
          <div className="flex items-center gap-2 -ml-2.5">
            <input
              type="checkbox"
              id="remember"
              className="text-green-500 border rounded-md"
              onChange={handleRememberMeChange}
              checked={rememberMe}
            />
            <label htmlFor="remember" className="text-gray-700 text-base">
              Remember Me
            </label>
          </div>
        </div>
        <div className="pt-0">
          <button  className="w-full py-3 text-tecruitSecondary bg-gradient-to-r from-green-500 to-green-700 rounded-lg focus:outline-none">
            Sign In
          </button>
          <div className="mt-6 flex justify-center text-gray-700 text-base">
            Don't have an account?{' '}
            <span onClick={()=>setSignup(true)} href="#signup" className="ml-1 font-bold text-blue-gray text-base cursor-pointer">
              Sign up
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginCard;


