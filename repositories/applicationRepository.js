const { Application, Job, User } = require('../models');

const applyToJob = async (req, res) => {
  try {
    const { jobId, coverLetter, resumeUrl } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        error: 'Authentication required'
      });
    }

    if (user.role !== 'job_seeker') {
      return res.status(403).json({
        error: 'Only job seekers can apply for jobs'
      });
    }

    if (!jobId) {
      return res.status(400).json({
        error: 'jobId is required'
      });
    }

    const job = await Job.findByPk(jobId);

    if (!job) {
      return res.status(404).json({
        error: 'Job not found'
      });
    }

    const application = await Application.create({
      jobId,
      coverLetter,
      resumeUrl,
      applicantId: user.id
    });

    return res.status(201).json({
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.findAll({
      include: [
        {
          model: User,
          as: 'applicant',
          attributes: { exclude: ['password'] }
        },
        {
          model: Job,
          as: 'job'
        }
      ]
    });

    return res.status(200).json(applications);
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findByPk(id, {
      include: [
        {
          model: User,
          as: 'applicant',
          attributes: { exclude: ['password'] }
        },
        {
          model: Job,
          as: 'job'
        }
      ]
    });

    if (!application) {
      return res.status(404).json({
        error: 'Application not found'
      });
    }

    return res.status(200).json(application);
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

module.exports = {
  applyToJob,
  getAllApplications,
  getApplicationById
};
