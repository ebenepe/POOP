import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

// import "./Dashboard.css";

function ProviderDashboard(props) {
  const [records, setRecords] = useState([]);
  const [userNames, setUserNames] = useState([]);
  const usersCollectionRef = collection(db, "data");

  const [user, loading, error] = useAuthState(auth);

  // useState patientName in order to pass props to ProviderDashboard and PatientData pages
  const [patientName, setPatientName] = useState("Frank");
  console.log("should say Frank: ", patientName);

  let q = query(
    usersCollectionRef,
    // where("name", "==", location.state.patientName),
    orderBy("date", "desc")
  );

  // function to create list of unique names in db
  function populateNames(records) {
    // create buffer array to be populated with names that are in the database
    let names = [];
    // create variable to track duplicates
    let match = false;
    // loop through all items in records
    for (let item of records) {
      // check names buffer array, set match = true if name is already on the list
      for (let entry of names) {
        if (item.name == entry) {
          match = true;
        }
      }
      if (match == false) {
        // add name to buffer array if it's not on there already
        names.push(item.name);
      }
      // reset match at end of cycle
      match = false;
    }
    // sort names array alphabetically
    names.sort();
    // update state with buffer array
    setUserNames(names);
    // console.log("userNames: ")
    // console.log(userNames)
  }

  // This area is to read all of the entries on the DB
  // and will most likely be moved to the admin dashboard
  // R is for READ (all)
  // loads data when page is loaded
  useEffect(() => {
    const getEntries = async () => {
      const data = await getDocs(q);
      const dataParsed = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // console.log('data.docs: ')
      // console.log(data.docs) // for testing purposes
      setRecords(dataParsed);
      // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); // for testing purposes

      populateNames(dataParsed);
      // console.log("records");
      // console.log(records);
    };
    getEntries();
    // console.log("records: ")
    // console.log(records)
  }, []);
  // **********************************
  // console.log("records 2");
  // console.log(records);
  // console.log("userNames: ");
  // console.log(userNames);

  function dateConvert(input) {
    let formattedDate = new Date(input);
    let month = formattedDate.getMonth();
    let day = formattedDate.getDate();
    let year = formattedDate.getFullYear();

    let dateString = year + "-" + (month + 1) + "-" + day;
    return dateString;
  }

  function logout() {
    signOut(auth);
    window.location = "/provider";
  }


  // function for onClick for patient names
  return (
    <div className="dashboard-page">
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

      <div>
        <form>
          <select
            type="text"
            onChange={(evt) => {
              setPatientName(evt.target.value);
            }}
          >
          {userNames.map( element => <option value={element}>{element}</option>)}
          </select>
          <Link
            to="/provider/dashboard/patient-data"
            state={{ patientName: patientName }}
          >
            <button
              type="submit"
              onSubmit={(evt) => {
                evt.preventDefault();
              }}
            >
              Select
            </button>
          </Link>
        </form>
      </div>

      <p className="patient-name">All Patients</p>

      <div className="dashboard-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
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
                  <td>
                    <Link
                      to="/provider/dashboard/patient-data"
                      state={{ patientName: entry.name }}
                    >
                      {entry.name}
                    </Link>
                  </td>
                  <td>
                    {entry.bristol === 0 ? (
                      <span id="bristol0">{entry.bristol}</span>
                    ) : entry.bristol === 1 ? (
                      <span id="bristol1">{entry.bristol}</span>
                    ) : entry.bristol === 2 ? (
                      <span id="bristol2">{entry.bristol}</span>
                    ) : entry.bristol === 3 ? (
                      <span id="bristol3">{entry.bristol}</span>
                    ) : entry.bristol === 4 ? (
                      <span id="bristol4">{entry.bristol}</span>
                    ) : entry.bristol === 5 ? (
                      <span id="bristol5">{entry.bristol}</span>
                    ) : entry.bristol === 6 ? (
                      <span id="bristol6">{entry.bristol}</span>
                    ) : entry.bristol === 7 ? (
                      <span id="bristol7">{entry.bristol}</span>
                    ) : (
                      <span id="bristol-empty">{entry.bristol}</span>
                    )}
                  </td>
                  <td>{entry.blood ? <span id="blood">YES</span> : "none"}</td>
                  <td>
                    {entry.pain === 0 ? (
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
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProviderDashboard;
