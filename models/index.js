const sequelize = require('../config/db');

const User = require('./User');
const Company = require('./Company');
const Job = require('./Job');
const Application = require('./Application');

User.hasMany(Company, {
  foreignKey: 'ownerId',
  as: 'companies'
});

Company.belongsTo(User, {
  foreignKey: 'ownerId',
  as: 'owner'
});

Company.hasMany(Job, {
  foreignKey: 'companyId',
  as: 'jobs'
});

Job.belongsTo(Company, {
  foreignKey: 'companyId',
  as: 'company'
});

User.hasMany(Application, {
  foreignKey: 'applicantId',
  as: 'applications'
});

Application.belongsTo(User, {
  foreignKey: 'applicantId',
  as: 'applicant'
});

Job.hasMany(Application, {
  foreignKey: 'jobId',
  as: 'applications'
});

Application.belongsTo(Job, {
  foreignKey: 'jobId',
  as: 'job'
});

const db = {
  sequelize,
  User,
  Company,
  Job,
  Application
};

module.exports = db;
