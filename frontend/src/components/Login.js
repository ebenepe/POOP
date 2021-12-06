import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  updateProfile,
  signOut,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink } from "react-router-dom";
import { auth } from "../firebase-config";

// This component handles login for both patient and provider
// the property called "loginRedirect" in parent component determines where login will redirect to

// User can make a username and password, which will automatically log them in and redirect appropriately
// If they are logged out, they can log in with an existing username and password here

function Login(props) {
  // states to hold email & password when first registering
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");

  // states to login in with existing username & password
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // state for storing active user object
  const [user, setUser] = useState({});

  const [usr, loading, error] = useAuthState(auth);

  // function to log out
  const logout = () => {
    signOut(auth);
  };

  // use pre-built firebase function to update user if auth state is changed
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  // function to create new user / register
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
      // window.location = "/";
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
      window.location = props.loginRedirect;
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div id="login">
      {/* ternary checks whether user is logged in, displays accordingly */}
      {loading ? null : (
        <>
          {user ? (
            <div className="login-input">
              <h3>
                You are logged in as {" "} <br/>
                {user.displayName
                  ? user.displayName
                  : user.email
                }
                . <br />
                <NavLink to={props.loginRedirect}>
                  Click here to continue to the {props.nextPageName} page
                </NavLink>
              </h3>
              <button onClick={logout}>Sign out</button>
            </div>
          ) : (
            <>
              
              {/*  */}
              {/* section for logging into existing account */}
              {/*  */}
              <div className="login-input" id="login-existing">
                <h3><span className="bold">Sign in</span></h3>
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
              <div className="login-input" id="login-register">
                {/* section for registering new account */}
                <h3><span className="bold">Create a new account</span></h3>
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
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Login;
