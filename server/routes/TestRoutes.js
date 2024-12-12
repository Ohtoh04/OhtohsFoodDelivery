const express = require('express');
const router = express.Router();
//const testController = require('../controllers/TestController.js'); 

// router.get('/testreq', testController.testRequest); 
router.get("/testreq", function (req, res) {
    return res.status(200).json({ success: true, count: "1", data: "2"});
  });

module.exports = router;
