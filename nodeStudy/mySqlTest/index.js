const http = require('http');
const path = require('path');
// const assert = require('assert');
const express = require("express");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session')
const mysql = require("mysql");

const config = require("./db/config.js")

let db = mysql.createConnection(config)
db.connect();
let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'my secret' }));

// app.use(function (req, res, next) {
//   if (req.session.loggedIn) {
//     res.locals.authenticated = true;
//     app.users.findOne({ _id: mongodb.ObjectId(req.session.loggedIn) }, (err, doc) => {
//       if (err) throw err;
//       res.locals.me = doc;
//       next()
//     })
//   } else {
//     res.locals.authenticated = false;
//     next();
//   }
// })

app.get("/", function (req, res) {
  db.query('SELECT id,title,description from item', function (err,result) {
    res.render('index',{ items:result });
  })
})

app.post("/create", (req, res, next) => {
  db.query('INSERT INTO item SET title = ?,description = ?', [req.body.title, req.body.description], function (err, info) {
    if (err) return next(err)
    console.log(`- item created with id ${info.insertId}`)
    res.redirect("/")
  })
})
app.get("/item/:id", (req, res, next) => {
  function getItem (fn) {
    db.query('SELECT id,title,description from item WHERE id = ? LIMIT 1', [req.params.id], function (err, results) {
      console.error(err)
      if (err) return next(err)
      if (!results[0]) return res.send(404)
      fn(results[0])
    })
  }
  function getReview (item_id, fn) {
    db.query('SELECT text,stars from review WHERE item_id = ?', [item_id], function (err, results) {
      console.error(err)
      if (err) return next(err)
      fn(results)
    })
  }
  getItem(function (item) {
    getReview(item.id, function (reviews) {
      res.render('item', { item: item, reviews: reviews });
    })
  })
})

app.post("/item/:id/review", (req, res, next) => {
 db.query('INSERT INTO review SET item_id = ?, stars = ?,text = ?', [req.params.id, req.body.stars,req.body.text], function (err, info) {
    if (err) return next(err)
    console.log(`- review created with id ${info.insertId}`)
    res.redirect(`/item/${req.params.id}`)
  })
})

let server = http.createServer(app);
server.listen(3000, () => {
  console.log("\033[96m     server listening on *:3000\033[39m")
})

// let MongoClient = mongodb.MongoClient;
// MongoClient.connect("mongodb://testUser:testUser@localhost:27017/?authSource=test", (err, client) => {
//   if (err) throw err;
//   console.log("\033[96m     connected to Mongodb\033[39m");
//   const db = client.db("test");
//   app.users = db.collection('users');
//   app.users.createIndex({ "email": 1, "password": 1 }, null, (err, results) => {
//     if (err) throw err;
//     console.log("\033[96m     create indexes\033[39m");
//     let server = http.createServer(app);
//     server.listen(3000, () => {
//       console.log("\033[96m     server listening on *:3000\033[39m")
//     })
//   })
// });

