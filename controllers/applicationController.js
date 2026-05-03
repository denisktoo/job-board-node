const applicationRepository = require('../repositories/applicationRepository');

const applyToJob = (req, res) => {
  applicationRepository.applyToJob(req, res);
};

const getAllApplications = (req, res) => {
  applicationRepository.getAllApplications(req, res);
};

const getApplicationById = (req, res) => {
  applicationRepository.getApplicationById(req, res);
};

module.exports = {
  applyToJob,
  getAllApplications,
  getApplicationById
};
