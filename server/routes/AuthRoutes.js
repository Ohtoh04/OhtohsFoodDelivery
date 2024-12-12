const express = require('express');
const passport = require('passport');
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  configureBearerStrategy,
  configureFacebookStrategy,
  configureGoogleStrategy,
} = require('../controllers/AuthController');

const router = express.Router();

// Configure Passport strategies
configureBearerStrategy();
configureFacebookStrategy();
configureGoogleStrategy();

// Facebook OAuth routes
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  (req, res) => {
    res.send({ user: req.user, token: req.authInfo.token });
  }
);

// Google OAuth routes
router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    res.send({ user: req.user, token: req.authInfo.token });
  }
);

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Logout route
router.post('/logout', passport.authenticate('bearer', { session: false }), logoutUser);

// Profile route
router.get('/profile', passport.authenticate('bearer', { session: false }), getUserProfile);

module.exports = router;
