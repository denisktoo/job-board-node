const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const jobController = require('../controllers/jobController');

const router = express.Router();

router.post('/', authMiddleware, jobController.createJob);
router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJobById);

module.exports = router;
