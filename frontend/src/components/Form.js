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
  const [poopDate, setPoopDate] = useState(null);
  // Variables for "Log a Bowel Movement" form:
  const [bristol, setBristol] = useState(null);
  const [blood, setBlood] = useState(null);
  const [pain, setPain] = useState(null);
  const [noPoop, setNoPoop] = useState();

  const [user, loading, error] = useAuthState(auth);
  // function that logs out user
  const logout = () => {
    signOut(auth);
  };


  const createEntry = async (evt) => {
    evt.preventDefault(); // prevents refresh before submitting to db
    // if statement that sends a alert if not all the required data is not filled out
    if (
      pain === null ||
      bristol === null ||
      blood === null ||
      poopDate === null
    ) {
      alert("Please answer all questions before submitting");
    } else {
      const timestamp = new Date(poopDate);
      // adds submitted data to database if completely filled out
      await addDoc(usersCollectionRef, {
        name: user.displayName,
        pain: pain,
        bristol: bristol,
        blood: blood,
        date: poopDate,
      });
      window.location = "/submitted";
    }
  };

  // This area is to read all of the entries on the DB
  // and will most likely be moved to the admin dashboard
  // R is for READ (all)
  // loads data when page is loaded
  useEffect(() => {
    const getEntries = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); // for testing purposes
    };
    getEntries();
  }, []);
  // **********************************
  // convert date to year/month/day instead of milliseconds
  function dateConvert(input) {
    let formattedDate = new Date(input);
    let month = formattedDate.getMonth();
    let day = formattedDate.getDate();
    let year = formattedDate.getFullYear();

    let dateString = year + "-" + (month + 1) + "-" + day;
    return dateString;
  }
  console.log("typeof bristol: ", typeof bristol);
  console.log("typeof pain: ", typeof pain);
  console.log("pain: ", pain);
  console.log("typeof blood: ", typeof blood);
  console.log("blood: ", blood);

  return (
    <div className="formPage">
      {/* user variable comes from useAuthState hook */}
      {user ? (
        <div className="login-hud">

          {/* checking for existence of displayName, if so indicate that that user is logged in, otherwise indicate email of logged in user */}
          <span className="bold">
            Logged in{" "}
            {user.displayName ? `as ${user.displayName}` : `as ${user.email}`}
          </span>

          <button className="logout-button" onClick={logout}>Sign Out</button>
        </div>

      ) : null}
      <div id="form">
        <h1>Patient Form</h1>
        <form>
          <h3>Please use this form to log every bowel movement, as well as to log every day that you do <i>not</i> have a bowel movement.</h3>
          <div>
            <div className="formQuestion">
              <label>
                <span className="bold">Date of Bowel Movement (or the Absence of a Bowel Movement):</span>
                <input
                  type="date"
                  name="BMdate"
                  id="BMdate"
                  onChange={(e) => {
                    setPoopDate(Date.parse(e.target.value) + 18000000);
                  }}
                // setting date to milliseconds so firebase can store it to a number. the 18000000 is to compensate for the time zone.
                />
              </label>
            </div>
            <br />
            {/* asking the user where on the bristol stool scale their bowel movement fell */}
            <div className="formQuestion">
              <label>
                <span className="bold">
                  1. What did your bowel movement look like?
                </span>
                <br />
                <span className="italic">
                  Please select the image/description that best matches.
                </span>
                <ul class="bristol_ul">
                  <li>
                    <br />
                    {/* radio buttons for each choice on the bristol stool scale that convert their choice to a integer to be stored on firebase */}
                    <label class="bristol_li">
                      <input
                        type="radio"
                        value="0"
                        name="bristol"
                        onChange={(e) => {
                          setBristol(parseInt(e.target.value));
                        }}
                      />
                      <span className="bold">
                        I did not have a bowel movement today.
                      </span>
                    </label>
                  </li>
                  <hr />

                  <li>
                    <br />
                    <label class="bristol_li">
                      <input
                        type="radio"
                        value="1"
                        name="bristol"
                        onChange={(e) => {
                          setBristol(parseInt(e.target.value));
                        }}
                      />
                      <span className="bristol-bold">Type 1</span>Separate hard lumps
                      <img
                        className="poop-img"
                        src="../images/img_bristol_1.jpg"
                        alt="Type 1: Separate hard lumps"
                      />
                    </label>
                  </li>
                  <hr />
                  <li>
                    <br />
                    <label class="bristol_li">
                      <input
                        type="radio"
                        value="2"
                        name="bristol"
                        onChange={(e) => {
                          setBristol(parseInt(e.target.value));
                        }}
                      />
                      <span className="bristol-bold">Type 2</span>Lumpy and sausage-like
                      <br />
                      <img
                        className="poop-img"
                        src="../images/img_bristol_2.jpg"
                        alt="Type 2: Lumpy and sausage-like"
                      />
                    </label>
                  </li>
                  <hr />

                  <li>
                    <br />

                    <label class="bristol_li">
                      <input
                        type="radio"
                        value="3"
                        name="bristol"
                        onChange={(e) => {
                          setBristol(parseInt(e.target.value));
                        }}
                      />
                      <span className="bristol-bold">Type 3</span>A sausage shape with
                      cracks in the surface
                      <br />
                      <img
                        className="poop-img"
                        src="../images/img_bristol_3.jpg"
                        alt="Type 3: A sausage shape with cracks in the surface"
                      />
                    </label>
                  </li>
                  <hr />

                  <li>
                    <br />

                    <label class="bristol_li">
                      <input
                        type="radio"
                        value="4"
                        name="bristol"
                        onChange={(e) => {
                          setBristol(parseInt(e.target.value));
                        }}
                      />
                      <span className="bristol-bold">Type 4</span>Like a smooth, soft
                      sausage or snake
                      <br />
                      <img
                        className="poop-img"
                        src="../images/img_bristol_4.jpg"
                        alt="Type 4: Like a smooth, soft sausage or snake"
                      />
                    </label>
                  </li>
                  <hr />

                  <li>
                    <br />

                    <label class="bristol_li">
                      <input
                        type="radio"
                        value="5"
                        name="bristol"
                        onChange={(e) => {
                          setBristol(parseInt(e.target.value));
                        }}
                      />
                      <span className="bristol-bold">Type 5</span>Soft blobs with
                      clear-cut edges
                      <br />
                      <img
                        className="poop-img"
                        src="../images/img_bristol_5.jpg"
                        alt="Type 5: Soft blobs with clear-cut edges"
                      />
                    </label>
                  </li>
                  <hr />

                  <li>
                    <br />

                    <label class="bristol_li">
                      <input
                        type="radio"
                        value="6"
                        name="bristol"
                        onChange={(e) => {
                          setBristol(parseInt(e.target.value));
                        }}
                      />
                      <span className="bristol-bold">Type 6</span>Mushy consistency with
                      ragged edges
                      <br />
                      <img
                        className="poop-img"
                        src="../images/img_bristol_6.jpg"
                        alt="Type 6: Mushy consistency with ragged edges"
                      />
                    </label>
                  </li>
                  <hr />

                  <li>
                    <br />

                    <label class="bristol_li">
                      <input
                        id="bristol_7"
                        type="radio"
                        value="7"
                        name="bristol"
                        onChange={(e) => {
                          setBristol(parseInt(e.target.value));
                        }}
                      />
                      <span className="bristol-bold">Type 7</span>Liquid consistency
                      with no solid pieces
                      <br />
                      <img
                        className="poop-img"
                        src="../images/img_bristol_7.jpg"
                        alt="Type 7: Liquid consistency with no solid pieces"
                      />
                    </label>
                  </li>
                </ul>
              </label>
            </div>
            {/* radio buttons that take the users input for pain and convert them to a integer */}
            <br />
            <div className="formQuestion">
              <label>
                <span className="bold">
                  2. Based on this pain scale, how much pain did you feel around
                  this bowel movement?
                </span>
                <span className="italic">
                  If you did not have a bowel movement, please select the answer
                  with the worst pain you felt today related to your
                  gastrointestinal system.
                </span>
                <br />
                <img id="pain-chart" src="./images/pain-scale.jpeg" />
                <ul>
                  <label>
                    <li>
                      <input
                        type="radio"
                        id="0"
                        value="0"
                        name="pain"
                        onChange={(e) => {
                          setPain(parseInt(e.target.value));
                        }}
                      />{" "}
                      0 - No pain
                    </li>
                  </label>

                  <label>
                    <li>
                      <input
                        type="radio"
                        id="1"
                        value="1"
                        name="pain"
                        onChange={(e) => {
                          setPain(parseInt(e.target.value));
                        }}
                      />{" "}
                      1
                    </li>
                  </label>

                  <label>
                    <li>
                      <input
                        type="radio"
                        id="2"
                        value="1"
                        name="pain"
                        onChange={(e) => {
                          setPain(parseInt(e.target.value));
                        }}
                      />{" "}
                      2 - Mild Pain
                    </li>
                  </label>
                  <label>
                    <li>
                      <input
                        type="radio"
                        id="3"
                        value="3"
                        name="pain"
                        onChange={(e) => {
                          setPain(parseInt(e.target.value));
                        }}
                      />{" "}
                      3
                    </li>
                  </label>
                  <label>
                    <li>
                      <input
                        type="radio"
                        value="4"
                        id="4"
                        name="pain"
                        onChange={(e) => {
                          setPain(parseInt(e.target.value));
                        }}
                      />{" "}
                      4 - Moderate Pain
                    </li>
                  </label>
                  <label>
                    <li>
                      <input
                        type="radio"
                        value="5"
                        id="5"
                        name="pain"
                        onChange={(e) => {
                          setPain(parseInt(e.target.value));
                        }}
                      />{" "}
                      5
                    </li>
                  </label>
                  <label>
                    <li>
                      <input
                        type="radio"
                        value="6"
                        id="6"
                        name="pain"
                        onChange={(e) => {
                          setPain(parseInt(e.target.value));
                        }}
                      />{" "}
                      6 - Severe Pain
                    </li>
                  </label>
                  <label>
                    <li>
                      <input
                        type="radio"
                        value="7"
                        id="7"
                        name="pain"
                        onChange={(e) => {
                          setPain(parseInt(e.target.value));
                        }}
                      />{" "}
                      7
                    </li>
                  </label>
                  <label>
                    <li>
                      <input
                        type="radio"
                        value="8"
                        id="8"
                        name="pain"
                        onChange={(e) => {
                          setPain(parseInt(e.target.value));
                        }}
                      />{" "}
                      8 - Very Severe Pain
                    </li>
                  </label>
                  <label>
                    <li>
                      <input
                        type="radio"
                        value="9"
                        id="9"
                        name="pain"
                        onChange={(e) => {
                          setPain(parseInt(e.target.value));
                        }}
                      />{" "}
                      9
                    </li>
                  </label>
                  <label>
                    <li>
                      <input
                        type="radio"
                        value="10"
                        id="10"
                        name="pain"
                        onChange={(e) => {
                          setPain(parseInt(e.target.value));
                        }}
                      />{" "}
                      10 - Worst Pain Possible
                    </li>
                  </label>
                </ul>
              </label>
            </div>
            <br />
            {/* radio button that takes users input about blood in stool as a boolean */}
            <div className="formQuestion">
              <label className="bold">
                3. Was there any blood in your stool or on the toilet paper?
              </label>
              <ul>
                <label>
                  <li>
                    <input
                      type="radio"
                      value="yes"
                      name="blood"
                      onChange={(e) => {
                        setBlood(e.target.value === "yes" ? true : false);
                      }}
                    />
                    Yes
                  </li>
                </label>
                <label>
                  <li>
                    <input
                      type="radio"
                      value="no"
                      name="blood"
                      onChange={(e) => {
                        setBlood(e.target.value === "no" ? false : true);
                      }}
                    />
                    No
                  </li>
                </label>
              </ul>
            </div>
            {/* shows a confirmation box with all of the users input inside */}
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
                  <span className="bold">Date of BM: </span>
                  {poopDate ? (
                    dateConvert(poopDate)
                  ) : (
                    <span className="login-error">No response</span>
                  )}
                </li>
                <li>
                  <span className="bold">Bristol Type:</span>{" "}
                  {bristol === 0 ? (
                    "No Bowel Movement"
                  ) : bristol ? (
                    bristol
                  ) : (
                    <span className="login-error">No response</span>
                  )}
                </li>
                <li>
                  <span className="bold">Blood:</span>{" "}
                  {blood === true ? (
                    "Yes"
                  ) : blood === false ? (
                    "None"
                  ) : (
                    <span className="login-error">No response</span>
                  )}
                </li>
                <li>
                  <span className="bold">Pain Level:</span>{" "}
                  {typeof pain === "number" ? (
                    pain
                  ) : (
                    <span className="login-error">No Response</span>
                  )}
                </li>
              </ul>
              {/* creates entry upon submit */}
              <button onClick={createEntry}>Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
