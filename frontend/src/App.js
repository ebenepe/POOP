// Necessary imports
import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";
import Form from "./components/Form";
import PatientLogin from "./components/PatientLogin";
import Submitted from "./components/Submitted";

function App() {

  // TODO - create landing page that routes appropriately given patient or admin login status

  // create states for patient logged in, form submitted, admin logged in
  const [loggedInPatient, setLoggedInPatient] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loggedInAdmin, setLoggedInAdmin] = useState(false);

  // check whether patient is logged in, redirect
  useEffect(() => {
    if (loggedInPatient) {
      window.location = "./form";
    }
    return;
    // trigger when state changes
  }, [loggedInPatient]);

  // check whether patient has submitted form, redirect
  useEffect(() => {
    if (formSubmitted) {
      window.location = "./submitted";
    }
  }, [formSubmitted]);

  // check whether admin has logged in, redirect
  useEffect(() => {
    if (loggedInAdmin) {
      window.location = "./admindashboard";
    }
  }, [loggedInAdmin]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            strict path="/"
            element={<PatientLogin setLoggedIn={setLoggedInPatient} />}
          />
          <Route
            path="/form"
            element={
              <Form
                setLoggedIn={setLoggedInPatient}
                setSubmitted={setFormSubmitted}
              />
            }
          />
          <Route path="/submitted" element={<Submitted />} />
          <Route
            path="/adminlogin"
            element={<AdminLogin setLoggedIn={setLoggedInAdmin} />}
          />
          <Route
            path="/admindashboard"
            element={<AdminDashboard setLoggedIn={setLoggedInAdmin} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
