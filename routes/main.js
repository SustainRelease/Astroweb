module.exports = function () {
  var express = require('express');
  var router = express.Router();
  var mid = require('../middleware/middle.js');

  // ROUTES
  //Main page
  router.get('/', mid.getUser, function(req, res, next) {
    res.render('index');
  });

  //About
  router.get('/about', mid.getUser, function(req, res, next) {
    res.render('about');
  });

  //Projects
  router.get('/projects', mid.getUser, mid.getPriProjects, mid.getPubProjects, function(req, res, next) {
    res.render('projects');
  });

  //Contact
  router.get('/contact', mid.getUser, function(req, res, next) {
    res.render('contact');
  });

  return router;
}
