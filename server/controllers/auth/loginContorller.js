const { secretKey } = require('../../lowdbHandler.js');
const jwt = require('jsonwebtoken');

const login = (req, res) => {
  try {
    let token;
    let type;
    
    if (req.applicant) {
      token = jwt.sign({ email: req.applicant.email }, secretKey, { expiresIn: '1h' });
      type = 'applicant'; // Set the type to 'applicant'
    } else if (req.company) {
      token = jwt.sign({ email: req.company.email }, secretKey, { expiresIn: '1h' });
      type = 'company'; // Set the type to 'company'
    } else {
      // If neither req.applicant nor req.company is set, return an error
      throw new Error('No applicant or company found.');
    }
    return res.status(200).json({ message: 'Login successful', token, type });
  } catch (error) {
    console.error('An error occurred:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  login
};
