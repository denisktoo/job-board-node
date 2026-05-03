const { Company } = require('../models');

const createCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        error: 'Authentication required'
      });
    }

    if (user.role !== 'employer') {
      return res.status(403).json({
        error: 'Only employers can create companies'
      });
    }

    if (!name) {
      return res.status(400).json({
        error: 'Company name is required'
      });
    }

    const company = await Company.create({
      name,
      description,
      website,
      location,
      ownerId: user.id
    });

    return res.status(201).json({
      message: 'Company created successfully',
      company
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();

    return res.status(200).json(companies);
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findByPk(id);

    if (!company) {
      return res.status(404).json({
        error: 'Company not found'
      });
    }

    return res.status(200).json(company);
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById
};
