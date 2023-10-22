
const {db, secretKey} = require('../../lowdbHandler.js');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

//Signup controller
const companySignup = (req, res) => {
    try {
      const { password, confirmPassword, ...companyData } = req.body; // Exclude confirmPassword, but keep email and other data
  
      const existingcompany = db.get('companies').find({ email: companyData.email }).value();
      if (existingcompany) {
        return res.status(400).json({ message: 'Email is already registered' });
      }
  
      // Hash the password
      companyData.password = bcrypt.hashSync(password, 10);
      companyData.id = Date.now();
  
      db.get('companies').push(companyData).write();
  
      // Create a JWT token for the newly registered company
      const token = jwt.sign({ email: companyData.email }, secretKey, { expiresIn: '1h' });
  
      return res.status(201).json({ message: 'Signup successful', token,type:companyData.type });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  

const getCompany = (req, res) => {
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

    // Fetch the company's information
    const company = db.get('companies').find({ email }).value();

    if (!company) {
      return res.status(404).json({ message: 'company not found' });
    }
    const authCompany = {email:company.email, id:company.id,type:company.type}

    return res.status(200).json(authCompany);
  });
};


const updateCompany = (req, res) => {
    const token = req.headers.authorization;
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const email = decoded.email;
      const company = db.get('companies').find({ email }).value();
  
      if (!company) {
        return res.status(404).json({ message: 'company not found' });
      }
  
      if (req.body.name) {
        company.name = req.body.name;
      }
  
      if (req.body.age) {
        company.age = req.body.age;
      }
  
      db.get('companies').find({ email }).assign(company).write();
  
      return res.status(200).json(company);
    });
  };

const deleteCompany = (req, res) => {
    const token = req.headers.authorization;
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const email = decoded.email;
  
      const company = db.get('companies').find({ email }).value();
  
      if (!company) {
        return res.status(404).json({ message: 'company not found' });
      }
  
      db.get('companies').remove({ email }).write();
  
      return res.status(204).json();
    });
  };

module.exports = { companySignup,getCompany,updateCompany,deleteCompany };