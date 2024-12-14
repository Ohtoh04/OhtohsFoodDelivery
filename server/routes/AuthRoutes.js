const express = require('express');
const passport = require('passport');
const AuthController = require('../controllers/AuthController');
const router = express.Router();
const {sign} = require("jsonwebtoken");

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
router.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: 'http://localhost:5173/login',
}), async (req, res) => {

  const user = req.user;
  console.log(user);

  const accessToken = sign(
      { id: user._id, role: 'client' },
      accessTokenSecret,
      { expiresIn: accessTokenExpiry }
  );

  res.cookie('access', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
      path: '/',
      SameSite: 'None'
  });

  res.redirect('http://localhost:5173/home');
});

// Register route
router.post('/register', AuthController.Register);

// Login route
router.post('/login', AuthController.Login);

// Logout route
//router.post('/logout', AuthController.logoutUser);

// Profile route
router.get('/profile', AuthController.Profile);

module.exports = router;
