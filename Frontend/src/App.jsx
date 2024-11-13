import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import SignIn from './Components/SignIn.jsx';
import DiseaseDetection from './Components/DiseaseDetection.jsx'
import GovernmentScheme from './Components/GovermentSchem.jsx';
import SignUp from './Components/SignUp.jsx';
import HomePage from './Components/HomePage.jsx';
import TipsAndTricks from './Components/TipsAndTricks.jsx';
import TipsPage from './Components/TipsPage.jsx';
import News from './Components/News.jsx';
import Weather from './Components/Weather.jsx';
import Marketplace from './Components/Marketplace.jsx';
import Profile from './Components/Profile.jsx';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/goverment-schem" element={<GovernmentScheme/>} />
    <Route path="/disease-detection" element={<DiseaseDetection/>} />
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/" element={<SignIn/>}/>
    <Route path="/home" element={<HomePage/>}/>
    <Route path="/tips-trick" element={<TipsAndTricks/>}/>
    <Route path="/tips/:cropName" element={<TipsPage />} />
    <Route path="/news" element={<News />} />
    <Route path="/weather" element={<Weather />} />
    <Route path="/marketplace" element={<Marketplace />} />
    <Route path="/profile" element={<Profile />} />

    </Routes>
  </BrowserRouter>
  )
}

export default App
