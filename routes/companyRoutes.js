const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const companyController = require('../controllers/companyController');

const router = express.Router();

router.post('/', authMiddleware, companyController.createCompany);
router.get('/', companyController.getAllCompanies);
router.get('/:id', companyController.getCompanyById);

module.exports = router;
