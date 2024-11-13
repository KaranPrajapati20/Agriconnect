import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './Navbar'; 

const GovernmentScheme = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/goverment-schem');
        setSchemes(response.data.GovermentSchems); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the schemes data:", error);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-700 text-lg">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center p-4">{error}</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <NavBar /> 

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl mb-10 md:text-3xl font-bold mb-6 text-left border-l-4 border-green-500 pl-4">Government Schemes</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"></div>
        {schemes.map((scheme, index) => (
          <div key={index} className="mb-6 bg-white shadow-md rounded-lg border border-gray-200">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">{scheme.Schem_Name}</h2>
              <p className="text-gray-800 mb-4 leading-relaxed">{scheme.Schem_Details}</p>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Opening Date:</strong> {formatDate(scheme.Opening_Date)}
                </p>
                <p className="text-sm text-gray-600">
                
                </p>
              </div>
              <div className="text-right">
                <a
                  href={scheme.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white text-center py-2 px-6 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GovernmentScheme;
