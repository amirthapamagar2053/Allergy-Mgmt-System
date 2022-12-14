import { configureStore } from "@reduxjs/toolkit";
import allergyReducers from "./reducers/allergyReducers";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    users: userReducer,
    allergies: allergyReducers,
  },
});

export default store;
