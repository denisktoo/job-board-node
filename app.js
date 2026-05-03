const express = require('express');
const cors = require('cors');

require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const companyRoutes = require('./routes/companyRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Job Board API is running',
    version: '1.0.0',
    endpoints: {
      users: {
        register: 'POST /api/users/register',
        getAll: 'GET /api/users',
        getById: 'GET /api/users/:id'
      },
      companies: {
        create: 'POST /api/companies',
        getAll: 'GET /api/companies',
        getById: 'GET /api/companies/:id'
      },
      jobs: {
        create: 'POST /api/jobs',
        getAll: 'GET /api/jobs',
        getById: 'GET /api/jobs/:id'
      },
      applications: {
        apply: 'POST /api/applications',
        getAll: 'GET /api/applications',
        getById: 'GET /api/applications/:id'
      },
      system: {
        health: 'GET /health'
      }
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/users', userRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

app.use((error, req, res, next) => {
  console.error(error);

  res.status(500).json({
    error: 'Internal server error'
  });
});

module.exports = app;
