import axios from "axios";

// Set the base URL for Axios
axios.defaults.baseURL = "http://localhost:3001";

export const saveHeaderToken = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  console.log(axios.defaults.headers.common["Authorization"], 'done');
};

export const removeToken = () => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${''}`;
};

export const signup = async (object) => {
  return await axios.post("/users/signup", object);
};

export const login = async (object) => {
  return await axios.post("/users/login", object);
};
export const getAuthUser = async () => {
  return await axios.get("/users");
};
export const updateUser = async (object) => {
  return await axios.put(`/users`, object);
};
export const deleteUser = async () => {
  return await axios.delete(`/users`);
};
export const postNewJob = async (object) => {
  return await axios.post("/jobs", object);
};
export const getJobsList = async () => {
  return await axios.get("/jobs");
};
