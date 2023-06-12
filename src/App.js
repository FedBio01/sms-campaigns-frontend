import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
//import React, {useState} from "react";
import Login from './Pages/Login/Login';
import ErrorPage from './Pages/ErrorPage';
import SignUp from './Pages/SignUp/Signup';
import Campaigns from './Pages/Campaign/createCampaigns'
import StatsCampaigns from './Pages/Campaign/statsCampaigns';
import VisualizeCampaigns from './Pages/Campaign/visualizeCampaigns';
import SendCampaigns from './Pages/Campaign/sendCampaign';

function App() {
    return <Router> 
    
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/create-campaigns" element={<Campaigns />} />
      <Route path="/stats-campaigns" element={<StatsCampaigns />} />
      <Route path="/send-campaigns" element={<SendCampaigns />} />
      <Route path="/visualize-campaigns" element={<VisualizeCampaigns />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </Router>;

  }

export default App;
