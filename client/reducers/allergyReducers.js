import allergyServices from "../services/allergyServices";

const { createSlice } = require("@reduxjs/toolkit");

const allergiesSlice = createSlice({
  name: "allergies",
  initialState: null,
  reducers: {
    setAllergy(state, action) {
      state = action.payload;
      return state;
    },
    addnewAllergy(state, action) {
      return [...state, action.payload];
    },
  },
});

export const { setAllergy, addnewAllergy } = allergiesSlice.actions;

export const getAllergy = () => {
  return async (dispatch) => {
    console.log("the dispatach thunk entere");
    const allergies = await allergyServices.getAllUserAllergy();
    dispatch(setAllergy(allergies));
  };
};

export const addAllergy = (newAllergy) => {
  return async (dispatch) => {
    console.log("the add allergy entered", newAllergy);
    const newallergy = await allergyServices.addUserAllergy(newAllergy);
    console.log("the new allergy is", newallergy);
    dispatch(addnewAllergy(newAllergy));
  };
};

export default allergiesSlice.reducer;
