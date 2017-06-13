var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  isPublic: {
    type: Boolean,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  imgPath: {
    type: String,
    required: true,
    trim: true
  },
  href: {
    type: String,
    required: true,
    trim: true
  }
});

var UserSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    name: {
      type: String,
      required: true,
      trim: true,
      unique: false
    },
    password: {
      type: String,
      required: true,
      unique: false
    },
    ofProjectId: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      unique: false
    }
});

// authenticate input against database documents
UserSchema.statics.authenticate = function(email, password, callback) {
  User.findOne({email: email}, null, function (error, user) {
    if (error) {
      return callback(error);
    } else if ( !user ) {
      var err = new Error('User not found.');
      err.status = 401;
      return callback(err);
    }
    console.log(user);
    console.log("Email: " + email);
    console.log("Password: " + password);
    bcrypt.compare(password, user.password , function(error, result) {
      if (result === true) {
        return callback(null, user);
      } else {
        return callback();
      }
    })
  });
};

UserSchema.statics.getInfo = function (id,callback) {
  User.findOne({"_id": id}, null, function (error, user) {
    if (error) {
      return callback(error);
    } else if ( !user ) {
      var err = new Error('User not found.');
      err.status = 401;
      return callback(err);
    }
    return callback(null, user);
  });
};

// hash password before saving to database
UserSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});


var User = mongoose.model('User', UserSchema);
var Project = mongoose.model('Project', ProjectSchema);
module.exports.User = User;
module.exports.Project = Project;
