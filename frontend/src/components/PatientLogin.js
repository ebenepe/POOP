import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";

// This page is where the patient will initially go.
// They'll make a username and password, which will automatically log them in
// If they are logged out, they can log in with an existing username and password here

function PatientLogin(props) {
  // states to hold email & password when first registering
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  // states to login in with existing username & password
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // state for storing active user object
  const [user, setUser] = useState({});

  // check whether there is a user logged in, pass that to parent (App.js)
  // if none, auth.currentUser returns null
  if (auth.currentUser) {
    props.setLoggedIn(true);
  }

  // use pre-built firebase function to update user if auth state is changed
  onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
  })

  // function to create new user / register
  // async necessary because of firebase communication
  const register = async () => {
      try {
          // awaits firebase function to create user
          const user = await createUserWithEmailAndPassword(
              // use auth from firebase-config and states set below
              auth, 
              registerEmail, 
              registerPassword
          )
      } catch (error) {
          // log error if something goes wrong
          console.log(error.message)
      }
  }

  // function to login existing user
  const login = async () => {
      try {
        // awaits firebase function to sign in
        const user = await signInWithEmailAndPassword(
            // pass auth & states into function
            auth, 
            loginEmail, 
            loginPassword
        )
      } catch (error) {
          console.log(error.message)
      }
  }

  // function to log out 
  const logout = async () => {
    await signOut(auth);
  }

  return (
  <div>
      {/* section for registering new account */}
      <h3>Create new account</h3>
      <input
        placeholder="Enter your Email"
        // update registerEmail state when user types into field
        onChange={(event) => {
            setRegisterEmail(event.target.value);
        }}
      />
      <input
        placeholder="Enter a Password"
        // update registerPassword state when user types into field
        onChange={(event) => {
            setRegisterPassword(event.target.value);
        }}
      />
      {/* call register function on click */}
      <button onClick={register}>Create Account</button>
      {/*  */}
      {/* section for logging into existing account */}
      {/*  */}
      <h3>Log into existing account</h3>
      <input
        placeholder="Enter Your Email"
        // update registerEmail state when user types into field
        onChange={(event) => {
            setLoginEmail(event.target.value);
        }}
      />
      <input
        placeholder="Enter Your Password"
        // update loginPassword state when user types into field
        onChange={(event) => {
            setLoginPassword(event.target.value);
        }}
      />
      {/* call login function on click */}
      <button onClick={login}>Log in</button>

      <button onClick={logout}>Log Out</button>
  </div>
  )
}

export default PatientLogin;
