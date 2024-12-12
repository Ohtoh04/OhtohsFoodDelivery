const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { Strategy: BearerStrategy } = require('passport-http-bearer');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/models.js');

// Generate an authentication token
const generateAuthToken = async (user) => {
  const token = jwt.sign({ _id: user._id.toString() }, 'your_jwt_secret', {
    expiresIn: '1h',
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// Authenticate user by email and password
const authenticateUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid login credentials');

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) throw new Error('Invalid login credentials');

  return user;
};

// Configure Passport Bearer strategy
const configureBearerStrategy = () => {
  passport.use(
    new BearerStrategy(async (token, done) => {
      try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        if (!user) return done(null, false);
        return done(null, user, { token });
      } catch (error) {
        return done(error, false);
      }
    })
  );
};

// Configure Passport Facebook strategy
const configureFacebookStrategy = () => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: 'your_facebook_client_id',
        clientSecret: 'your_facebook_client_secret',
        callbackURL: '/auth/facebook/callback',
        profileFields: ['id', 'emails', 'name'],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ facebookId: profile.id });
          if (!user) {
            user = new User({
              name: `${profile.name.givenName} ${profile.name.familyName}`,
              email: profile.emails[0].value,
              facebookId: profile.id,
            });
            await user.save();
          }
          const token = await generateAuthToken(user);
          return done(null, user, { token });
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};

// Configure Passport Google strategy
const configureGoogleStrategy = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: 'your_google_client_id',
        clientSecret: 'your_google_client_secret',
        callbackURL: '/auth/google/callback',
      },
      async (token, tokenSecret, profile, done) => {
        try {
          let user = await User.findOne({ googleId: profile.id });
          if (!user) {
            user = new User({
              name: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,
            });
            await user.save();
          }
          const authToken = await generateAuthToken(user);
          return done(null, user, { token: authToken });
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};

// Register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    const token = await generateAuthToken(user);
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authenticateUser(email, password);
    const token = await generateAuthToken(user);
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Logout user
const logoutUser = async (req, res) => {
  try {
    const token = req.token;
    req.user.tokens = req.user.tokens.filter((t) => t.token !== token);
    await req.user.save();
    res.send({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  res.send({ user: req.user });
};

module.exports = {
  configureBearerStrategy,
  configureFacebookStrategy,
  configureGoogleStrategy,
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
};
