const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const applicationController = require('../controllers/applicationController');

const router = express.Router();

router.post('/', authMiddleware, applicationController.applyToJob);
router.get('/', applicationController.getAllApplications);
router.get('/:id', applicationController.getApplicationById);

module.exports = router;
