var path = require("path");
var express = require('express');
var router = express.Router();
var log = require(path.resolve("../public/javascripts/middleWare/log")).logger("index");

/* GET home page. */
router.get('/', function(req, res, next) {
  log.info("信息");
  res.render('index', { title: 'Express' });
  log.error("错误");
  log.warn("警告");
  log.fatal("致命的");
});

module.exports = router;
