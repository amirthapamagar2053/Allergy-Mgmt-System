import axios from "axios";
const baseUrl = "http://localhost:3001/api/Allergies";

const getAllUserAllergy = async () => {
  const token = JSON.parse(window.localStorage.getItem("loggedInUser"))?.token;
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };
  const response = await axios.get(baseUrl, config);
  console.log("the resposne in service", response);
  return response.data;
};

const addUserAllergy = async (newAllergy) => {
  console.log("the new allergy", newAllergy);
  console.log("the serviuce newAllergy", newAllergy);
  const token = JSON.parse(window.localStorage.getItem("loggedInUser")).token;
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };
  const response = await axios.post(baseUrl, newAllergy, config);
  console.log("the response data", response.data);
  return response.data;
};

const editUserAllergy = async (id, editedAllergy) => {
  console.log("the services edit entered");
  const token = JSON.parse(window.localStorage.getItem("loggedInUser")).token;
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };
  const response = await axios.put(`${baseUrl}/${id}`, editedAllergy, config);
  console.log("the response is", response);
  return response.data;
};

const deleteUserAllergy = async (id) => {
  console.log("the services delete allergy entered");
  const token = JSON.parse(window.localStorage.getItem("loggedInUser")).token;
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  console.log("the delete response is", response);
};
export default {
  getAllUserAllergy,
  addUserAllergy,
  editUserAllergy,
  deleteUserAllergy,
};
