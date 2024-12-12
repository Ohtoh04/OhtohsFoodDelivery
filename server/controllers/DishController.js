const { Dish, Restaurant, Category } = require('../models/models');


// Create a new dish
exports.createDish = async (req, res) => {
    try {
        const { name, description, price, restaurant, category } = req.body;

        // Validate related references (optional)
        if (restaurant && !(await Restaurant.findById(restaurant))) {
            return res.status(400).json({ error: "Invalid restaurant ID" });
        }
        if (category && !(await Category.findById(category))) {
            return res.status(400).json({ error: "Invalid category ID" });
        }

        // Create and save the dish
        const dish = new Dish({ name, description, price, restaurant, category });
        await dish.save();

        res.status(201).json({ message: "Dish created successfully", dish });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all dishes
exports.getDishes = async (req, res) => {
    console.log("aboba");
    try {
        const dishes = await Dish.find()
            .populate('restaurant', 'name') // Populate restaurant's name
            .populate('category', 'name'); // Populate category's name
        res.status(200).json(dishes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single dish by ID
exports.getDishById = async (req, res) => {
    try {
        const { id } = req.params;
        const dish = await Dish.findById(id)
            .populate('restaurant', 'name') // Populate restaurant's name
            .populate('category', 'name'); // Populate category's name

        if (!dish) {
            return res.status(404).json({ error: "Dish not found" });
        }
        res.status(200).json(dish);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a dish
exports.updateDish = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, restaurant, category } = req.body;

        // Validate related references (optional)
        if (restaurant && !(await Restaurant.findById(restaurant))) {
            return res.status(400).json({ error: "Invalid restaurant ID" });
        }
        if (category && !(await Category.findById(category))) {
            return res.status(400).json({ error: "Invalid category ID" });
        }

        const dish = await Dish.findByIdAndUpdate(
            id,
            { name, description, price, restaurant, category },
            { new: true, runValidators: true }
        );

        if (!dish) {
            return res.status(404).json({ error: "Dish not found" });
        }
        res.status(200).json({ message: "Dish updated successfully", dish });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a dish
exports.deleteDish = async (req, res) => {
    try {
        const { id } = req.params;
        const dish = await Dish.findByIdAndDelete(id);

        if (!dish) {
            return res.status(404).json({ error: "Dish not found" });
        }
        res.status(200).json({ message: "Dish deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
