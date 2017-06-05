module.exports = function (subRoute) {
  var express = require('express');
  var router = express.Router();

  /* GET home page. */
  router.get(subRoute + '/', function(req, res, next) {
    res.render('index', {subR: subRoute});
  });

  /* GET about page. */
  router.get(subRoute + '/about', function(req, res, next) {
    res.render('about', {subR: subRoute});
  });

  /* GET designers page. */
  router.get(subRoute + '/projects', function(req, res, next) {
    res.render('projects', {subR: subRoute});
  });

  router.get(subRoute + '/contact', function(req, res, next) {
    res.render('contact', {subR: subRoute});
  });


  return router;
}
