import { useState, useEffect } from "react";
import { db, auth } from "../firebase-config";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useLocation, NavLink } from "react-router-dom";

function PatientData() {
  const [records, setRecords] = useState([]);
  const usersCollectionRef = collection(db, "data");

  let location = useLocation();
  console.log("location: ", location);
  console.log(location.state.patientName);

  // filtering query pulling just the patientName's entries and sorting by date, newest first
  let querySorted = query(
    usersCollectionRef,
    where("name", "==", location.state.patientName),
    orderBy("date", "desc")
  );
  // setting user as the current authentication state
  const [user, loading, error] = useAuthState(auth);

  // This area is to read all of the entries on the DB
  // loads data when page is loaded
  useEffect(() => {
    const getEntries = async () => {
      const data = await getDocs(querySorted);
      const dataParsed = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // puts the retrieved info into the records variable
      setRecords(dataParsed);
    };
    getEntries();
  }, []);

  // converts the date in the database from seconds to a formatted date
  function dateConvert(input) {
    let formattedDate = new Date(input);
    let month = formattedDate.getMonth();
    let day = formattedDate.getDate();
    let year = formattedDate.getFullYear();

    let dateString = year + "-" + (month + 1) + "-" + day;
    return dateString;
  }

  // logs out the current user and sends them to the Provider login page
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
            {user.displayName ? `as ${user.displayName}` : `as ${user.email}`}
           
          </p>
          <button onClick={logout}>Sign Out</button>
        </div>
      ) : null}
      <h2 className="login-header">Provider Dashboard</h2>
      <div className="patient-data-nav">
        <p className="patient-name">
          <span className="bold">Name:</span> {location.state.patientName}
        </p>
        {/* link to go back to the provider dashboard */}
        <NavLink className="link-back" to="/provider/dashboard">
          Back
        </NavLink>
      </div>
      <div className="dashboard-table">
        <table>
          <thead>
            {/* Heading for the table of entries starts here */}
            <tr>
              <th>Date</th>
              <th>Bristol Type</th>
              <th>Blood Present?</th>
              <th>Pain Level</th>
            </tr>
          </thead>

          <tbody>
            {/* each entry is returned as a row to this table  */}
            {records.map((entry) => {
              return (
                <tr>
                  {/* the date is formatted for display */}
                  <td>{dateConvert(entry.date)}</td>
                  <td>
                    {/* nested ternary for displaying the bristol data for the entry */}
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
                  <td>
                    {/* if there is blook present, this will be displayed red */}
                    {entry.blood ? <span id="blood">YES</span> : "none"}
                  </td>
                  <td>
                    {/* nested ternary for the display of the pain data */}
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

export default PatientData;
