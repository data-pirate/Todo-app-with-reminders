/**
 * This file handles the login with google
 */

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');
const User = require('../models/users');
dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:8000/auth/google/callback'
        },
        function (accessToken, refreshToken, profile, done) {
            // extract needed infomation
            let condition = {
                googleId: profile.id,
                name: profile.displayName,
                picture: profile.photos[0].value,
                email: profile.emails[0].value
            };
            User.findOrCreate(condition, function (err, user) {
                return done(err, user);
            });
        }
    )
);

// extract user Id
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// fetch user from the database
passport.deserializeUser(function (id, done) {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});
