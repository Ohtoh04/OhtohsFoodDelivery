const express = require('express');
const router = express.Router();
const dishController = require('../controllers/DishController.js'); 

router.post('/dishes', dishController.createDish);
router.get('/dishes', dishController.getDishes);
router.get('/dishes/:id', dishController.getDishById);
router.put('/dishes/:id', dishController.updateDish);
router.delete('/dishes/:id', dishController.deleteDish);

module.exports = router;