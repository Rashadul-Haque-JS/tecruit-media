import axios from "axios";

// Set the base URL for Axios
axios.defaults.baseURL = "http://localhost:9990/api";

export const saveHeaderToken = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const removeToken = () => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${''}`;
};

export const login = async (object) => {
  return await axios.post("/login", object);
};

export const signupApplicant = async (object) => {
  return await axios.post("/applicants", object);
};

export const getAuthapplicant = async () => {
  return await axios.get("/applicants");
};
export const updateApplicant = async (object) => {
  return await axios.put(`/applicants`, object);
};
export const deleteApplicant = async () => {
  return await axios.delete(`/applicants`);
};
export const postNewJob = async (object) => {
  return await axios.post("/jobs", object);
};
export const getJobsList = async () => {
  return await axios.get("/jobs");
};

//Company
export const signupCompany = async (object) => {
  return await axios.post("/companies", object);
};
export const getAuthCompany = async () => {
  return await axios.get("/companies");
};
export const updateCompany = async (object) => {
  return await axios.put(`/companies`, object);
};
export const deleteCompany = async () => {
  return await axios.delete(`/companies`);
};
export const getJobByCraetor = async () => {
  return await axios.get(`/companies/jobs`);
};