var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var User = require('./models/user.js');

// mongodb connection
mongoose.connect("mongodb://localhost:27017/astroweb");
var db = mongoose.connection;
// mongo error
db.on('error', console.error.bind(console, 'connection error:'));

if (process.argv.length != 5) {
  console.error("Invalid input arguments (Requires [email,name,password])");
}

var userData = {
  email: process.argv[2],
  name: process.argv[3],
  password: process.argv[4]
};

User.create(userData, function (error, user) {
  if (error) {
    console.error(error);
  } else {
    console.log("User " + name + " successfully created with ID " + user._id);
  }
});

return 1;
