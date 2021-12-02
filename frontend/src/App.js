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
import Login from "./components/Login"

// TO DO
// - check for permission ; ie on Dashboard page don't show table to patients

function App() {

  const [user, loading, error] = useAuthState(auth);

  // function to log out
  const logout = () => {
    signOut(auth);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            strict
            path="/"
            element={
              <>
                <h1>Patient Login Portal</h1>
                {/* ternary checks whether user is logged in, displays accordingly */}
                {user ? (
                  <>
                    <h3>
                      You are logged in as {user.displayName}. <br />
                      <NavLink to="/form">
                        Click here to go to the form page
                      </NavLink>
                    </h3>
                    <button onClick={logout}>Sign out</button>
                  </>
                ) : (
                    <Login loginRedirect="form" />
                )}
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
                <p>
                  You are not currently logged in. Please{" "}
                  <NavLink to="/">create an account or log in</NavLink> to view
                  the form.
                </p>
              )
            }
          />
          <Route path="/submitted" element={<Submitted />} />
          <Route
            path="/provider"
            element={
              <>
                <h1>Provider Login Portal</h1>
                <p>Note: After creating a new provider account, you must contact the system administrator for authorization.</p>
                {user ? (
                  <>
                    <h3>
                      You are logged in as {user.displayName}. <br />
                      <NavLink to="/provider/dashboard">
                        Click here to go to the provider dashboard page
                      </NavLink>
                    </h3>
                    <button onClick={logout}>Sign out</button>
                  </>
                ) : (
                    <Login loginRedirect="provider/dashboard" />
                )}
              </>
            }
          />
          <Route path="/provider/dashboard" element={<ProviderDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
