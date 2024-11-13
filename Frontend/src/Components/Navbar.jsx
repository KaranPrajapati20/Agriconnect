import React, { useState } from 'react';
import logo from "../assets/Logo3.png";

const NavBar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav style={{ backgroundColor: '#2F4F4F' }} className="text-white py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center px-4">
                
                {/* Logo Section */}
                <div className="flex items-center">
                    <img src={logo} alt="AgriConnect Logo" className="h-16 w-16 sm:h-20 sm:w-20 mr-2" />
                    <span className="text-xl sm:text-2xl font-bold">AgriConnect</span>
                </div>
                
                {/* Navigation Links for Larger Screens */}
                <ul className="hidden md:flex space-x-4 sm:space-x-8 text-sm sm:text-lg">
                    <li><a href="/home" className="hover:text-orange-400">Home</a></li>
                    <li><a href="/disease-detection" className="hover:text-orange-400">Disease Detection</a></li>
                    <li><a href="/goverment-schem" className="hover:text-orange-400">Government Schemes</a></li>
                    <li><a href="/tips-trick" className="hover:text-orange-400">Tips and Tricks</a></li>
                    <li><a href="/news" className="hover:text-orange-400">News</a></li>
                    <li><a href="/marketplace" className="hover:text-orange-400">MarketPlace</a></li>
                    <li><a href="/profile" className="hover:text-orange-400">Profile</a></li>
                </ul>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Links */}
            {isMobileMenuOpen && (
                <ul className="md:hidden bg-gray-800 text-white flex flex-col space-y-4 p-4">
                    <li><a href="/home" className="hover:text-orange-400">Home</a></li>
                    <li><a href="/disease-detection" className="hover:text-orange-400">Disease Detection</a></li>
                    <li><a href="/goverment-schem" className="hover:text-orange-400">Government Schemes</a></li>
                    <li><a href="/tips-trick" className="hover:text-orange-400">Tips and Tricks</a></li>
                    <li><a href="/news" className="hover:text-orange-400">News</a></li>
                    <li><a href="/marketplace" className="hover:text-orange-400">MarketPlace</a></li>
                    <li><a href="/profile" className="hover:text-orange-400">Profile</a></li>
                </ul>
            )}
        </nav>
    );
};

export default NavBar;
