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
  // states to hold email, password, and name when first registering
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");

  // states to login in with existing username & password
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // state for storing active user object
  const [user, setUser] = useState({});

  // defining react-firebase-auth hooks
  const [usr, loading] = useAuthState(auth);

  // creating state in which to store error message / access it later for displaying error messages in JSX
  const [error, setError] = useState(null);

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
        // updating profile at time of creation to include displayName entered by user
        updateProfile(getAuth().currentUser, {
          displayName: registerName,
        });
      });
    } catch (error) {
      // log error if something goes wrong
      console.log(error);
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
      // setting error state which will be used to display jsx later on
      setError(error.message);
      console.log(error.message);
    }
  };

  return (
    <div id="login">
      {/* don't display anything until page is done loading (loading variable comes from react-firebase-auth library) */}
      {loading ? null : (
        <>
          {/* ternary checks whether user is logged in*/}
          {user ? (
            //
            // jsx for user already logged in
            //
            <div className="login-input">
              <h3>
                You are logged in as <br />
                {/* if "user" has a displayName, show it. otherwise, show their email */}
                {user.displayName ? user.displayName : user.email}
                . <br />
                {/* link to redirect page assigned in props */}
                <NavLink to={props.loginRedirect}>
                  Click here to continue to the {props.nextPageName} page
                </NavLink>
              </h3>
              {/* sign out button (uses logout function defined above, which uses Firebase's signOut() ) */}
              <button onClick={logout}>Sign out</button>
            </div>
          ) : (
            //
            // jsx for user not yet logged in
            //
            <>
              {/* form for logging into existing account */}
              <div className="login-input" id="login-existing">
                <h3>
                  <span className="bold">Sign in</span>
                </h3>
                {/* email input */}
                <input
                  placeholder="Enter Your Email"
                  // update registerEmail state when user types into field
                  onChange={(event) => {
                    setLoginEmail(event.target.value);
                  }}
                />
                {/* error case for wrong email address */}
                {error === "Firebase: Error (auth/user-not-found)." ||
                error === "Firebase: Error (auth/invalid-email)." ? (
                  // display red text describing error
                  <p className="login-error">
                    This email is not in our system.
                    <br />
                    Please check that you entered it correctly, or create a new
                    account.
                  </p>
                ) : null}
                {/* input for password entry */}
                <input
                  placeholder="Enter Your Password"
                  // update loginPassword state when user types into field
                  onChange={(event) => {
                    setLoginPassword(event.target.value);
                  }}
                />
                {/* additional error handling for specific cases */}
                {/* wrong password error */}
                {error === "Firebase: Error (auth/wrong-password)." ? (
                  <p className="login-error">
                    Invalid password. Please try again.
                  </p>
                ) : null}
                {/* general errors */}
                {error === "Firebase: Error (auth/internal-error)." ? (
                  <p className="login-error">
                    Please enter a valid email and password.
                  </p>
                ) : null}
                {/* account locked error */}
                {error ===
                "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)." ? (
                  <p className="login-error">
                    Access to this account has been temporarily disabled due to
                    too many failed login attempts.
                    <br />
                    Please try again later.
                  </p>
                ) : null}

                {/* call login function on click */}
                <button onClick={login}>Log in</button>
              </div>
              {/* form for creating new account */}
              <div className="login-input" id="login-register">
                <h3>
                  <span className="bold">Create a new account</span>
                </h3>
                {/* email input */}
                <input
                  placeholder="Enter your Email"
                  // update registerEmail state when user types into field
                  onChange={(event) => {
                    setRegisterEmail(event.target.value);
                  }}
                />
                {/* password input */}
                <input
                  placeholder="Enter a Password"
                  // update registerPassword state when user types into field
                  onChange={(event) => {
                    setRegisterPassword(event.target.value);
                  }}
                />
                {/* name input */}
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
