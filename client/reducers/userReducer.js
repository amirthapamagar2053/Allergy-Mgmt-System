import { createSlice } from "@reduxjs/toolkit";
import signinServices from "../services/signinServices";

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    setUser(state, action) {
      const user = action.payload;
      return user;
    },
  },
});

export const logUser = (savedUser) => {
  return async (dispatch) => {
    const user = await signinServices.signIn(savedUser);
    console.log("the user in reducer is", user);
    localStorage.setItem("loggedInUSer", JSON.stringify(user));
    dispatch(setUser(user));
  };
};

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
