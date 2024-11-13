import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import NavBar from './Navbar';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HomePage = () => {
    const navigate = useNavigate(); // Use navigate for handling redirects

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <>
            <NavBar />

            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center h-72 sm:h-screen"
                style={{ backgroundImage: 'url(https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg)' }}
                data-aos="fade-up"
            >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative h-full flex flex-col justify-center items-center text-center text-white p-4 sm:p-0">
                    <h1
                        className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-2 sm:mb-4"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        Empowering Agriculture with Technology
                    </h1>
                    <p className="text-sm sm:text-xl md:text-2xl mb-4 sm:mb-8" data-aos="fade-up" data-aos-delay="400">
                        Improving yield, sustainability, and access to vital information.
                    </p>
                    <a
                        href="#learn-more"
                        className="bg-orange-500 text-black font-semibold px-4 py-2 sm:px-8 sm:py-4 rounded-lg hover:bg-orange-400 transition-transform transform hover:scale-105"
                        data-aos="fade-up"
                        data-aos-delay="600"
                    >
                        Discover More
                    </a>
                </div>
            </section>

            {/* Services Section */}
            <section id="learn-more" className="py-10 sm:py-20 bg-gray-100">
                <div className="container mx-auto text-center px-4 sm:px-0">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12" data-aos="fade-up">
                        Our Key Features
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-12">
                        <div
                            className="bg-white p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer"
                            data-aos="fade-up"
                            data-aos-delay="200"
                            onClick={() => navigate('/disease-detection')} // Redirect to Disease Detection page
                        >
                            <h3 className="text-xl sm:text-2xl font-bold mb-4">Disease Detection</h3>
                            <p>Leverage AI to detect and diagnose crop diseases in real-time, ensuring early intervention and better yield.</p>
                        </div>
                        <div
                            className="bg-white p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer"
                            data-aos="fade-up"
                            data-aos-delay="400"
                            onClick={() => navigate('/weather-updates')} // Redirect to Weather Updates page
                        >
                            <h3 className="text-xl sm:text-2xl font-bold mb-4">Weather Updates</h3>
                            <p>Get precise, up-to-date weather forecasts tailored to your farm's location, enabling smarter decisions.</p>
                        </div>
                        <div
                            className="bg-white p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer"
                            data-aos="fade-up"
                            data-aos-delay="600"
                            onClick={() => navigate('/goverment-schem')} // Redirect to Government Schemes page
                        >
                            <h3 className="text-xl sm:text-2xl font-bold mb-4">Government Schemes</h3>
                            <p>Stay informed on government initiatives and schemes that offer financial support and benefits for farmers.</p>
                        </div>
                        <div
                            className="bg-white p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer"
                            data-aos="fade-up"
                            data-aos-delay="800"
                            onClick={() => navigate('/tips-trick')} // Redirect to Farming Tips page
                        >
                            <h3 className="text-xl sm:text-2xl font-bold mb-4">Farming Tips & Tricks</h3>
                            <p>Access best practices, tips, and innovative techniques to optimize your farming processes.</p>
                        </div>
                        <div
                            className="bg-white p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer"
                            data-aos="fade-up"
                            data-aos-delay="1000"
                            onClick={() => navigate('/news')} // Redirect to News page
                        >
                            <h3 className="text-xl sm:text-2xl font-bold mb-4">Agricultural News</h3>
                            <p>Stay updated with the latest trends and news in the agricultural industry worldwide.</p>
                        </div>
                        <div
                            className="bg-white p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer"
                            data-aos="fade-up"
                            data-aos-delay="1200"
                            onClick={() => navigate('/marketplace')} // Redirect to Marketplace Prices page
                        >
                            <h3 className="text-xl sm:text-2xl font-bold mb-4">Commodity Prices</h3>
                            <p>Track the current market prices of various commodities to make informed selling and buying decisions.</p>
                        </div>
                    </div>
                </div>
                
            </section>
            {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between">
            <p>© 2024 Farming Solutions. All Rights Reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-yellow-400">Privacy Policy</a>
              <a href="#" className="hover:text-yellow-400">Terms of Service</a>
              <a href="#" className="hover:text-yellow-400">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
        </>
    );
};

export default HomePage;
