import React from "react";
import { useState, useEffect } from "react";
import { db, auth } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useLocation, NavLink } from "react-router-dom";

function PatientData(props) {
  const [records, setRecords] = useState([]);
  const usersCollectionRef = collection(db, "data");

  let location = useLocation();
  console.log("location: ", location);
  console.log(location.state.patientName);

  // trying out a filter ability:
  let q = query(
    usersCollectionRef,
    where("name", "==", location.state.patientName),
    orderBy("date", "desc")
  );

  // USE THIS AREA FOR THE SORT BY OLDEST-TO-NEWEST DATE FOR THE PROVIDER DASHBOARD
  // const q = query(
  //   usersCollectionRef,
  //   // where("name", "==", location.state.patientName)
  //   // ,
  //   orderBy("date", "asc")
  // );

  const [user, loading, error] = useAuthState(auth);

  // This area is to read all of the entries on the DB
  // and will most likely be moved to the admin dashboard
  // R is for READ (all)
  // loads data when page is loaded
  useEffect(() => {
    const getEntries = async () => {
      const data = await getDocs(q);
      // console.log('data:')
      // console.log(data) // for testing purposes
      setRecords(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); // for testing purposes
    };
    getEntries();
  }, []);
  // **********************************

  function dateConvert(input) {
    let formattedDate = new Date(input);
    let month = formattedDate.getMonth();
    let day = formattedDate.getDate();
    let year = formattedDate.getFullYear();

    let dateString = year + "-" + month + "-" + day;
    return dateString;
  }

  function logout() {
    signOut(auth);
    window.location = "/provider";
  }

  return (
    <div id="patient-page">
      {user ? (
        <div className="login-hud">
          {/* checking for existence of displayName, if so indicate that that user is logged in, otherwise indicate email of logged in user */}
          <p>
            Logged in{" "}
            {user.displayName ? `as ${user.displayName}` : `as ${user.email}`}.
          </p>
          <button onClick={logout}>Sign Out</button>
        </div>
      ) : null}
      <h2 className="login-header">Provider Dashboard</h2>
      <div className="patient-data-nav">
        <p className="patient-name"><span className="bold">Name:</span> {location.state.patientName}</p>
        <NavLink className="link-back" to="/provider/dashboard">
          Back
        </NavLink>
      </div>
      <div className="dashboard-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Bristol</th>
              <th>Blood</th>
              <th>Pain Level</th>
            </tr>
          </thead>

          <tbody>
            {records.map((entry) => {
              return (
                <tr>
                  <td>{dateConvert(entry.date)}</td>
                  <td>{entry.bristol === 0 ? (<span id="bristol0">{entry.bristol}</span>) :
                    entry.bristol === 1 ? (<span id="bristol1">{entry.bristol}</span>) :
                    entry.bristol === 2 ? (<span id="bristol2">{entry.bristol}</span>) :
                    entry.bristol === 3 ? (<span id="bristol3">{entry.bristol}</span>) :
                    entry.bristol === 4 ? (<span id="bristol4">{entry.bristol}</span>) :
                    entry.bristol === 5 ? (<span id="bristol5">{entry.bristol}</span>) :
                    entry.bristol === 6 ? (<span id="bristol6">{entry.bristol}</span>) :
                    entry.bristol === 7 ? (<span id="bristol7">{entry.bristol}</span>) :
                    (<span id="bristol-empty">{entry.bristol}</span>)
                  }</td>
                  <td>{entry.blood ? <span id="blood">YES</span> : "none"}</td>
                  <td>{entry.pain === 0 ? (
                      <span id="pain0">{entry.pain}</span>
                    ) : entry.pain === 1 ? (
                      <span id="pain1">{entry.pain}</span>
                    ) : entry.pain === 2 ? (
                      <span id="pain2">{entry.pain}</span>
                    ) : entry.pain === 3 ? (
                      <span id="pain3">{entry.pain}</span>
                    ) : entry.pain === 4 ? (
                      <span id="pain4">{entry.pain}</span>
                    ) : entry.pain === 5 ? (
                      <span id="pain5">{entry.pain}</span>
                    ) : entry.pain === 6 ? (
                      <span id="pain6">{entry.pain}</span>
                    ) : entry.pain === 7 ? (
                      <span id="pain7">{entry.pain}</span>
                    ) : entry.pain === 8 ? (
                      <span id="pain8">{entry.pain}</span>
                    ) : entry.pain === 9 ? (
                      <span id="pain9">{entry.pain}</span>
                    ) : entry.pain === 10 ? (
                      <span id="pain10">{entry.pain}</span>
                    ) : (
                      <span id="pain-empty">{entry.pain}</span>
                    )}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientData;
