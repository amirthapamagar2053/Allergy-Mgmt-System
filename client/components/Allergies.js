import React from "react";
import { useDispatch } from "react-redux";
import { addAllergy, getAllergy } from "../reducers/allergyReducers";
// import { useSelector } from "react-redux";

const Allergies = () => {
  //   const user = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    const newAllergy = {
      name: event.target.name.value,
      symptoms: event.target.symptoms.value,
      severity: event.target.severity.value,
    };
    console.log("teh component", newAllergy);
    dispatch(addAllergy(newAllergy));
  };
  dispatch(getAllergy());
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="name" placeholder="name" />
          <input name="severity" placeholder="severity" />
          <input name="symptoms" placeholder="symptoms" />
        </div>
        <button type="submit">submit</button>
      </form>
      <h1>Allergies list</h1>
    </>
  );
};

export default Allergies;
