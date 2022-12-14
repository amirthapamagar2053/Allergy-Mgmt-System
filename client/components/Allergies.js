import React from "react";
import { useDispatch } from "react-redux";
import { addAllergy } from "../reducers/allergyReducers";
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
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input name="name" placeholder="name" />
        <input name="severity" placeholder="severity" />
        <input name="symptoms" placeholder="symptoms" />
      </div>
      <button type="submit">submit</button>
    </form>
  );
};

export default Allergies;
