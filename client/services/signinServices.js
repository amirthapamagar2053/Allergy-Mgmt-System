import axios from "axios";
const baseUrl = "http://localhost:3001/api/Signin";

export const signIn = async (user) => {
  console.log("the singin Entred");
  const response = await axios.post(baseUrl, user);
  console.log("the signin response is", response);
};
