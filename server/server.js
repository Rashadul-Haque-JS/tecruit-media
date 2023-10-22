
const express = require('express');
const cors = require('cors');
const morgan = require("morgan");
const server = express();
server.use(cors());
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const {findApplicantOrCompany,handleDuplicateSignup} = require('./middlewares/authMiddleware.js');
const {login} = require('./controllers/auth/loginContorller.js');
const { applicantSignup,getApplicant,updateApplicant,deleteApplicant } = require ('./controllers/auth/authApplicantsControllers.js');
const { companySignup,getCompany,updateCompany,deleteCompany } = require ('./controllers/auth/authCopmanyControllers.js');
const { createJob,getJobs } = require ('./controllers/jobsControllers.js');

// Define routes for applicant authentication and CRUD operations
server.post('/login', findApplicantOrCompany, login);
server.post('/applicants/signup',handleDuplicateSignup, applicantSignup);
server.get('/applicants', getApplicant);
server.put('/applicants', updateApplicant);
server.delete('/applicants', deleteApplicant);
server.post('/companies/signup',handleDuplicateSignup, companySignup);
server.get('/companies', getCompany);
server.put('/companies', updateCompany);
server.delete('/companies', deleteCompany);

// Define routes for jobs
server.get('/jobs', getJobs);
server.post('/jobs', createJob);

// Start the server
const port = 3001;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
