const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const uniqueValidator = require("mongoose-unique-validator");

// UserSchema
const Schema = mongoose.Schema;

const SkillSchema = new Schema({ skill: String });

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  nationality: String,
  contact: {
    type: String,
    required: true
  },
  jobsCreated:{
    type:[Schema.Types.ObjectId]
  },
  jobsCompleted:{
      type:[Schema.Types.ObjectId]
  },
  role: String,
  bio: String,
  skills: [SkillSchema],
  employer_rating: Number,
  intern_rating: Number
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", UserSchema);

const User=module.exports;

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
};
// find the user by its username
module.exports.getUserByUsername = function (username, callback) {
  const query = {
    username: username,
  };
  User.findOne(query, callback);
};

// to register the user
module.exports.addUser = function (newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

// Compare Password
module.exports.comparePassword = function (password, hash, callback) {
  bcrypt.compare(password, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};
