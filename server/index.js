/**
 * Main server file
 */
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
require('./modules/auth');
const dotenv = require('dotenv');
const isLoggedIn = require('./middlewares/loggedIn');
const reminderRoute = require('./routes/reminder');
const log = require('log-to-file');

// configuration to use enviornment variables
dotenv.config();

// connection to database
mongoose.connect(process.env.DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
let db = mongoose.connection;
db.on('error', (err) =>
    log('index js(database error) ' + err, 'errorFile.log')
);

const app = express();

// app configuration
// server css and js to client
app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());
app.use(
    cookieSession({
        name: 'google-auth-session',
        maxAge: 24 * 60 * 60 * 100,
        keys: [process.env.COOKIE_SECRET]
    })
);
// initialize session
app.use(passport.initialize());
app.use(passport.session());

//   app configuration ends
app.use('/reminder', reminderRoute);

/**
 * home route if user is logged in
 * will be redirected to the dashboard
 */
app.get('/', isLoggedIn, (req, res) => {
    res.redirect('/dashboard');
});

// login route
app.get('/auth', (req, res) => {
    res.sendFile(__dirname + '/client/auth.html');
});

// todos and other will be shown here
app.get('/dashboard', isLoggedIn, (req, res) => {
    res.sendFile(__dirname + '/client/home.html');
});

// to get info about the user
app.get('/user', isLoggedIn, (req, res) => {
    res.send({ ...req.user._doc });
});

// google login and sign up
app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);
app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/dashboard',
        failureRedirect: '/'
    })
);

// destroy session and logout
app.get('/logout', (req, res) => {
    req.logOut();
    req.session = null;
    res.redirect('/auth');
});

app.listen(process.env.PORT, () =>
    console.log(`server running on: ${process.env.PORT}`)
);
