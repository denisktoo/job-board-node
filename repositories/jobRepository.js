const { Job, Company } = require('../models');

const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      employmentType,
      salaryMin,
      salaryMax,
      companyId
    } = req.body;

    const user = req.user;

    if (!user) {
      return res.status(401).json({
        error: 'Authentication required'
      });
    }

    if (user.role !== 'employer') {
      return res.status(403).json({
        error: 'Only employers can create jobs'
      });
    }

    if (!title || !description || !employmentType || !companyId) {
      return res.status(400).json({
        error: 'Title, description, employmentType, and companyId are required'
      });
    }

    const company = await Company.findByPk(companyId);

    if (!company) {
      return res.status(404).json({
        error: 'Company not found'
      });
    }

    if (company.ownerId !== user.id) {
      return res.status(403).json({
        error: 'You can only create jobs for your own company'
      });
    }

    const job = await Job.create({
      title,
      description,
      location,
      employmentType,
      salaryMin,
      salaryMax,
      companyId
    });

    return res.status(201).json({
      message: 'Job created successfully',
      job
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll({
      include: [
        {
          model: Company,
          as: 'company'
        }
      ]
    });

    return res.status(200).json(jobs);
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findByPk(id, {
      include: [
        {
          model: Company,
          as: 'company'
        }
      ]
    });

    if (!job) {
      return res.status(404).json({
        error: 'Job not found'
      });
    }

    return res.status(200).json(job);
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById
};
