var User = require('../models/user');

function loggedOut(req, res, next) {
  if (req.session && req.session.userId) {
    return res.redirect('/profile');
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

function getUserInfo(req, res, next) {
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
}


module.exports.loggedOut = loggedOut;
module.exports.requiresLogin = requiresLogin;
module.exports.getUserInfo = getUserInfo;
