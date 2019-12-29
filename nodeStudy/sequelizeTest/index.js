const http = require('http');
const path = require('path');
// const assert = require('assert');
const express = require("express");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session')
const Sequelize = require('sequelize');

// const mysql = require("mysql");
const { database, user, password, host } = require("./db/config.js");
const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
})
const Project = sequelize.define('Project', {
  title: {
    type: Sequelize.STRING,
    defaultValue: 'No title'
  },
  created: Sequelize.DATE,
  description: Sequelize.TEXT
});
const Task = sequelize.define('Task', {
  title: Sequelize.STRING
});
Task.belongsTo(Project)
Project.hasMany(Task)
sequelize.sync()
// let db = mysql.createConnection(config)
// db.connect();
let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'my secret' }));

app.get("/", function (req, res, next) {
  Project.findAll().then(function (obj) {
    res.render('index', { projects: obj });
  }).catch(next)
  // db.query('SELECT id,title,description from item', function (err,result) {
  //   res.render('index',{ items:result });
  // })
})

app.post("/projects", (req, res, next) => {
  Project.build(req.body).save().then(function (obj) {
    res.send(obj);
  }).catch(next)
  // db.query('INSERT INTO item SET title = ?,description = ?', [req.body.title, req.body.description], function (err, info) {
  //   if (err) return next(err)
  //   console.log(`- item created with id ${info.insertId}`)
  //   res.redirect("/")
  // })
})
app.delete("/project/:id", (req, res, next) => {
  Project.findByPk(Number(req.params.id)).then(function (proj) {
    proj.destroy().then(function () {
      res.send(200);
    }).catch(next)
  }).catch(next)
})

app.get("/project/:id/task", (req, res, next) => {
  Project.findByPk(Number(req.params.id)).then(function (proj) {
    proj.getTasks().then(function (tasks) {
      res.render('task', { project: proj, tasks: tasks });
    })
  }).catch(next)
  // function getItem (fn) {
  //   db.query('SELECT id,title,description from item WHERE id = ? LIMIT 1', [req.params.id], function (err, results) {
  //     console.error(err)
  //     if (err) return next(err)
  //     if (!results[0]) return res.send(404)
  //     fn(results[0])
  //   })
  // }
  // function getReview (item_id, fn) {
  //   db.query('SELECT text,stars from review WHERE item_id = ?', [item_id], function (err, results) {
  //     console.error(err)
  //     if (err) return next(err)
  //     fn(results)
  //   })
  // }
  // getItem(function (item) {
  //   getReview(item.id, function (reviews) {
  //     res.render('item', { item: item, reviews: reviews });
  //   })
  // })
})
app.post("/project/:id/task", (req, res, next) => {
  req.body.ProjectId = req.params.id
  Task.build(req.body).save().then(function (obj) {
      res.send(obj);
    }).catch(next)
})

app.delete("/task/:id", (req, res, next) => {
   Task.findByPk(Number(req.params.id)).then(function (task) {
    task.destroy().then(function () {
      res.send(200);
    }).catch(next)
  }).catch(next)
//  db.query('INSERT INTO review SET item_id = ?, stars = ?,text = ?', [req.params.id, req.body.stars,req.body.text], function (err, info) {
//     if (err) return next(err)
//     console.log(`- review created with id ${info.insertId}`)
//     res.redirect(`/item/${req.params.id}`)
//   })
})

let server = http.createServer(app);
server.listen(3000, () => {
  console.log("\033[96m     server listening on *:3000\033[39m")
})

