import axios from "axios";
const baseUrl = "http://localhost:3001/api/Signup";

export const signUp = async (newUser) => {
  console.log("the new user is", newUser);
  const response = await axios.post(baseUrl, newUser);
  console.log("the response is ", response);
};
