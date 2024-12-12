const express = require('express');
const router = express.Router();
const { getAllRestaurants } = require('../controllers/RestaurantController'); // Adjust the path to your controllers folder

// Route to fetch all restaurants
router.get('/', getAllRestaurants);

module.exports = router;
