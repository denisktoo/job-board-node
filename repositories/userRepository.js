const bcrypt = require('bcryptjs');
const { User } = require('../models');

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: 'Name, email, and password are required'
      });
    }

    const existingUser = await User.findOne({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        error: 'Email already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'job_seeker'
    });

    return res.status(201).json({
      message: 'User registered successfully',
      user
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

module.exports = {
  registerUser,
  getAllUsers,
  getUserById
};
