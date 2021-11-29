import React from "react";

function Form() {

    // const handleSubmit() {

    // }

  return (
    <div>
      Patient Form page This is where the patient will fill out a questionnaire
      daily. When they submit, the data will go to the database!
      <br />
      <form>
        <label>
          1. Based on the Bristol Stool Scale (shown to the right), what type of
          poop did you have?
          <select>
            <option value="type1">Type 1: Separate hard lumps</option>
            <option value="type2">Type 2: Lumpy and sausage-like</option>
            <option value="type3">
              Type 3: A sausage shape with cracks in the surface
            </option>
            <option value="type4">
              Type 4: Like a smooth, soft sausage or snake
            </option>
            <option value="type5">
              Type 5: Soft blobs with clear-cut edges
            </option>
            <option value="type6">
              Type 6: Mushy consistency with ragged edges
            </option>
            <option value="type7">
              Type 7: Liquid consistency with no solid pieces
            </option>
          </select>
        </label>
<br />
        <label>
          2. Was there any blood in your stool or on the toilet paper?
          <select>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
<br />
        <label>
          3. Based on this pain scale, how much pain did you feel around this
          bowel movement?
          <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </label>
        {/* <button onClick={handleSubmit}>Submit</button> */}
      </form>
    </div>
  );
}

export default Form;
