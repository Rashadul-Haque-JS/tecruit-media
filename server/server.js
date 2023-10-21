
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const server = express();
server.use(bodyParser.json());
server.use(cors());

// Import your controller functions
const { login,signup,getUser,deleteUser,updateUser } = require ('./controllers/authControllers.js');
const { createJob,getJobs } = require ('./controllers/jobsControllers.js');

// Define routes for user authentication and CRUD operations
server.post('/users/signup', signup);
server.post('/users/login', login);
server.get('/users', getUser);
server.put('/users', updateUser);
server.delete('/users', deleteUser);

// Define routes for jobs
server.get('/jobs', getJobs);
server.post('/jobs', createJob);

// Start the server
const port = 3001;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
