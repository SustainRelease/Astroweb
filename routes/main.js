module.exports = function (sites) {
  var express = require('express');
  var router = express.Router();

  // Preparing objects to pass to renderer
  subRoute = sites.Astroweb.subRoute;  //Should be empty
  var ports = {};
  for (let key in sites) {
    ports[key] = sites[key].port;
  }
  console.log("Ports:");
  console.log(ports);

  // ROUTES
  router.get(subRoute + '/', function(req, res, next) {
    res.render('index', {subR: subRoute});
  });

  /* GET about page. */
  router.get(subRoute + '/about', function(req, res, next) {
    res.render('about', {subR: subRoute});
  });

  /* GET projects page. */
  router.get(subRoute + '/projects', function(req, res, next) {
    res.render('projects', {subR: subRoute, "ports": ports});
  });

  router.get(subRoute + '/contact', function(req, res, next) {
    res.render('contact', {subR: subRoute});
  });

  return router;
}
