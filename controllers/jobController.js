const jobRepository = require('../repositories/jobRepository');

const createJob = (req, res) => {
  jobRepository.createJob(req, res);
};

const getAllJobs = (req, res) => {
  jobRepository.getAllJobs(req, res);
};

const getJobById = (req, res) => {
  jobRepository.getJobById(req, res);
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById
};
