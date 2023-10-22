const bcrypt = require('bcryptjs');
const { db} = require('../lowdbHandler'); 

const findApplicantOrCompany = (req, res, next) => {

  const { email, password } = req.body;
  const applicant = db.get('applicants').find({ email }).value();
  const company = db.get('companies').find({ email }).value();

  if (applicant) {
    if (bcrypt.compareSync(password, applicant.password)) {
      req.applicant = applicant;
    } else {
      return res.status(401).json({ message: 'Invalid password' });
    }
  } else if (company) {
    if (bcrypt.compareSync(password, company.password)) {
      req.company = company;
    } else {
      return res.status(401).json({ message: 'Invalid password' });
    }
  } else {
    return res.status(404).json({ message: 'Email not found' });
  }
  next();
};

const handleDuplicateSignup = (req, res, next) => {
  const { email } = req.body;
  const applicant = db.get('applicants').find({ email }).value();
  const company = db.get('companies').find({ email }).value();

  if (applicant || company) {
    return res.status(409).json({ message: 'Email already exists' });
  }
  next();
};

module.exports = {
    findApplicantOrCompany,
    handleDuplicateSignup
}
