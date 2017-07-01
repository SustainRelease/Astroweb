module.exports = function () {
  var express = require('express');
  var router = express.Router();
  var User = require('../models/user').User;
  var Project = require('../models/user').Project;
  var mid = require('../middleware/middle.js');
  var path = require('path');

  // GET /logout
  router.get('/logout', mid.getUser, function(req, res, next) {
    if (req.session) {
      // delete session object
      req.session.destroy(function(err) {
        if(err) {
          return next(err);
        } else {
          return res.redirect('/projects');
        }
      });
    }
  });

  // GET /login
  router.get('/login', mid.loggedOut, function(req, res, next) {
    console.log(res.locals.logIssue);
    return res.render('login');
  });

  // POST /login
  router.post('/login', function(req, res, next) {
    if (req.body.email && req.body.password) {
      User.authenticate(req.body.email, req.body.password, function (error, user) {
        if (error || !user) {
          res.locals.logIssue = "passFail";
          console.log(error);
          return res.render('login');
        }  else {
          req.session.userId = user._id;
          return res.redirect('/projects');
        }
      });
    } else {
      res.locals.logIssue = "fieldsEmpty";
      return res.render('login');
    }
  });
  router.get("/googlebdb8f8f026ae09df.html", function(req,res,next) {
    res.sendFile(path.join(__dirname + '/googleVerify.html'));
  });

  return router;
};
