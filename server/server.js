require('dotenv').config();

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const path = require("path"); // Core module to handle file paths
const app = express();
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3000;

// Authentication requirements
const passport = require('passport');

// API routes
const DishRoutes = require('./routes/DishRoutes.js');
const TestRoutes = require('./routes/TestRoutes.js');
const AuthRoutes = require('./routes/AuthRoutes.js');
const RestaurantRoutes = require('./routes/RestaurantRoutes.js'); // Adjust the path
const CategoryRoutes = require('./routes/CategoryRoutes.js'); // Adjust the path

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {}
};

const corsOpt = {
    origin: 'http://localhost:5173',
    credentials: true,
    resave: false,
    saveUninitialized: true,
};

// Middleware
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session(sess));
app.use(cookieParser());
app.use(express.json()); // For parsing JSON requests

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});


app.use('/api', DishRoutes);
app.use('/api', TestRoutes);
app.use('/api/restaurants', RestaurantRoutes);
app.use('/api/categories', CategoryRoutes);
app.use(AuthRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
