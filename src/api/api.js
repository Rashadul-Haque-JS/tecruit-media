import axios from "axios";

const devBaseURL = "http://localhost:9990/api";
const prodBaseURL = "https://tecruit-api.onrender.com/api";
// Check if we are in development or production
const baseURL = process.env.NODE_ENV === 'development' ? devBaseURL : prodBaseURL;

axios.defaults.baseURL = baseURL;

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
export const getJobById = async (id) => {
  return await axios.get(`/companies/jobs/${id}`);
};
export const updateJobAds = async (id,object) => {
  return await axios.put(`/companies/jobs/${id}`, object);
};
export const deleteJob = async (id) => {
  return await axios.delete("/companies/jobs/delete", { data: { id } });
};
export const addSubscriber = async (email) => {
  return await axios.post("/subscribers", {  email } );
};
