const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const jobController = require('../controllers/jobController');

const router = express.Router();

/**
 * @swagger
 * /api/jobs:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - employmentType
 *               - companyId
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               employmentType:
 *                 type: string
 *                 enum: [full_time, part_time, contract, internship, remote]
 *               salaryMin:
 *                 type: integer
 *               salaryMax:
 *                 type: integer
 *               companyId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Job created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Company not found
 */
router.post('/', authMiddleware, jobController.createJob);

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Get all jobs
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: List of jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   location:
 *                     type: string
 *                   employmentType:
 *                     type: string
 *                   salaryMin:
 *                     type: integer
 *                   salaryMax:
 *                     type: integer
 *                   status:
 *                     type: string
 *                   companyId:
 *                     type: integer
 */
router.get('/', jobController.getAllJobs);

/**
 * @swagger
 * /api/jobs/{id}:
 *   get:
 *     summary: Get job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Job ID
 *     responses:
 *       200:
 *         description: Job details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 location:
 *                   type: string
 *                 employmentType:
 *                   type: string
 *                 salaryMin:
 *                   type: integer
 *                 salaryMax:
 *                   type: integer
 *                 status:
 *                   type: string
 *                 companyId:
 *                   type: integer
 *       404:
 *         description: Job not found
 */
router.get('/:id', jobController.getJobById);

module.exports = router;
