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
    health: '/health'
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
