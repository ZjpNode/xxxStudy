var path = require("path");
var express = require('express');
var router = express.Router();
var url=require('url');
var util = require('util');
var commonFn= require(path.resolve("../public/javascripts/middleWare/commonFn"));
var httpPost = require(path.resolve("../public/javascripts/middleWare/HttpRequest"));
var logger = require(path.resolve("../public/javascripts/middleWare/log")).logger("viewDefault");
/* GET home page. */
router.get('/errorPage', function(req, res, next) {
  var urlVals = url.parse(req.url, true).query;
  logger.info("params : " + JSON.stringify(urlVals));
  res.render('common/errorPage', {param:urlVals});
});

module.exports = router;
