const {Restaurant} = require('../models/models.js'); // Adjust the path to your models folder

// Function to fetch all restaurants
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching restaurants', details: error.message });
  }
};

module.exports = { getAllRestaurants };
