import './App.css';
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import React, {useState} from "react";
import Home from './Pages/Home';
import Login from './Pages/Login';
import ErrorPage from './Pages/ErrorPage';
import About from './Pages/About';
import Profile from './Pages/Profile';
import Register from './Pages/Register';

function App() {
  return <Router> 
    <nav>
      <Link to="/"> Home </Link>
      <Link to="/login"> Login </Link>
      <Link to="/register"> Register </Link>
      <Link to="/about"> About </Link>
      <Link to="/profile"> Profile </Link>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile/:username" element={<Profile />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
    <div>
      footer
    </div>
  </Router>;


}

export default App;
