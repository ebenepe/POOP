// Necessary imports
import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { auth } from "./firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";
import Form from "./components/Form";
import PatientLogin from "./components/PatientLogin";
import Submitted from "./components/Submitted";

function App() {
  // TODO - create landing page that routes appropriately given patient or admin login status
  // - add header that shows user who's currently logged in, a log out button

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
                  You are logged in as {user.displayName}.{" "}<br />
                  <NavLink to="/form">Click here to go to the form page</NavLink>
                </h3>
                <button onClick={logout}>Sign out</button>
                </>
              ) : (
                <>
                <PatientLogin />
                </>
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
            path="/adminlogin"
            element={<AdminLogin />}
          />
          <Route
            path="/admindashboard"
            element={<AdminDashboard />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
