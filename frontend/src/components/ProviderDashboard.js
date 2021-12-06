import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db, auth } from "../firebase-config";
import { collection, getDocs, addDoc, query, where, orderBy } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

// import "./Dashboard.css";

function ProviderDashboard() {
  const [records, setRecords] = useState([]);
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

  // function for onClick for patient names

  return (
    <div>
      Provider Dashboard Page
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
                    {/* <a href="/provider/dashboard/patient-data">{entry.name}</a> */}
                  </td>
                  <td>{entry.bristol}</td>
                  <td>{entry.blood ? "yes" : "no"}</td>
                  <td>{entry.pain}</td>
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
