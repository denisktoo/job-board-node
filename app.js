const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const companyRoutes = require('./routes/companyRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Pretty JSON globally
app.set('json spaces', 2);

// Root endpoint (API overview)
app.get('/', (req, res) => {
  res.json({
    message: 'Job Board API is running',
    version: '1.0.0',
    endpoints: {
      users: {
        register: 'POST /api/users/register',
        login: 'POST /api/users/login',
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
        health: 'GET /health',
        docs: 'GET /api-docs'
      }
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error(error);

  res.status(500).json({
    error: 'Internal server error'
  });
});

module.exports = app;
