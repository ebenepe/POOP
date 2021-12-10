// Necessary imports
import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { auth } from "./firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import ProviderDashboard from "./components/ProviderDashboard";
import Form from "./components/Form";
import Submitted from "./components/Submitted";
import Login from "./components/Login";
import PatientData from "./components/PatientData";

function App() {
  // setting up hooks from react-firebase-hooks
  const [user, loading, error] = useAuthState(auth);

  return (
    // main app container
    <div className="App">
      {/* POOP logo display */}
      <img id="logo" src="/images/poop.png" alt="poop logo" />
      {/* setting up react router routes */}
      <BrowserRouter>
        <Routes>
          {/* homepage / patient login */}
          <Route
            strict
            path="/"
            element={
              <>
                <h1 className="login-header">Patient Login Portal</h1>
                {/* loginRedirect determines page to navigate to after login */}
                <Login loginRedirect="/form" nextPageName="form" />
              </>
            }
          />
          {/* patient form */}
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
                    {/* link back to login / homepage */}
                    <NavLink to="/">create an account or log in</NavLink> to
                    view the form.
                  </p>
                </div>
              )
            }
          />
          {/* form submission notification page */}
          <Route path="/submitted" element={<Submitted />} />
          {/* provider login page */}
          <Route
            path="/provider"
            element={
              <>
                <h1 className="login-header">Provider Login Portal</h1>
                <p className="login-header">
                  Note: After creating a new provider account, you must contact
                  the system administrator for authorization.
                </p>
                {/* login element that redirects to provider dashboard upon login*/}
                <Login
                  loginRedirect="/provider/dashboard"
                  nextPageName="dashboard"
                />
              </>
            }
          />
          {/* provider dashboard */}
          <Route path="/provider/dashboard" element={<ProviderDashboard />} />
          {/* single patient data page (must be accessed via dashboard) */}
          <Route
            path="/provider/dashboard/patient-data"
            element={<PatientData />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
