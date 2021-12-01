// Necessary imports:
import React from "react";
import { useState, useEffect } from "react";
import { db, auth } from "../firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

function Form() {
  const usersCollectionRef = collection(db, "data");
  const [uid, setUid] = useState();

  // Variable for date of BM or no-BM:
  const [poopDate, setPoopDate] = useState(); // type: date
  // Variables for "Log a Bowel Movement" form:
  const [bristol, setBristol] = useState(); // type: string (1-7) (could be a number)
  const [blood, setBlood] = useState(); // type: string (yes/no)
  const [pain, setPain] = useState(); // type: string (1-10) (could be a number)
  // Variable for "Log NO Bowel Movement" form:
  const [noPoop, setNoPoop] = useState(); // type: boolean - true if NO bowel movement

  const [user, loading, error] = useAuthState(auth);

  const logout = () => {
    signOut(auth);
  };

  // TO CREATE a function to handle submittal of the "Log a Bowel Movement" form. It should 1) Write the input data to the database, 2) Programatically write the patient's info (name, username, and DOB) and date+time of form submittal to the database, 3) Give the patient confirmation/thanks that they submitted, 4) Bring the patient back to the form page

  // TO CREATE a function to handle submittal of the "Log NO Bowel Movement" form. It should 1) Write the input data to the database, 2) Programatically write the patient's info (name, username, and DOB) and date+time of form submittal to the database, 3) Give the patient confirmation/thanks that they submitted, 4) Bring the patient back to the form page

  // There are currently TWO forms: 1) a very simple one if a patient did NOT have a BM in a day, where they simply input the date that they didn't have a BM and click a button, and 2) a form they would fill in for every BM they have.

  // C is for Create (entry)

  // function to be called for creating
  const createEntry = async (evt) => {
    evt.preventDefault(); // prevents refresh before submitting to db

    setUid(newName + 123);
    // adds entry to db
    setPain(parseInt(pain));
    setBristol(parseInt(bristol));
    setBlood(blood === "yes" ? true : false);

    await addDoc(usersCollectionRef, {
      name: user.displayName,
      pain: pain,
      bristol: bristol,
      blood: blood
      // ,
      // uid: uid,
      // ,
      // date: poopDate
    });
    return alert("submitted");
  };

  // This area is to read all of the entries on the DB
  // and will most likely be moved to the admin dashboard
  // R is for READ (all)
  // loads data when page is loaded
  useEffect(() => {
    const getEntries = async () => {
      const data = await getDocs(usersCollectionRef);
      // console.log('data:')
      // console.log(data) // for testing purposes
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); // for testing purposes
    };
    getEntries();
  }, []);
  // **********************************

  return (
    <div className="formPage">
      {/* user variable comes from useAuthState hook */}
      {user ? (
        <div>
          <p>Logged in as {user.displayName}</p>
          <button onClick={logout}>Sign Out</button>
        </div>
      ) : null}
      <h1>Patient Form</h1>
      {/* getting user's name, displaying first word */}
      <h4>Hello, {user.displayName.split(" ")[0]}!</h4>
      Please log each bowel movement you have with the "Log a Bowel Movement"
      form. If you did NOT have a bowel movement on a given day, please use the
      "Log NO Bowel Movement" form.
      <br />
      <form>
        {/* <br />
      <hr />
      <div>
      <h3>Log NO Bowel Movement:</h3>
        <label>I did NOT have a bowel movement on this date: </label>
        <input
          type="date"
          name="noBM"
          onChange={(e) => {
            setPoopDate(e.target.value);
          }}
        />
        <button onClick={createEntry}>Submit</button>
      </div> */}
        <br />
        <hr />
        <h3>Log a Bowel Movement:</h3>
        <div>
          <div className="formQuestion">
            <label>
              Date of BM:
              <input
                type="date"
                name="BMdate"
                onChange={(e) => {
                  setPoopDate(e.target.value);
                }}
              />
            </label>
          </div>
          <br />
          <div className="formQuestion">
            <label>
              1. Based on the Bristol Stool Scale (shown to the right), what
              type of poop did you have?
              <ul>
                <li>
                  <input
                    type="radio"
                    value="1"
                    name="bristol"
                    checked={bristol === "1"}
                    onChange={(e) => {
                      setBristol(e.target.value);
                    }}
                  />
                  Type 1: Separate hard lumps
                </li>
                <li>
                  <input
                    type="radio"
                    value="2"
                    name="bristol"
                    checked={bristol === "2"}
                    onChange={(e) => {
                      setBristol(e.target.value);
                    }}
                  />
                  Type 2: Lumpy and sausage-like
                </li>
                <li>
                  <input
                    type="radio"
                    value="3"
                    name="bristol"
                    checked={bristol === "3"}
                    onChange={(e) => {
                      setBristol(e.target.value);
                    }}
                  />
                  Type 3: A sausage shape with cracks in the surface
                </li>
                <li>
                  <input
                    type="radio"
                    value="4"
                    name="bristol"
                    checked={bristol === "4"}
                    onChange={(e) => {
                      setBristol(e.target.value);
                    }}
                  />
                  Type 4: Like a smooth, soft sausage or snake
                </li>
                <li>
                  <input
                    type="radio"
                    value="5"
                    name="bristol"
                    checked={bristol === "5"}
                    onChange={(e) => {
                      setBristol(e.target.value);
                    }}
                  />
                  Type 5: Soft blobs with clear-cut edges
                </li>
                <li>
                  <input
                    type="radio"
                    value="6"
                    name="bristol"
                    checked={bristol === "6"}
                    onChange={(e) => {
                      setBristol(e.target.value);
                    }}
                  />
                  Type 6: Mushy consistency with ragged edges
                </li>
                <li>
                  <input
                    type="radio"
                    value="7"
                    name="bristol"
                    checked={bristol === "7"}
                    onChange={(e) => {
                      setBristol(e.target.value);
                    }}
                  />
                  Type 7: Liquid consistency with no solid pieces
                </li>
              </ul>
            </label>
          </div>

          <br />

          <div className="formQuestion">
            <label>
              2. Was there any blood in your stool or on the toilet paper?
              <ul>
                <li>
                  <input
                    type="radio"
                    value="yes"
                    name="blood"
                    checked={blood === "yes"}
                    onChange={(e) => {
                      setBlood(e.target.value);
                    }}
                  />
                  Yes
                </li>
                <li>
                  <input
                    type="radio"
                    value="no"
                    name="blood"
                    checked={blood === "no"}
                    onChange={(e) => {
                      setBlood(e.target.value);
                    }}
                  />
                  No
                </li>
              </ul>
            </label>
          </div>
          <br />
          <div className="formQuestion">
            <label>
              3. Based on this pain scale, how much pain did you feel around
              this bowel movement?
              <ul>
                <li>
                  <input
                    type="radio"
                    value="1"
                    name="pain"
                    checked={pain === "1"}
                    onChange={(e) => {
                      setPain(e.target.value);
                    }}
                  />
                  1
                </li>
                <li>
                  <input
                    type="radio"
                    value="2"
                    name="pain"
                    checked={pain === "2"}
                    onChange={(e) => {
                      setPain(e.target.value);
                    }}
                  />
                  2
                </li>
                <li>
                  <input
                    type="radio"
                    value="3"
                    name="pain"
                    checked={pain === "3"}
                    onChange={(e) => {
                      setPain(e.target.value);
                    }}
                  />
                  3
                </li>
                <li>
                  <input
                    type="radio"
                    value="4"
                    name="pain"
                    checked={pain === "4"}
                    onChange={(e) => {
                      setPain(e.target.value);
                    }}
                  />
                  4
                </li>
                <li>
                  <input
                    type="radio"
                    value="5"
                    name="pain"
                    checked={pain === "5"}
                    onChange={(e) => {
                      setPain(e.target.value);
                    }}
                  />
                  5
                </li>
                <li>
                  <input
                    type="radio"
                    value="6"
                    name="pain"
                    checked={pain === "6"}
                    onChange={(e) => {
                      setPain(e.target.value);
                    }}
                  />
                  6
                </li>
                <li>
                  <input
                    type="radio"
                    value="7"
                    name="pain"
                    checked={pain === "7"}
                    onChange={(e) => {
                      setPain(e.target.value);
                    }}
                  />
                  7
                </li>
                <li>
                  <input
                    type="radio"
                    value="8"
                    name="pain"
                    checked={pain === "8"}
                    onChange={(e) => {
                      setPain(e.target.value);
                    }}
                  />
                  8
                </li>
                <li>
                  <input
                    type="radio"
                    value="9"
                    name="pain"
                    checked={pain === "9"}
                    onChange={(e) => {
                      setPain(e.target.value);
                    }}
                  />
                  9
                </li>
                <li>
                  <input
                    type="radio"
                    value="10"
                    name="pain"
                    checked={pain === "10"}
                    onChange={(e) => {
                      setPain(e.target.value);
                    }}
                  />
                  10
                </li>
              </ul>
            </label>
          </div>
          <button onClick={createEntry}>Submit</button>
        </div>
      </form>
      <h3>The Data (to make sure this works; will not be in final version):</h3>
      Date of BM / No-BM: {poopDate}
      {console.log(poopDate)}
      <br />
      No BM: {noPoop}
      <br />
      Bristol Type: {bristol}
      <br />
      Blood: {blood}
      <br />
      Pain Level: {pain}
    </div>
  );
}

export default Form;
