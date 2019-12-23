const http = require('http');
const path = require('path');
const assert = require('assert');
const express = require("express");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session')
const mongodb = require("mongodb");


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
    app.users.findOne({ _id: mongodb.ObjectId(req.session.loggedIn) }, (err, doc) => {
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
  app.users.findOne({ email: req.body.email, password: req.body.password }, (err, doc) => {
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
  app.users.insertOne(req.body, (err, doc) => {
    if (err) throw err;
    res.redirect(`/login/${doc.ops[0].email}`);
  })
})

let MongoClient = mongodb.MongoClient;
MongoClient.connect("mongodb://testUser:testUser@localhost:27017/?authSource=test", (err, client) => {
  if (err) throw err;
  console.log("\033[96m     connected to Mongodb\033[39m");
  const db = client.db("test");
  app.users = db.collection('users');
  app.users.createIndex({ "email": 1, "password": 1 }, null, (err, results) => {
    if (err) throw err;
    console.log("\033[96m     create indexes\033[39m");
    let server = http.createServer(app);
    server.listen(3000, () => {
      console.log("\033[96m     server listening on *:3000\033[39m")
    })
  })
});

