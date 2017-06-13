var User = require('../models/user').User;
var Project = require('../models/user').Project;
var dbHelp = require('../astroLib/dbHelp.js');

function loggedOut(req, res, next) {
  if (req.session && req.session.userId) {
    return res.redirect('/');
  }
  return next();
}
function requiresLogin(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    var err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);
  }
}

function getUser(req, res, next) {
  if (req.session && req.session.userId) {
    res.locals.isLoggedIn = true;
    console.log("User ID: " + req.session.userId);
    User.getInfo(req.session.userId, function (err, user) {
      if (err) {
        return next(err);
      } else if (!user) {
        var error = new Error("User not found, ID:" + req.session.userId);
        err.status = 401;
        return next(error);
      } else {
        res.locals.user = user;
        return next();
      }
    });
  } else {
    return next();
  }
};

function getPriProjects(req, res, next) {
  var stop = false;
  if (!res.locals.user) {
    stop = true;
  } else {
    var ofProjectId = res.locals.user.ofProjectId;
    if(!ofProjectId.length) {
      stop = true;
    }
  }
  if (stop) {
    return next();
  } else {
    var projects = [{}];
    Project.find(dbHelp.orQuery("_id",ofProjectId),function(err,projects) {
      if (err) {
        return next(err);
      } else {
        res.locals.priProjects = projects;
        return next();
      }
    });
  }
};

function getPubProjects(req,res,next) {
  Project.find({"isPublic": true}, function(err,projects) {
    if (err) {
      return next(err);
    } else if (projects.length) {
      res.locals.pubProjects = projects;
      return next();
    } else {
      return next();
    }
  });
};

module.exports.loggedOut = loggedOut;
module.exports.requiresLogin = requiresLogin;
module.exports.getUser= getUser;
module.exports.getPriProjects = getPriProjects;
module.exports.getPubProjects = getPubProjects;
