const express = require('express');
const router = express.Router();
const { getAllCategories } = require('../controllers/CategoryController'); // Adjust the path to your controllers folder

// Route to fetch all categories
router.get('/', getAllCategories);

module.exports = router;
