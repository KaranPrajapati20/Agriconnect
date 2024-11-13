import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar'; 

const TipsPage = () => {
  const { cropName } = useParams(); 
  const [cropDetails, setCropDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCropDetails = async () => {
      try {
        const response = await axios.post('http://localhost:8000/api/v1/disease-detection/tips-tricks', {
          Crop_Name: cropName,
        });

        setCropDetails(response.data.Crops_Details || 'No crop details available');
      } catch (error) {
        console.error('Error fetching crop details:', error);
        setCropDetails('An error occurred while fetching crop details.');
      } finally {
        setLoading(false);
      }
    };

    fetchCropDetails();
  }, [cropName]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-lg font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (!cropDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-lg font-semibold text-gray-700">No details available</div>
      </div>
    );
  }

  const formattedSoils = cropDetails?.Soils?.replace(/==/g, '<br />');
  const formattedWeather = cropDetails?.Weather?.replace(/==/g, '<br />');
  const formattedMineralsAndNutrients = cropDetails?.Minerals_and_Nutrients?.replace(/==/g, '<br />');
  const formattedAdditionalTips = cropDetails?.Additional_Tips?.replace(/==/g, '<br />');
  const formattedWaterTreatment = cropDetails?.Water_Treatment?.replace(/==/g, '<br />');

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar /> 

      <div className="flex-grow bg-gray-50 p-6 lg:p-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Crop Details for {cropName}</h2>

        <div className="w-full max-w-5xl mx-auto text-left text-black mt-6 p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
          <h5 className="text-xl font-medium mb-4">Crop Name: {cropDetails?.Crop_Name || 'No crop details available'}</h5>
          <h5 className="text-xl mt-2 mb-2 p-2 bg-gray-200 rounded-md font-medium">Soils</h5>
          <p dangerouslySetInnerHTML={{ __html: formattedSoils || 'No soil details available' }} />
          <h5 className="text-xl mt-2 mb-2 p-2 bg-gray-200 rounded-md font-medium">Weather</h5>
          <p dangerouslySetInnerHTML={{ __html: formattedWeather || 'No weather details available' }} />
          <h5 className="text-xl mt-2 mb-2 p-2 bg-gray-200 rounded-md font-medium">Minerals and Nutrients</h5>
          <p dangerouslySetInnerHTML={{ __html: formattedMineralsAndNutrients || 'No mineral details available' }} />
          <h5 className="text-xl mt-2 mb-2 p-2 bg-gray-200 rounded-md font-medium">Additional Tips</h5>
          <p dangerouslySetInnerHTML={{ __html: formattedAdditionalTips || 'No additional tips available' }} />
          <h5 className="text-xl mt-2 mb-2 p-2 bg-gray-200 rounded-md font-medium">Water Treatment</h5>
          <p dangerouslySetInnerHTML={{ __html: formattedWaterTreatment || 'No water treatment details available' }} />
        </div>
      </div>
    </div>
  );
};

export default TipsPage;
