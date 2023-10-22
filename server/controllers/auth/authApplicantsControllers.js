
const {db,secretKey} = require('../../lowdbHandler.js');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

//Signup controller
const applicantSignup = (req, res) => {
    try {
      const { email, password,type } = req.body;
  
      const existingapplicant = db.get('applicants').find({ email }).value();
      if (existingapplicant) {
        return res.status(400).json({ message: 'Email is already registered' });
      }
  
      const newapplicant = { email, password: bcrypt.hashSync(password, 10), id: Date.now(),type };
  
      db.get('applicants').push(newapplicant).write();
  
      // Create a JWT token for the newly registered applicant
      const token = jwt.sign({ email: newapplicant.email }, secretKey, { expiresIn: '1h' });
  
      return res.status(201).json({ message: 'Signup successful', token ,type}); 
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };


const getApplicant = (req, res) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const tokenParts = authorizationHeader.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0].toLowerCase() !== 'bearer') {
    return res.status(401).json({ message: 'Invalid token format' });
  }

  const token = tokenParts[1];

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const email = decoded.email;

    // Fetch the applicant's information
    const applicant = db.get('applicants').find({ email }).value();

    if (!applicant) {
      return res.status(404).json({ message: 'applicant not found' });
    }
    const authApplicant = {email:applicant.email, id:applicant.id,type:applicant.type}

    return res.status(200).json(authApplicant);
  });
};


const updateApplicant = (req, res) => {
    const token = req.headers.authorization;
  
    
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const email = decoded.email;
      const applicant = db.get('applicants').find({ email }).value();
  
      if (!applicant) {
        return res.status(404).json({ message: 'applicant not found' });
      }
  
      if (req.body.name) {
        applicant.name = req.body.name;
      }
  
      if (req.body.age) {
        applicant.age = req.body.age;
      }
  
      db.get('applicants').find({ email }).assign(applicant).write();
  
      return res.status(200).json(applicant);
    });
  };

const deleteApplicant = (req, res) => {
    const token = req.headers.authorization;
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const email = decoded.email;
  
      const applicant = db.get('applicants').find({ email }).value();
  
      if (!applicant) {
        return res.status(404).json({ message: 'applicant not found' });
      }
  
      db.get('applicants').remove({ email }).write();
  
      return res.status(204).json();
    });
  };

module.exports = { applicantSignup, getApplicant,deleteApplicant,updateApplicant };