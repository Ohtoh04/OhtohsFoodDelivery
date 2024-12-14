const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const {ExtractJwt} = require("passport-jwt");
const JwtStrategy = require("passport-jwt/lib/strategy");
const {sign} = require("jsonwebtoken");

const options = {
    jwtFromRequest: ExtractJwt.fromExtractors([
        req => req.cookies.access
    ]),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET
};

passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
        try {
            const user = await User.findById(jwt_payload.id);
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        } catch (err) {
            return done(err, false);
        }})
);

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
}, async (accessToken, refreshToken, profile, done) => {
    const ExistingUser = await User.findOne({google_id: profile.id});
    console.log(ExistingUser);
    if (ExistingUser) {
        console.log("User already exist");
        return done(null, ExistingUser);
    }

    const google_id = profile.id;
    const email = profile.emails[0].value;
    const username = profile.displayName;

    const user = new User({google_id, username, email});
    const saved_user = await user.save();

    const user_id = saved_user.id;

    const newClient = new Client({name, surname, user_id});
    const client = await newClient.save();

    console.log("User created successfully");
    done(null, client);
}))

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;