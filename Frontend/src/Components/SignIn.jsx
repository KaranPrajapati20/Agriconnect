import React, { useState } from 'react';
import Lottie from 'lottie-react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import signInAnimation from '../assets/Animation - 1723865883450.json';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // Updated import

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Email: '',
    Password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/sign-in', formData);
      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(formData));
        navigate('/home'); // Redirect to home upon successful login
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const togglePasswordView = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleSignIn = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential); // Use the correct function
    //   console.log('Google sign-in successful:', decoded);
    localStorage.setItem('user', JSON.stringify(decoded));
      navigate('/home'); 
    } catch (error) {
      console.error('Google sign-in failed:', error);
    }
  };

  const handleGoogleSignInError = () => {
    console.log('Google sign-in failed');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm transition-all">
        <div className="flex flex-col items-center mb-4">
          <Lottie animationData={signInAnimation} className="w-16 h-16 mb-2" />
          <h2 className="text-xl font-semibold text-blue-600">AgreeConnect</h2>
        </div>

        <h1 className="text-xl font-semibold mb-6 text-center text-gray-800">Sign In</h1>

        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <div className="flex flex-col">
            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              placeholder="Email Address"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="Password"
              value={formData.Password}
              onChange={handleChange}
              placeholder="Password"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={togglePasswordView}
              className="absolute right-3 top-3 text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center justify-center mt-4 space-x-2">
          <GoogleLogin
            onSuccess={handleGoogleSignIn}
            onError={handleGoogleSignInError}
            useOneTap
            render={(renderProps) => (
              <button
                type="button"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="flex items-center justify-center w-full bg-white border border-gray-300 text-gray-800 font-semibold py-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <FcGoogle className="w-5 h-5 mr-2" />
                Sign in with Google
              </button>
            )}
          />
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
