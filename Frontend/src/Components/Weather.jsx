import React, { useState } from 'react';
import axios from 'axios';
import NavBar from './Navbar';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const getWeather = (lat, lon) => {
    setLoading(true);
    axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat: lat,
        lon: lon,
        appid: 'fecf2ac50ca037273d2f7f1f102817ef', // Make sure this is your valid API key
        units: 'metric',
      }
    })
    .then(response => {
      console.log('Weather Data:', response.data); // Log the data correctly
      setWeatherData(response.data);
      setLatitude(lat);
      setLongitude(lon);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather data.');
      setLoading(false);
    });
  };

  const handleGetWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          getWeather(latitude, longitude);
        },
        error => {
          console.error('Error getting location:', error);
          setError('Failed to get location.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
  };

  return (
    <>
      <NavBar />
      <div className="p-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-left">Weather Information</h1>
        <button 
          onClick={handleGetWeather} 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Get Weather
        </button>
        {loading && <p className="mt-4">Loading...</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {weatherData && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Weather in {weatherData.name}</h2>
            <p>Latitude: {latitude}</p>
            <p>Longitude: {longitude}</p>
            <p>Temperature: {weatherData.main.temp} °C</p>
            <p>Feels Like: {weatherData.main.feels_like} °C</p>
            <p>Temperature Min: {weatherData.main.temp_min} °C</p>
            <p>Temperature Max: {weatherData.main.temp_max} °C</p>
            <p>Pressure: {weatherData.main.pressure} hPa</p>
            <p>Sea Level: {weatherData.main.sea_level} hPa</p>
            <p>Ground Level: {weatherData.main.grnd_level} hPa</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Visibility: {weatherData.visibility / 1000} km</p>
            <p>Weather: {weatherData.weather[0].description}</p>
            <p>Cloudiness: {weatherData.clouds.all}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            <p>Wind Direction: {weatherData.wind.deg}°</p>
            <p>Sunrise: {formatTimestamp(weatherData.sys.sunrise)}</p>
            <p>Sunset: {formatTimestamp(weatherData.sys.sunset)}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Weather;
