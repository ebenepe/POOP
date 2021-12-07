// Necessary imports:
import React from "react";
import { useState, useEffect } from "react";
import { db, auth } from "../firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { isValidTimestamp } from "@firebase/util";

function Form() {
  const [users, setUsers] = useState([]);
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

    const timestamp = new Date(poopDate);

    // setUid(newName + 123);
    // adds entry to db
    setPain(parseInt(pain));
    setBristol(parseInt(bristol));
    setBlood(blood === "yes" ? true : false);
    setPoopDate(poopDate);

    await addDoc(usersCollectionRef, {
      name: user.displayName,
      pain: pain,
      bristol: bristol,
      blood: blood,
      // ,
      // uid: uid,
      // ,
      date: poopDate,
    });
    window.location = "/submitted";
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

  function dateConvert(input) {
    let formattedDate = new Date(input);
    let month = formattedDate.getMonth();
    let day = formattedDate.getDate();
    let year = formattedDate.getFullYear();

    let dateString = year + "-" + month + "-" + day;
    return dateString;
  }

  return (
    <div className="formPage">
      {/* user variable comes from useAuthState hook */}
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
      <div id="form">
        <h1>Patient Form</h1>
        {/* checking for existence of displayName, if so displaying first word */}
        <h4>
          Hello{user.displayName ? `, ${user.displayName.split(" ")[0]}` : null}
          !
        </h4>
        {/* If you did NOT have a bowel movement on a given day, please use the
      "Log NO Bowel Movement" form. */}
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
          <h3>Log a Bowel Movement Here:</h3>
          <div>
            <div className="formQuestion">
              <label>
                Date of BM:
                <input
                  type="date"
                  name="BMdate"
                  onChange={(e) => {
                    setPoopDate(Date.parse(e.target.value) + 18000000);
                  }}
                />
              </label>
            </div>
            <br />
            <div className="formQuestion">
              <label>
                1. Based on the Bristol Stool Scale, what did your bowel movement look like? <br/>(click the image that best matches)
                <ul class="bristol_ul">
                  <li>
                  <br/>
                    <label class="bristol_li">
                      <input
                        type="radio"
                        value="1"
                        name="bristol"
                        checked={bristol === "1"}
                        onChange={(e) => {
                          setBristol(e.target.value);
                        }}
                      />{" "}Type 1: Separate hard lumps
                      <img
                        src="../images/img_bristol_1.jpg"
                        alt="Type 1: Separate hard lumps"
                      />
                    </label>
                  </li>
                  <hr/>
                  <li>
                  <br/>
                    <label class="bristol_li">
                      <input
                        type="radio"
                        value="2"
                        name="bristol"
                        checked={bristol === "2"}
                        onChange={(e) => {
                          setBristol(e.target.value);
                        }}
                      />{" "}
                      Type 2: Lumpy and sausage-like
                      <img
                        src="../images/img_bristol_2.jpg"
                        alt="Type 2: Lumpy and sausage-like"
                      />
                    </label>
                  </li>
                  <hr/>

                  <li>
                  <br/>

                    <label class="bristol_li">
                      <input
                        type="radio"
                        value="3"
                        name="bristol"
                        checked={bristol === "3"}
                        onChange={(e) => {
                          setBristol(e.target.value);
                        }}
                      />{" "}
                      Type 3: A sausage shape with cracks in the surface
                      <img
                        src="../images/img_bristol_3.jpg"
                        alt="Type 3: A sausage shape with cracks in the surface"
                      />
                    </label>
                  </li>
                  <hr/>

                  <li>
                  <br/>

                    <label class="bristol_li">
                      <input
                        type="radio"
                        value="4"
                        name="bristol"
                        checked={bristol === "4"}
                        onChange={(e) => {
                          setBristol(e.target.value);
                        }}
                      />{" "}
                      Type 4: Like a smooth, soft sausage or snake
                      <img
                        src="../images/img_bristol_4.jpg"
                        alt="Type 4: Like a smooth, soft sausage or snake"
                      />
                    </label>
                  </li>
                  <hr/>

                  <li>
                  <br/>

                    <label class="bristol_li">
                      <input
                        type="radio"
                        value="5"
                        name="bristol"
                        checked={bristol === "5"}
                        onChange={(e) => {
                          setBristol(e.target.value);
                        }}
                      />{" "}
                      Type 5: Soft blobs with clear-cut edges
                      <img
                        src="../images/img_bristol_5.jpg"
                        alt="Type 5: Soft blobs with clear-cut edges"
                      />
                    </label>
                  </li>
                  <hr/>

                  <li>
                  <br/>

                    <label class="bristol_li">
                      <input
                        type="radio"
                        value="6"
                        name="bristol"
                        checked={bristol === "6"}
                        onChange={(e) => {
                          setBristol(e.target.value);
                        }}
                      />{" "}
                      Type 6: Mushy consistency with ragged edges
                      <img
                        src="../images/img_bristol_6.jpg"
                        alt="Type 6: Mushy consistency with ragged edges"
                      />
                    </label>
                  </li>
                  <hr/>

                  <li>
                  <br/>

                    <label class="bristol_li">
                      <input
                        id="bristol_7"
                        type="radio"
                        value="7"
                        name="bristol"
                        checked={bristol === "7"}
                        onChange={(e) => {
                          setBristol(e.target.value);
                        }}
                      />{" "}
                      Type 7: Liquid consistency with no solid pieces
                      <img
                        src="../images/img_bristol_7.jpg"
                        alt="Type 7: Liquid consistency with no solid pieces"
                      />
                    </label>
                  </li>
                  <hr/>
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
                    />{" "}
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
                    />{" "}
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
                <img id="pain_chart "src="./images/pain_chart.jpg" />
                  <li>
                    <input
                      type="radio"
                      value="1"
                      name="pain"
                      checked={pain === "1"}
                      onChange={(e) => {
                        setPain(e.target.value);
                      }}
                    />{" "}
                    1 - Least pain
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
                    />{" "}
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
                    />{" "}
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
                    />{" "}
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
                    />{" "}
                    5 - Moderate pain
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
                    />{" "}
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
                    />{" "}
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
                    />{" "}
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
                    />{" "}
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
                    />{" "}
                    10 - Most severe pain
                  </li>
                </ul>
              </label>
            </div>
            <div id="confirmation-box">
              <h3>
                Please make sure this information is correct before clicking
                "submit"
              </h3>
              <ul id="confirmation-ul">
                <li>
                  <span className="bold">Name:</span> {user.displayName}
                </li>
                <li>
                  <span className="bold">Date of BM:</span>{" "}
                  {poopDate ? dateConvert(poopDate) : null}
                </li>{" "}
                {/* No BM: {noPoop}
      <br /> */}
                <li>
                  <span className="bold">Bristol Type:</span> {bristol}
                </li>
                <li>
                  <span className="bold">Blood:</span> {blood}
                </li>
                <li>
                  <span className="bold">Pain Level:</span> {pain}
                </li>
              </ul>

              <button onClick={createEntry}>Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
