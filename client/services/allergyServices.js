import axios from "axios";
const baseUrl = "http://localhost:3001/api/allergies";

const getAllUserAllergy = async () => {
  const response = axios.get(baseUrl);
  console.log("the resposne in service", response);
};

const addUserAllergy = async (newAllergy) => {
  console.log("the new allergy", newAllergy);
  console.log("the serviuce newAllergy", newAllergy);
  const response = await axios.post(baseUrl, newAllergy);
  console.log("the response data", response.data);
  return response.data;
};
export default { getAllUserAllergy, addUserAllergy };
