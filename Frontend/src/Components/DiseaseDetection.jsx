import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import Navbar from './Navbar'; // Import the Navbar component
import Disease_Detection_Image from '../assets/Disease_Detection_Image.png';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [disease, setDisease] = useState(null);
  const [diseaseDetails, setDiseaseDetails] = useState(null);
  const [cropDetails, setCropDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);

  const formattedReasons = diseaseDetails?.Reasons?.replace(/==/g, '<br />');
  const formattedDiseasDetail = diseaseDetails?.Disease_Details?.replace(/==/g, '<br />');
  const formattedPrecation = diseaseDetails?.Management_Strategies?.replace(/==/g, '<br />');
  const formattedDiagnosis = diseaseDetails?.Diagnosis?.replace(/==/g, '<br />');

  const formattedSoils = cropDetails?.Soils?.replace(/==/g, '<br />');
  const formattedWeather = cropDetails?.Weather?.replace(/==/g, '<br />');
  const formattedMinerals_and_Nutrients = cropDetails?.Minerals_and_Nutrients?.replace(/==/g, '<br />');
  const formattedAdditional_Tips = cropDetails?.Additional_Tips?.replace(/==/g, '<br />');
  const formattedWater_Treatment = cropDetails?.Water_Treatment?.replace(/==/g, '<br />');

  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);

  const startCamera = () => {
    setCameraActive(true);
  };

  const stopCamera = () => {
    setCameraActive(false);
    setPreview(null);
    setImage(null);
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setPreview(imageSrc);
      const blob = dataURLtoBlob(imageSrc);
      const file = new File([blob], 'captured_image.jpg', { type: 'image/jpeg' });
      setImage(file);
      setCameraActive(false); // Stop the camera after capturing
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      alert("No image selected");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', image);

      // Send image for disease detection
      const detectResponse = await axios.post('http://127.0.0.1:5000/api/detect', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const detectedDisease = detectResponse.data.disease;
      setDisease(detectedDisease);

      // Fetch disease details
      const detailsResponse = await axios.post('http://localhost:8000/api/v1/disease-detection/disease-details', {
        Disease_Name: detectedDisease
      });

      const diseaseData = detailsResponse.data;
      setDiseaseDetails(diseaseData.Disease_Detail || 'No details available');
      setCropDetails(diseaseData.Crops_Details || { Crop_Name: 'No crop details available' });
    } catch (error) {
      console.error("Error detecting disease:", error);
      alert("An error occurred while detecting the disease.");
    } finally {
      setLoading(false);
    }
  };

  // Convert base64 to Blob
  const dataURLtoBlob = (dataURL) => {
    const [header, data] = dataURL.split(',');
    const mime = header.split(':')[1].split(';')[0];
    const bytes = atob(data);
    const buffer = new ArrayBuffer(bytes.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < bytes.length; i++) {
      view[i] = bytes.charCodeAt(i);
    }
    return new Blob([buffer], { type: mime });
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar /> {/* Add the Navbar component */}

      <div className="flex-grow bg-gray-50 p-6 lg:p-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-left border-l-4 border-green-500 pl-4">Plant Disease Detector </h1>

        <div className="relative flex flex-col items-center">
          <div className="relative w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
            <div className="relative flex justify-center mb-6">
              <img
                src={preview || Disease_Detection_Image}
                alt="Disease Detection"
                className={`w-full h-full border border-gray-300 rounded-lg object-cover ${cameraActive ? 'opacity-30' : ''}`}
              />
            </div>

            <div className="flex justify-center space-x-4 mb-6">
              <button
                onClick={handleUploadClick}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none"
              >
                Upload Picture
              </button>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
              />
              <button
                onClick={startCamera}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none"
              >
                Take Picture
              </button>
            </div>

            {cameraActive && (
              <div className="w-full flex flex-col items-center mb-6">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="border border-gray-300 rounded-lg"
                />
                <button
                  onClick={capture}
                  className="mt-4 px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 focus:outline-none"
                >
                  Capture Photo
                </button>
                <button
                  onClick={stopCamera}
                  className="mt-2 px-5 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 focus:outline-none"
                >
                  Stop Camera
                </button>
              </div>
            )}

            <button
              onClick={handleSubmit}
              className="w-full px-5 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 focus:outline-none"
            >
              {loading ? "Detecting..." : "Detect Disease"}
            </button>
          </div>

          {disease && (
  <div className="w-full max-w-5xl mx-auto text-left text-black mt-6 p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
    <p className="font-bold text-xl mb-2">Disease Name: {disease}</p>
    
    {diseaseDetails ? (
      <div className="mb-4">
        <p className="bg-gray-800 text-white p-2 rounded-md font-medium">Crop Name: {diseaseDetails?.Crop_Name || 'No crop details available'}</p>
        <h5 className="text-xl mt-2 mb-2 p-2 bg-gray-200 rounded-md font-medium">Disease Details</h5>
        <p dangerouslySetInnerHTML={{ __html: formattedDiseasDetail || 'No details available' }} />
        <h5 className="text-xl mt-2 mb-2 p-2 bg-gray-200 rounded-md font-medium">Disease Reason</h5>
        <p dangerouslySetInnerHTML={{ __html: formattedReasons || 'No reasons available' }} />
        <h5 className="text-xl mt-2 mb-2 p-2 bg-gray-200 rounded-md font-medium">Disease Diagnosis</h5>
        <p dangerouslySetInnerHTML={{ __html: formattedDiagnosis || 'No diagnosis available' }} />
        <h5 className="text-xl mt-2 mb-2 p-2 bg-gray-200 rounded-md font-medium">Precaution</h5>
        <p dangerouslySetInnerHTML={{ __html: formattedPrecation || 'No precautions available' }} />
      </div>
    ) : (
      <p>No disease details available</p>
    )}

    {/* {cropDetails ? (
      <div>
        <p className="font-bold text-xl mb-2">Crop Name: {cropDetails?.Crop_Name || 'No crop details available'}</p>
        <h5 className="text-xl mt-2 mb-2 p-2 bg-gray-200 rounded-md font-medium">Soils</h5>
        <p dangerouslySetInnerHTML={{ __html: formattedSoils || 'No soil details available' }} />
        <h5 className="text-xl mt-2 mb-2 p-2 bg-gray-200 rounded-md font-medium">Weather</h5>
        <p dangerouslySetInnerHTML={{ __html: formattedWeather || 'No weather details available' }} />
        <h5 className="text-xl mt-2 mb-2 p-2 bg-gray-200 rounded-md font-medium">Minerals and Nutrients</h5>
        <p dangerouslySetInnerHTML={{ __html: formattedMinerals_and_Nutrients || 'No mineral details available' }} />
        <h5 className="text-xl mt-2 mb-2 p-2 bg-gray-200 rounded-md font-medium">Additional Tips</h5>
        <p dangerouslySetInnerHTML={{ __html: formattedAdditional_Tips || 'No additional tips available' }} />
        <h5 className="text-xl mt-2 mb-2 p-2 bg-gray-200 rounded-md font-medium">Water Treatment</h5>
        <p dangerouslySetInnerHTML={{ __html: formattedWater_Treatment || 'No water treatment details available' }} />
      </div>
    ) : (
      <p>No crop details available</p>
    )} */}
  </div>
)}

        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
