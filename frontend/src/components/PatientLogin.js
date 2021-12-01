import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  updateProfile
} from "firebase/auth";
import { auth } from "../firebase-config";

// This page is where the patient will initially go.
// They'll make a username and password, which will automatically log them in
// If they are logged out, they can log in with an existing username and password here

function PatientLogin(props) {
  // states to hold email & password when first registering
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");

  // states to login in with existing username & password
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // state for storing active user object
  const [user, setUser] = useState({});

  

  // check whether there is a user logged in. If so, redirect to form
  // if (auth.currentUser) {
  //   window.location = "./form"
  // }

  // use pre-built firebase function to update user if auth state is changed
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

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
      ).then(() => {
        updateProfile(getAuth().currentUser, {
          displayName: registerName,
        });
      });
      window.location = "/"
    } catch (error) {
      // log error if something goes wrong
      console.log(error.message);
    }
  };

  // function to login existing user
  const login = async () => {
    try {
      // awaits firebase function to sign in
      const user = await signInWithEmailAndPassword(
        // pass auth & states into function
        auth,
        loginEmail,
        loginPassword
      );
      window.location = "./form"
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {/* <h1>Patient Login Portal</h1> */}
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
      <input
        placeholder="Enter your name"
        // update registerName state when user types into field
        onChange={(event) => {
          setRegisterName(event.target.value);
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
    </div>
  );
}

export default PatientLogin;
