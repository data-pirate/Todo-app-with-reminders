const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
require("./modules/auth");
const dotenv = require("dotenv");
const isLoggedIn = require("./middlewares/loggedIn");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const reminderRoute = require('./routes/reminder')
dotenv.config();

mongoose.connect(process.env.DB_LINK, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();

// app configuration
app.use(bodyParser.json())
app.use(express.static(__dirname + "/client"));
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//   app configuration ends

app.use('/reminder', reminderRoute);

app.get('/', (req, res)=>{
	res.redirect('/auth')
})

app.get("/dashboard", isLoggedIn, (req, res) => {
	res.sendFile(__dirname + "/client/index.html", {userId: req.user._id});
});

// app.get("/protected", (req, res) => {
//   res.send("ehell");
// });

app.get("/auth", (req, res) => {
  res.sendFile(__dirname + "/client/auth.html");
});

// login and sign up
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth" }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect("/dashboard");
  }
);


app.get('/logout', (req, res)=>{
	req.logOut();
	res.redirect('/auth')
})

app.listen(8000, () => console.log("server running on: 8000"));
