// Necessary imports
import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { auth } from "./firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import ProviderDashboard from "./components/ProviderDashboard";
import Form from "./components/Form";
import Submitted from "./components/Submitted";
import Login from "./components/Login";
import PatientData from "./components/PatientData"
import {useState} from 'react'

// TO DO
// - dynamically editing security rules / roles
// - look into firebase security functions

// - check for permission ; ie on Dashboard page don't show table to patients
// - look into loading ternary check for displaying "you are already logged in" etc so that it doesn't flash after logging in & before redirecting to form
// - add to submitted: record another response? log out?

// - add "logged in as ... " to provider dashboard

// OTHER PEOPLE
// - sort by date or patient name, etc
// - remove data display from bottom of form

function App() {
  const [user, loading, error] = useAuthState(auth);

  // function to log out
  const logout = () => {
    signOut(auth);
  };



  return (
    <div className="App">
      <img id="logo" src="/images/poop.png" alt="poop logo"/>
      <BrowserRouter>
        <Routes>
          <Route
            strict
            path="/"
            element={
              <>
                <h1 className="login-header">Patient Login Portal</h1>
                <Login loginRedirect="/form" nextPageName="form" />
              </>
            }
          />
          <Route
            path="/form"
            element={
              // if ternary statement prevents non-logged-in user from viewing form
              user ? (
                <Form />
              ) : // if not logged in, don't display login error message until the page is done loading
              loading ? null : (
                <div className="login-input">
                  <p>
                    You are not currently logged in. Please{" "}
                    <NavLink to="/">create an account or log in</NavLink> to
                    view the form.
                  </p>
                </div>
              )
            }
          />
          <Route path="/submitted" element={<Submitted />} />
          <Route
            path="/provider"
            element={
              <>
                <h1 className="login-header">Provider Login Portal</h1>
                <p className="login-header">
                  Note: After creating a new provider account, you must contact
                  the system administrator for authorization.
                </p>
                <Login
                  loginRedirect="/provider/dashboard"
                  nextPageName="dashboard"
                />
              </>
            }
          />
          <Route path="/provider/dashboard" element={<ProviderDashboard />} />
          <Route path="/provider/dashboard/patient-data" element={<PatientData />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
