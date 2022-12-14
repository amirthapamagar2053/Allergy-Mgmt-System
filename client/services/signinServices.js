import axios from "axios";
const baseUrl = "http://localhost:3001/api/Signin";

const signIn = async (savedUser) => {
  console.log("the singin Entred");
  const response = await axios.post(baseUrl, savedUser);
  console.log("the signin response is", response);
  return response.data;
};

export default { signIn };
