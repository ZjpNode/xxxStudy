
const http = require('http');
const express = require("express");
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session')
const mongoose = require("mongoose");

mongoose.connect("mongodb://testUser:testUser@localhost:27017/test")
let Schema = mongoose.Schema;
let Users = mongoose.model('users', new Schema({
  first: String,
  last: String,
  email: { type: String, unique: true },
  password: { type: String, index: true }
}))

let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'my secret' }));

app.use(function (req, res, next) {
  if (req.session.loggedIn) {
    res.locals.authenticated = true;
    Users.findById(req.session.loggedIn, (err, doc) => {
      if (err) throw err;
      res.locals.me = doc;
      next()
    })
  } else {
    res.locals.authenticated = false;
    next();
  }
})

app.get("/", function (req, res) {
  res.render('index');
})

app.get("/login/:signupEmail?", (req, res) => {
  res.render('login', { signupEmail: req.params.signupEmail });
})
app.post("/login", (req, res) => {
  // "email": 1, "password"
  Users.findOne({ email: req.body.email, password: req.body.password }, (err, doc) => {
    if (err) throw err;
    if (!doc) return res.send('<p>User not found. Go back and try again </p>')
    req.session.loggedIn = doc._id.toString();
    res.redirect("/")
  })
})
app.get("/logout", (req, res) => {
  req.session.loggedIn = null;
  res.redirect("/")
})
app.get("/signup", (req, res) => {
  res.render('signup');
})
app.post("/signup", (req, res, next) => {
  new Users(req.body).save(function (err, user) {
    if (err) throw err;
    console.log(user)
    res.redirect(`/login/${user.email}`);
  })
})



let server = http.createServer(app);
server.listen(3000, () => {
  console.log("\033[96m     server listening on *:3000\033[39m")
})