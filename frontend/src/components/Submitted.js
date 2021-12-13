import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { NavLink } from "react-router-dom";

export default function Submitted() {
  // function for signing out
  const logout = async () => {
    await signOut(auth);
    // redirect to patient login after sign out
    window.location = "/";
  };

  return (
    <div className="login-input">
    {/* notify user of submission */}
      <p>Your response has been recorded.</p>
      {/* link back to form back to submit another response */}
      <NavLink to="/form">Click here to log another bowel movement</NavLink>
      <br />
      {/* button to log out */}
      <button onClick={logout}>Log out</button>
    </div>
  );
}
