const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const applicationController = require('../controllers/applicationController');

const router = express.Router();

/**
 * @swagger
 * /api/applications:
 *   post:
 *     summary: Apply to a job
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - jobId
 *             properties:
 *               jobId:
 *                 type: integer
 *               coverLetter:
 *                 type: string
 *               resumeUrl:
 *                 type: string
 *                 format: uri
 *     responses:
 *       201:
 *         description: Application submitted successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Job not found
 */
router.post('/', authMiddleware, applicationController.applyToJob);

/**
 * @swagger
 * /api/applications:
 *   get:
 *     summary: Get all applications
 *     tags: [Applications]
 *     responses:
 *       200:
 *         description: List of applications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   jobId:
 *                     type: integer
 *                   applicantId:
 *                     type: integer
 *                   coverLetter:
 *                     type: string
 *                   resumeUrl:
 *                     type: string
 *                   status:
 *                     type: string
 */
router.get('/', applicationController.getAllApplications);

/**
 * @swagger
 * /api/applications/{id}:
 *   get:
 *     summary: Get application by ID
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Application ID
 *     responses:
 *       200:
 *         description: Application details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   id:
 *                     type: integer
 *                   jobId:
 *                     type: integer
 *                   applicantId:
 *                     type: integer
 *                   coverLetter:
 *                     type: string
 *                   resumeUrl:
 *                     type: string
 *                   status:
 *                     type: string
 *       404:
 *         description: Application not found
 */
router.get('/:id', applicationController.getApplicationById);

module.exports = router;
