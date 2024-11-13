import { useState } from "react";
import Lottie from 'lottie-react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { FcGoogle } from 'react-icons/fc'; 
import signUpAnimation from "../assets/Animation - 1723865883450.json";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';

import { jwtDecode } from 'jwt-decode'; // Updated import

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Name: '',
        Email: '',
        Password: '',
        PhoneNo: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/v1/sign-up', formData)
            .then((response) => {
                if (response.status === 201) { 
                    localStorage.setItem('user', JSON.stringify(formData));
                    navigate('/home');  // Redirect to home page
                }
            })
            .catch((error) => {
                console.error('Sign-up failed:', error.response ? error.response.data : error.message);
            });
    };

    const togglePasswordView = () => {
        setShowPassword(!showPassword);
    };

    const handleGoogleSignIn = async (credentialResponse) => {
        try {
            const { credential } = credentialResponse;
            // Decode the Google credential to get user information
            const userInfo = jwtDecode(credential); // Make sure to install jwt-decode

            console.log(userInfo.picture)
            // Prepare the data for sign-up
            const googleData = {
                Email: userInfo.email,
                Name: userInfo.name,
                Picture : userInfo.picture,
                phoneNo: formData.phoneNo, // Use phone number from the form
                password: 'GoogleLogin' // Optional: set a default password or handle it differently
            };

            const response = await axios.post('http://localhost:8000/api/v1/sign-up', googleData);
            if (response.status === 201) {
                localStorage.setItem('user', JSON.stringify(googleData));
                navigate('/home'); // Redirect to home page on success
            }
        } catch (error) {
            console.error('Google sign-up failed:', error.response ? error.response.data : error.message);
        }
    };

    const handleGoogleSignInError = () => {
        console.log('Google sign-in failed');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm transition-all">
                <div className="flex flex-col items-center mb-4">
                    <Lottie animationData={signUpAnimation} className="w-16 h-16 mb-2" />
                    <h2 className="text-xl font-semibold text-blue-600">AgreeConnect</h2>
                </div>

                <h1 className="text-xl font-semibold mb-6 text-center text-gray-800">Sign Up</h1>

                <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
                    <div className="flex flex-col">
                        <input
                            type="text"
                            name="Name"
                            value={formData.Name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                            autoComplete="off"
                        />
                    </div>
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
                            type={showPassword ? "text" : "password"}
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
                    <div className="flex flex-col">
                        <input
                            type="tel"
                            name="PhoneNo"
                            value={formData.PhoneNo}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                            autoComplete="off"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    >
                        Sign Up
                    </button>
                </form>

                <div className="flex items-center justify-center mt-4 space-x-2">
                    <GoogleLogin
                        onSuccess={handleGoogleSignIn}
                        onError={handleGoogleSignInError}
                        render={(renderProps) => (
                            <button
                                type="button"
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                className="flex items-center justify-center w-full bg-white border border-gray-300 text-gray-800 font-semibold py-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            >
                                <FcGoogle className="w-5 h-5 mr-2" />
                                Sign up with Google
                            </button>
                        )}
                    />
                </div>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <a href="/" className="text-blue-600 hover:underline">
                            Log In
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
