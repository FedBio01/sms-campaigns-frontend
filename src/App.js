import './App.css';
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
//import React, {useState} from "react";
import Home from './Pages/Home';
import Login from './Pages/Login/Login';
import ErrorPage from './Pages/ErrorPage';
import About from './Pages/About';
import Profile from './Pages/Profile';
import SignUp from './Pages/SignUp/Signup';

function App() {


  /*if(!token) {
    return <Login />
  }*/
  //else{
    return <Router> 
    <nav>
      <Link to="/"> Home </Link>
      <Link to="/login"> Login </Link>
      <Link to="/signup"> Signup </Link>
      <Link to="/about"> About </Link>
      <Link to="/profile"> Profile </Link>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile/:username" element={<Profile />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </Router>;

  }

export default App;
