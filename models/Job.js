const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Job = sequelize.define(
  'Job',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    location: {
      type: DataTypes.STRING,
      allowNull: true
    },

    employmentType: {
      type: DataTypes.ENUM('full_time', 'part_time', 'contract', 'internship', 'remote'),
      allowNull: false
    },

    salaryMin: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    salaryMax: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    status: {
      type: DataTypes.ENUM('open', 'closed'),
      allowNull: false,
      defaultValue: 'open'
    }
  },
  {
    tableName: 'jobs',
    timestamps: true
  }
);

module.exports = Job;
