module.exports = function (subRoute) {  //subRoute should be empty
  var express = require('express');
  var router = express.Router();
  var getUserInfo = require('../middleware/middle.js').getUserInfo;

  // ROUTES
  //Main page
  router.get(subRoute + '/', function(req, res, next) {
    res.render('index', {subR: subRoute});
  });

  //About
  router.get(subRoute + '/about', function(req, res, next) {
    res.render('about', {subR: subRoute});
  });

  //Projects
  router.get(subRoute + '/projects', getUserInfo, function(req, res, next) {
    res.render('projects', {subR: subRoute});
  });

  //Contact
  router.get(subRoute + '/contact', function(req, res, next) {
    res.render('contact', {subR: subRoute});
  });

  return router;
}
