import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
//import React, {useState} from "react";
import Home from './Pages/Home';
import Login from './Pages/Login/Login';
import ErrorPage from './Pages/ErrorPage';
import About from './Pages/About';
import Profile from './Pages/Profile';
import SignUp from './Pages/SignUp/Signup';
import Sms from './Pages/Sms.js';
import Navbar from './Components/navbar.js';

function App() {


  /*if(!token) {
    return <Login />
  }*/
  //else{
    return <Router> 
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/sms" element={<Sms />} />
      <Route path="/profile/:username" element={<Profile />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </Router>;

  }

export default App;
