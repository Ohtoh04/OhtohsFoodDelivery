const bcrypt = require('bcryptjs');
const {sign} = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const passport = require('passport');

const {User} = require('../models/models.js');

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY;


const Login = async(req, res) => {
    const { name, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({name: name});
    if (!user) {
        return res.status(404).json({message: "User not found"});
    }
    if (!(await user.matchPassword(password))) {  // Use await
        console.log(bcrypt.encodeBase64(password));
        return res.status(401).json({ message: "Password is incorrect" });
    }
    

  const accessToken = sign(
      { id: user._id},
      accessTokenSecret,
      { expiresIn: accessTokenExpiry }
  );

    res.cookie('access', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false, 
        maxAge: 360000000,
        path: '/',
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax' 
    });

  return res.status(200).json({user: user});
}

const Register = async(req, res) => {
  const { name, email, password, password_repeat} = req.body;

  console.log(req.body);
  const user_exist = await User.findOne({name: name});
  if (user_exist) {
      console.log('User already exist');
      return res.status(400).json({message: 'User already exist'});
  }
  if (password !== password_repeat) {
      return res.status(401).json({message: "Password is incorrect"});
  }


  const user = new User({name: name, email: email, password: password_repeat});
  await user.save();
  console.log("user saved", user)

  return res.status(201).json({user: user});
}


const Profile = async(req, res) => {
  const accessToken = req.cookies.access;
  let data = null;
  if (accessToken) {
    data = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  }
  else return res.status(403).json({message: "Access token not found"});

  console.log(data);
  const user = await User.findOne({_id: data.id});
  if (!user) {
    console.log(data);
    return res.status(400).json({message: 'User not found'});
  }
  console.log(user);


  return res.status(200).json({user: user});
}

module.exports.Login = Login;
module.exports.Register = Register;
module.exports.Profile = Profile;


// // Configure Passport Bearer strategy
// const configureBearerStrategy = () => {
//   passport.use(
//     new BearerStrategy(async (token, done) => {
//       try {
//         const decoded = jwt.verify(token, 'your_jwt_secret');
//         const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
//         if (!user) return done(null, false);
//         return done(null, user, { token });
//       } catch (error) {
//         return done(error, false);
//       }
//     })
//   );
// };

// // Configure Passport Facebook strategy
// const configureFacebookStrategy = () => {
//   passport.use(
//     new FacebookStrategy(
//       {
//         clientID: 'your_facebook_client_id',
//         clientSecret: 'your_facebook_client_secret',
//         callbackURL: '/auth/facebook/callback',
//         profileFields: ['id', 'emails', 'name'],
//       },
//       async (accessToken, refreshToken, profile, done) => {
//         try {
//           let user = await User.findOne({ facebookId: profile.id });
//           if (!user) {
//             user = new User({
//               name: `${profile.name.givenName} ${profile.name.familyName}`,
//               email: profile.emails[0].value,
//               facebookId: profile.id,
//             });
//             await user.save();
//           }
//           const token = await generateAuthToken(user);
//           return done(null, user, { token });
//         } catch (error) {
//           return done(error, false);
//         }
//       }
//     )
//   );
// };

// // Configure Passport Google strategy
// const configureGoogleStrategy = () => {
//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: 'your_google_client_id',
//         clientSecret: 'your_google_client_secret',
//         callbackURL: '/auth/google/callback',
//       },
//       async (token, tokenSecret, profile, done) => {
//         try {
//           let user = await User.findOne({ googleId: profile.id });
//           if (!user) {
//             user = new User({
//               name: profile.displayName,
//               email: profile.emails[0].value,
//               googleId: profile.id,
//             });
//             await user.save();
//           }
//           const authToken = await generateAuthToken(user);
//           return done(null, user, { token: authToken });
//         } catch (error) {
//           return done(error, false);
//         }
//       }
//     )
//   );
// };

// // Register user
// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 8);
//     const user = new User({ name, email, password: hashedPassword });
//     await user.save();
//     const token = await generateAuthToken(user);
//     res.status(201).send({ user, token });
//   } catch (error) {
//     res.status(400).send({ error: error.message });
//   }
// };

// // Login user
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await authenticateUser(email, password);
//     const token = await generateAuthToken(user);
//     res.send({ user, token });
//   } catch (error) {
//     res.status(400).send({ error: error.message });
//   }
// };

// // Logout user
// const logoutUser = async (req, res) => {
//   try {
//     const token = req.token;
//     req.user.tokens = req.user.tokens.filter((t) => t.token !== token);
//     await req.user.save();
//     passport.logoutUser();
//     res.send({ message: 'Logged out successfully' });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// };

// // Get user profile
// const getUserProfile = async (req, res) => {
//   res.send({ user: req.user });
// };

// module.exports = {
//   configureBearerStrategy,
//   configureFacebookStrategy,
//   configureGoogleStrategy,
//   registerUser,
//   loginUser,
//   logoutUser,
//   getUserProfile,
// };
