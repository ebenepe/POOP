// Necessary imports
import './App.css';
import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import AdminDashboard from './components/AdminDashboard'
import AdminLogin from './components/AdminLogin';
import Form from './components/Form'
import PatientLogin from './components/PatientLogin'

// 
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<PatientLogin />} />
        <Route path="/form" element={<Form />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        
        </Routes></BrowserRouter>
    </div>
  );
}

export default App;
