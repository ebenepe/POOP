import React from "react";
import { useState } from "react";

function Form() {

  const [bristol, setBristol] = useState()
  const [blood, setBlood] = useState();
  const [pain, setPain] = useState()
  const [poopDate, setPoopDate] = useState()

//   function handleSubmit() {
//       event.preventDefault
//   }

  return (
    <div>
      Patient Form page This is where the patient will fill out a questionnaire
      daily. When they submit, the data will go to the database!
      <br />
      <button>I did not have a bowel movement today</button>
      <form>
          <div className="formQuestion">
              <label>Date of BM: 
                  <input type="date" name="BMdate" onChange={ (e) => {setPoopDate(e.target.value)}}/>
              </label>
              </div>
        <div className="formQuestion">
          <label>
            1. Based on the Bristol Stool Scale (shown to the right), what type
            of poop did you have?
            <input type="radio" value="1" name="bristol" checked={bristol === "1"} onChange={ (e) => {setBristol(e.target.value)}}/>
            Type 1: Separate hard lumps
            <input type="radio" value="2" name="bristol" checked={bristol === "2"} onChange={ (e) => {setBristol(e.target.value)}}/>
            Type 2: Lumpy and sausage-like
            <input type="radio" value="3" name="bristol" checked={bristol === "3"} onChange={ (e) => {setBristol(e.target.value)}}/>
            Type 3: A sausage shape with cracks in the surface
            <input type="radio" value="4" name="bristol" checked={bristol === "4"} onChange={ (e) => {setBristol(e.target.value)}}/>
            Type 4: Like a smooth, soft sausage or snake
            <input type="radio" value="5" name="bristol" checked={bristol === "5"} onChange={ (e) => {setBristol(e.target.value)}}/>
            Type 5: Soft blobs with clear-cut edges
            <input type="radio" value="6" name="bristol" checked={bristol === "6"} onChange={ (e) => {setBristol(e.target.value)}}/>
            Type 6: Mushy consistency with ragged edges
            <input type="radio" value="7" name="bristol" checked={bristol === "7"} onChange={ (e) => {setBristol(e.target.value)}}/>
            Type 7: Liquid consistency with no solid pieces
          </label>
        </div>

        <br />

        <div className="formQuestion">
          <label>
            2. Was there any blood in your stool or on the toilet paper?
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
          </label>
        </div>
        <br />
        <div className="formQuestion">
          <label>
            3. Based on this pain scale, how much pain did you feel around this
            bowel movement?
            <input type="radio" 
            value="1"
            name="pain"
            checked={pain === "1"}
            onChange={(e) => {
              setPain(e.target.value)
            }} />
            1
            <input type="radio" 
            value="2"
            name="pain"
            checked={pain === "2"}
            onChange={(e) => {
              setPain(e.target.value)}}
            />
            2
            <input type="radio" 
            value="3" 
            name="pain"
            checked={pain === "3"}
            onChange={(e) => {
              setPain(e.target.value)}}
            />
            3
            <input type="radio" 
            value="4" 
            name="pain"
            checked={pain === "4"}
            onChange={(e) => {
              setPain(e.target.value)}}
            />
            4
            <input type="radio" 
            value="5" 
            name="pain"
            checked={pain === "5"}
            onChange={(e) => {
              setPain(e.target.value)}}
            />
            5
            <input type="radio" 
            value="6" 
            name="pain"
            checked={pain === "6"}
            onChange={(e) => {
              setPain(e.target.value)}}
            />
            6
            <input type="radio" 
            value="7" 
            name="pain"
            checked={pain === "7"}
            onChange={(e) => {
              setPain(e.target.value)}}
            />
            7
            <input type="radio" 
            value="8" 
            name="pain"
            checked={pain === "8"}
            onChange={(e) => {
              setPain(e.target.value)}}
            />
            8
            <input type="radio" 
            value="9" 
            name="pain"
            checked={pain === "9"}
            onChange={(e) => {
              setPain(e.target.value)}}
            />
            9
            <input type="radio" 
            value="10" 
            name="pain"
            checked={pain === "10"}
            onChange={(e) => {
              setPain(e.target.value)}}
            />
            10
          </label>
        </div>
        <button type="submit" >Submit</button>
      </form>
    </div>
  );
}

export default Form;
