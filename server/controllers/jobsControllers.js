const db = require('../lowdbHandler.js');
// Create a new job listing
const createJob = async (req, res) => {
  try {
    const {
      jobTitle,
      category,
      subCategory,
      company,
      country,
      city,
      description,
      position,
      workTime,
      type,
      published_on,
      last_date,
      application_options,
      email_to_applications,
      application_url,
    } = req.body;

    // Create a new job (you can generate a unique ID or use your database's auto-increment feature)
    const newJob = {
      jobTitle,
      category,
      subCategory,
      company,
      country,
      city,
      description,
      position,
      workTime,
      type,
      published_on,
      last_date,
      application_options,
      email_to_applications,
      application_url,
      _id: Date.now(), 
    };

    db.get('jobs').push(newJob).write();

    return res.status(201).json({ message: 'Job listing created successfully', job: newJob });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};


const getJobs = async (req, res) => {
  try {
    const jobs = db.get('jobs').value();
    return res.status(200).json({ jobs });
  } catch (error) {
    console.error('Error in getJobs controller:', error); // Log the error
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {createJob, getJobs}