const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Company = sequelize.define(
    'Company',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        website: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: true
            }
        },

        location: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'companies',
        timestamps: true
    }
);

module.exports = Company;
