const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Application = sequelize.define(
  'Application',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    coverLetter: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    resumeUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },

    status: {
      type: DataTypes.ENUM('pending', 'reviewed', 'accepted', 'rejected'),
      allowNull: false,
      defaultValue: 'pending'
    }
  },
  {
    tableName: 'applications',
    timestamps: true
  }
);

module.exports = Application;
