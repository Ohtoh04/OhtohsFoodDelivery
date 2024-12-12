const {Category} = require('../models/models.js'); // Adjust the path to your models folder

// Function to fetch all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching categories', details: error.message });
  }
};

module.exports = { getAllCategories };
