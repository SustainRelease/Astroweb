function createUser (userEmail, name, password, callBack) {
  var User = require('../models/user.js').User;

  var userData = {
    email: userEmail,
    name: name,
    password: password
  };

  var user = new User(userData);
  return user.save(function (error, user) {
    if (error) {
      console.error(error);
      return 0;
    } else {
      console.log("User " + userData.name + " successfully created with ID " + user._id);
      if (callBack) {
        callBack();
      }
      return 1;
    }
  });
}

function createProject (userEmail, name, description, imgPath, href, callBack) {
  var Models = require('../models/user.js');
  var dbHelp = require('../astroLib/dbHelp.js');
  var masterEmail = "robbiemuir7@gmail.com";

  //ARGUMENT ORGANIZATION
  var isPublic = false;
  if (userEmail == "public") {
    isPublic = true;
  }
  var projectData = {
    name: name,
    description: description,
    imgPath: imgPath,
    href: href,
    isPublic: isPublic
  };


  var projectId;
  // SAVE PROJECT TO DATABASE
  var project = new Models.Project(projectData);
  project.save(function (error, project) {
    if (error) {
      console.error(error);
      return 0;
    } else {
      projectId = project._id;
      if (isPublic) {
        console.log("Public project " + projectData.name + " successfully created with ID " + projectId);
        if (callBack) {
          callBack();
        }
        return 1;
      } else {
        console.log("Private project " + projectData.name + " successfully created with ID " + projectId);
        // SET PERMISSIONS FOR USERS
        Models.User.find(dbHelp.orQuery("email",[userEmail,masterEmail]), function (err, users) {
          var nUsers = users.length;
          for (let i = 0; i < nUsers; i++) {
            users[i].ofProjectId.push(projectId);
            users[i].save();
            console.log("Permission set for " + users[i].name);
          }
          if (callBack) {
            callBack();
          }
          return 1;
        });
      }
    }
  });
}

function setUpMongo (dbName, reset) {
  var Models = require("../models/user.js");
  var mongoose = require('mongoose');
  var session = require('express-session');
  var MongoStore = require('connect-mongo')(session);
  // mongodb connection
  mongoose.connect("mongodb://localhost:27017/" + dbName);
  var db = mongoose.connection;
  // mongo error
  db.on('error', console.error.bind(console, 'connection error:'));
  if (reset) {
    Models.User.collection.drop();
    Models.Project.collection.drop();
  }
  return db;
}

module.exports.createUser = createUser;
module.exports.createProject = createProject;
module.exports.setUpMongo = setUpMongo;
