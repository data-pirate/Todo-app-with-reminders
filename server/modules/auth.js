const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');
const User = require('../models/users');
dotenv.config();

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/callback",
  },
  function(accessToken, refreshToken, profile, done) {
    let condition = { googleId: profile.id, name: profile.displayName, picture: profile.photos[0].value, email: profile.emails[0].value };
    User.findOne(condition, (err, result) => {
      return result ? done(err, result) : User.create(condition, (err, result) => { return done(err, result) })
  })
  }
));


passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, (err, user)=>{
    done(err, user)
  })
})