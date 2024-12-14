const express = require('express');
const router = express.Router();
const dishController = require('../controllers/DishController.js'); 
const ensureAuthenticated = require("../middleware/authMiddleware");

router.post('/dishes', ensureAuthenticated, dishController.createDish);
router.get('/dishes', dishController.getDishes);
router.get('/dishes/:id', dishController.getDishById);
router.put('/dishes/:id', ensureAuthenticated, dishController.updateDish);
router.delete('/dishes/:id', ensureAuthenticated, dishController.deleteDish);

module.exports = router;