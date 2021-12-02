import React from "react";
import { useState, useEffect } from "react";
import { db, auth } from "../firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";


function AdminDashboard() {
    const [records, setRecords] = useState([]);
    const usersCollectionRef = collection(db, "data");

    // This area is to read all of the entries on the DB
  // and will most likely be moved to the admin dashboard
  // R is for READ (all)
  // loads data when page is loaded
  useEffect(() => {
    const getEntries = async () => {
      const data = await getDocs(usersCollectionRef);
      // console.log('data:')
      // console.log(data) // for testing purposes
      setRecords(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); // for testing purposes
    };
    getEntries();
  }, []);
  // **********************************

    return (
        <div className="app-container">
          <table>
        <thead>
          <tr>
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
            <td>{entry.name}</td>
            <td>{entry.bristol}</td>
            <td>{entry.blood}</td>
            <td>{entry.pain}</td>
          </tr>
          )
        })}
        </tbody>
      </table>  
        </div>
    )
}

export default AdminDashboard
