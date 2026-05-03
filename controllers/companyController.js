const companyRepository = require('../repositories/companyRepository');

const createCompany = (req, res) => {
  companyRepository.createCompany(req, res);
};

const getAllCompanies = (req, res) => {
  companyRepository.getAllCompanies(req, res);
};

const getCompanyById = (req, res) => {
  companyRepository.getCompanyById(req, res);
};

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById
};
