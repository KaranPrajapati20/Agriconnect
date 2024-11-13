import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './Navbar';
import Capsicum from '../assets/Capsicum.png';
import brinjal from '../assets/brinjal.png';
import Cabbage from '../assets/cabage.png';
import Corn from '../assets/cone.png';
import Potato from '../assets/Potato.png';
import Tomato from '../assets/Tomato.png';
import Onion from '../assets/Onion.png';
import Brocoli from '../assets/Brocoli.png';
import Apple from '../assets/Apple.png';
import Pea from '../assets/Pea.png';
import pupkin from '../assets/pupkin.png';
import Garlic from '../assets/Garlic.png';
import turnip from '../assets/turnip.png';
import Carret from '../assets/Carret.png';

const crops = [
  { name: 'Bell pepper', image: Capsicum },
  { name: 'Brinjal', image: brinjal },
  { name: 'Cabbage', image: Cabbage },
  { name: 'Corn', image: Corn },
  { name: 'Potato', image: Potato },
  { name: 'Peas', image: Pea },
  { name: 'Apple', image: Apple },
  { name: 'Broccoli', image: Brocoli },
  { name: 'Tomato', image: Tomato },
  { name: 'Onion', image: Onion },
  { name: 'Pumpkin', image: pupkin },
  { name: 'Garlic', image: Garlic },
  { name: 'Turnip', image: turnip },
  { name: 'Carrot', image: Carret },
];

const CropTips = () => {
  const navigate = useNavigate();

  const handleImageClick = (cropName) => {
    navigate(`/tips/${cropName}`);
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-10 md:text-3xl font-bold mb-6 text-left border-l-4 border-green-500 pl-4">Crop Tips</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {crops.map((crop, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleImageClick(crop.name)}
            >
              <img
                src={crop.image}
                alt={crop.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover mb-2 border-4 border-gray-200" 
              />
              <p className="text-sm md:text-lg font-semibold text-gray-700 mt-2">{crop.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CropTips;
