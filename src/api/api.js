import axios from 'axios'
// added comments
axios.defaults.baseURL = 'http://localhost:9990/api/v1';
// axios.defaults.baseURL = process.env.REACT_APP_BASE_SERVER_URL + 'api/v1';

// // auth
// export const saveToken = (token) => {
//     console.log(token)
//     return axios.defaults.headers.common["Authorization"] = token;
// }

export const postNewJob = async (object) => {
    return await axios.post("/post-new-job", object);
}
export const getAllJob = async () => {
    return await axios.get("/jobs");
}
