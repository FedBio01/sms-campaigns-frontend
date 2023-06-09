import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
//import React, {useState} from "react";
import Home from './Pages/Home';
import Login from './Pages/Login/Login';
import ErrorPage from './Pages/ErrorPage';
import About from './Pages/About';
import Profile from './Pages/Profile';
import SignUp from './Pages/SignUp/Signup';
import Campaigns from './Pages/Campaign/createCampaigns'
import Navbar from './Components/navbar.js';
import StatsCampaigns from './Pages/Campaign/statsCampaigns';
import VisualizeCampaigns from './Pages/Campaign/visualizeCampaigns';
import SendCampaigns from './Pages/Campaign/sendCampaign';

function App() {
    return <Router> 
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/createCampaigns" element={<Campaigns />} />
      <Route path="/statsCampaigns" element={<StatsCampaigns />} />
      <Route path="/sendCampaigns" element={<SendCampaigns />} />
      <Route path="/visualizeCampaigns" element={<VisualizeCampaigns />} />

      <Route path="/profile/:username" element={<Profile />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </Router>;

  }

export default App;
